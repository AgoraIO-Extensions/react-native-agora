import * as path from 'path';

import {
  CXXFile,
  CXXTYPE,
  CXXTerraNode,
  Variable,
} from '@agoraio-extensions/cxx-parser';

import { ParseResult, TerraContext } from '@agoraio-extensions/terra-core';

import {
  IrisApiIdParserUserData,
  renderWithConfiguration,
} from '@agoraio-extensions/terra_shared_configs';

import {
  convertToCamelCase,
  deepClone,
  findClazz,
  findEnumz,
  findStruct,
  isMatch,
  upperFirstWord,
} from './utils';

interface CXXFileUserData {
  fileName: string;
  renderFileEnd: boolean;
}

type TerraNodeUserData = IrisApiIdParserUserData & {
  isStruct: boolean;
  isEnumz: boolean;
  isClazz: boolean;
  isCallback: boolean;
  hasBaseClazzs: boolean;
  prefix_name: string;
};

type VariableUserData = IrisApiIdParserUserData & {
  name: string;
};

type ClazzMethodUserData = IrisApiIdParserUserData & {
  output: string;
  input: string;
  input_map: Variable[];
  input_map_fixed: Variable[];
  output_map: Variable[];
  hasParameters: boolean;
  bindingFunctionName: string;
  returnParam: string;
};

export function impl(parseResult: ParseResult) {
  let preParseResult = deepClone(parseResult, ['parent', 'outVariable']);
  let cxxfiles = parseResult.nodes as CXXFile[];
  //only render file which has clazz
  let view = cxxfiles
    .filter((cxxfile) => {
      return (
        cxxfile.nodes.filter((node) => {
          return node.__TYPE === CXXTYPE.Clazz;
        }).length > 0
      );
    })
    .map((cxxfile: CXXFile) => {
      const cxxUserData: CXXFileUserData = {
        renderFileEnd: false,
        fileName: path.basename(
          cxxfile.file_path,
          path.extname(cxxfile.file_path)
        ),
      };

      let nodes = cxxfile.nodes.filter((node: CXXTerraNode) => {
        return node.__TYPE === CXXTYPE.Clazz;
      });

      cxxfile.nodes = nodes.map((node: CXXTerraNode) => {
        node.asClazz().methods.map((method) => {
          let output_params: string[] = [];
          let input_params: string[] = [];
          const clazzMethodUserData: ClazzMethodUserData = {
            output: '',
            input: '',
            input_map: [],
            input_map_fixed: [],
            output_map: [],
            hasParameters: true,
            bindingFunctionName: `getApiTypeFrom${upperFirstWord(method.name)}`,
            returnParam: '',
            ...method.user_data,
          };
          if (!clazzMethodUserData.IrisApiIdParser) {
            clazzMethodUserData.IrisApiIdParser = {
              key: `${method.parent_name.replace(new RegExp('^I(.*)'), '$1')}_${
                method.name
              }`,
              value: `${method.parent_name.replace(
                new RegExp('^I(.*)'),
                '$1'
              )}_${method.name}`,
            };
          }
          method.return_type.name = convertToCamelCase(method.return_type.name);
          method.asMemberFunction().parameters.map((param) => {
            let variableUserData: VariableUserData = {
              name: convertToCamelCase(param.name, false),
              ...param.user_data,
            };
            let typeName = convertToCamelCase(param.type.name);
            let default_value = convertToCamelCase(param.default_value);
            param.user_data = variableUserData;
            if (param.is_output) {
              output_params.push(`${variableUserData.name}: ${typeName}`);
              clazzMethodUserData.output_map.push(param);
            } else {
              let member = `${variableUserData.name}: ${typeName}`;
              if (param.default_value) {
                if (
                  param.default_value == '__null' ||
                  param.default_value == 'nullptr'
                ) {
                  member = `${variableUserData.name}?: ${typeName}`;
                } else if (param.type.is_builtin_type) {
                  member += ` = ${default_value}`;
                } else {
                  let flag = false;
                  if (findStruct(param.type.name, preParseResult).length > 0) {
                    flag = true;
                    member += ` = new ${default_value}`;
                  }
                  if (findEnumz(param.type.name, preParseResult).length > 0) {
                    flag = true;
                    member += ` =${typeName}.${default_value}`;
                  }
                  if (!flag) {
                    member += ` = ${default_value}`;
                  }
                }
              }
              input_params.push(member);
              clazzMethodUserData.input_map.push(param);
              if (
                typeName !== 'Uint8Array' &&
                findClazz(param.type.name, preParseResult).length <= 0
              ) {
                clazzMethodUserData.input_map_fixed.push(param);
              }
            }
          });
          if (output_params.length > 0) {
            if (
              method.asMemberFunction().return_type.name !== 'void' &&
              method.asMemberFunction().return_type.name !== 'number'
            ) {
              output_params.push(`result: ${method.return_type.name},`);
            }
          }
          clazzMethodUserData.input = input_params.join(',');
          if (output_params.length > 1) {
            clazzMethodUserData.output = `{${output_params.join(',')}}`;
          } else if (output_params.length == 1) {
            clazzMethodUserData.output = output_params[0]?.split(': ')[1]!;
          } else {
            clazzMethodUserData.output = `${method.return_type.name}`;
          }
          clazzMethodUserData.hasParameters =
            clazzMethodUserData.input_map.length > 0;
          if (
            clazzMethodUserData.output_map.length > 0 ||
            method.return_type.name !== 'void'
          ) {
            clazzMethodUserData.returnParam = `const jsonResults = `;
          }
          clazzMethodUserData.returnParam +=
            'callIrisApi.call(this, apiType, jsonParams);\n';
          clazzMethodUserData.output_map.map((output) => {
            clazzMethodUserData.returnParam += `    const ${output.name} = jsonResults.${output.name};\n`;
          });
          if (clazzMethodUserData.output_map.length === 0) {
            if (method.return_type.name !== 'void') {
              clazzMethodUserData.returnParam += `    return jsonResults.result;\n`;
            }
          } else {
            if (clazzMethodUserData.output_map.length === 1) {
              clazzMethodUserData.returnParam += `    return ${clazzMethodUserData.output_map[0]?.name}\n`;
            } else {
              clazzMethodUserData.returnParam += `    return {\n`;
              clazzMethodUserData.output_map.map((output) => {
                clazzMethodUserData.returnParam += `${output.name},\n`;
              });
              clazzMethodUserData.returnParam += `}\n`;
            }
          }
          method.user_data = clazzMethodUserData;
        });

        const terraNodeUserData: TerraNodeUserData = {
          isStruct: node.__TYPE === CXXTYPE.Struct,
          isEnumz: node.__TYPE === CXXTYPE.Enumz,
          isClazz: node.__TYPE === CXXTYPE.Clazz,
          prefix_name: node.name.replace(new RegExp('^I(.*)'), '$1'),
          hasBaseClazzs: node.asClazz().base_clazzs.length > 0,
          isCallback: isMatch(node.name, 'isCallback'),
          ...node.user_data,
        };
        node.user_data = terraNodeUserData;
        if (!cxxUserData.renderFileEnd && !terraNodeUserData.isCallback) {
          cxxUserData.renderFileEnd = true;
        }
        return node;
      });

      cxxfile.user_data = cxxUserData;
      return cxxfile;
    });
  return view;
}

export default function (
  terraContext: TerraContext,
  args: any,
  parseResult: ParseResult
) {
  let view = impl(parseResult);
  return renderWithConfiguration({
    fileNameTemplatePath: path.join(
      __dirname,
      'templates',
      'impl',
      'file_name.mustache'
    ),
    fileContentTemplatePath: path.join(
      __dirname,
      'templates',
      'impl',
      'file_content.mustache'
    ),
    view,
  });
}
