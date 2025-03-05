import { PickerProps } from '@react-native-picker/picker/typings/Picker';
import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  Divider,
  DividerProps,
  Image,
  ImageProps,
  Input,
  InputProps,
  ListItem,
  ListItemProps,
  Slider,
  SliderProps,
  Switch,
  SwitchProps,
  Text,
  TextProps,
  lightColors,
} from '@rneui/base';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  Platform,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import PickerSelect, {
  Item,
  PickerSelectProps,
} from 'react-native-picker-select';

export { RtcSurfaceView } from 'react-native-agora';

export const AgoraView = (props: ViewProps & { horizontal?: boolean }) => {
  const { horizontal, style, ...others } = props;
  return (
    <>
      <View
        {...others}
        style={[style, !!horizontal && AgoraStyle.row]}
        pointerEvents={'box-none'}
      />
    </>
  );
};

export const AgoraText = (props: TextProps) => {
  return (
    <>
      <Text {...props} />
    </>
  );
};

export const AgoraButton = (props: ButtonProps) => {
  return (
    <>
      <Button {...props} />
    </>
  );
};

export const AgoraDivider = (props: DividerProps) => {
  return (
    <>
      <Divider width={1} color={'grey'} {...props} />
    </>
  );
};

export const AgoraTextInput = (
  props: InputProps & { numberKeyboard?: boolean }
) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const { style, ref, numberKeyboard, ...others } = props;
  return (
    <>
      <Input
        containerStyle={[AgoraStyle.input, style]}
        placeholderTextColor={'gray'}
        keyboardType={
          numberKeyboard
            ? Platform.OS === 'android'
              ? 'numeric'
              : 'numbers-and-punctuation'
            : 'default'
        }
        {...others}
        onChangeText={(text) => {
          setValue(text);
          props.onChangeText?.call(this, text);
        }}
        value={value}
      />
    </>
  );
};

export const AgoraSlider = (props: SliderProps & { title: string }) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const { title, ...others } = props;
  return (
    <>
      <AgoraText children={title} />
      <Slider
        style={AgoraStyle.slider}
        minimumTrackTintColor={'white'}
        thumbStyle={AgoraStyle.thumb}
        {...others}
        value={value}
        onValueChange={(v) => {
          setValue(v);
          props.onValueChange?.call(this, v);
        }}
      />
    </>
  );
};

export const AgoraSwitch = (props: SwitchProps & { title: string }) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const { title, ...others } = props;
  return (
    <>
      <AgoraText children={title} />
      <Switch
        {...others}
        value={value}
        onValueChange={(v) => {
          setValue(v);
          props.onValueChange?.call(this, v);
        }}
      />
    </>
  );
};

export const AgoraImage = (props: ImageProps) => {
  return (
    <>
      <Image {...props} />
    </>
  );
};

export function AgoraList<T>(props: FlatListProps<T>) {
  const { renderItem, ...others } = props;
  return (
    <FlatList
      numColumns={2}
      {...others}
      renderItem={({ item, index, separators }) => {
        return (
          <AgoraListItem containerStyle={AgoraStyle.listItem}>
            {renderItem ? renderItem({ item, index, separators }) : undefined}
          </AgoraListItem>
        );
      }}
    />
  );
}

export const AgoraListItem = (props: ListItemProps) => {
  return <ListItem {...props} />;
};

export const AgoraCard = (
  props: CardProps & { title: string; children?: ReactElement }
) => {
  const { title, children, ...others } = props;
  return (
    <Card containerStyle={AgoraStyle.listItem} {...others}>
      <Card.Title>{title}</Card.Title>
      {children}
    </Card>
  );
};

export interface AgoraDropdownItem extends Item {}

export const AgoraDropdown = (
  props: PickerSelectProps & PickerProps & { title: string }
) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <AgoraView style={AgoraStyle.fullWidth}>
      <AgoraText children={props.title} />
      <PickerSelect
        {...props}
        pickerProps={{
          style: AgoraStyle.fullWidth,
          enabled: props.enabled,
          dropdownIconColor: 'gray',
        }}
        style={{ inputIOSContainer: { pointerEvents: 'none' } }}
        value={value}
        // @ts-ignore
        textInputProps={{ style: AgoraStyle.input, chevronUp: true }}
        onValueChange={(v, index) => {
          if (v === null || v === undefined) return;
          setValue(v);
          props.onValueChange?.call(this, v, index);
        }}
      />
    </AgoraView>
  );
};

export const AgoraStyle = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullSize: {
    flex: 1,
  },
  input: {
    height: 50,
    color: 'black',
  },
  videoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  videoLarge: {
    flex: 1,
  },
  videoSmall: {
    width: 150,
    height: 150,
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: lightColors.primary,
  },
  listItem: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 120,
    height: 120,
  },
  picker: {
    width: '100%',
    height: 200,
  },
  statusBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  statusBarText: {
    color: '#ffffff',
  },
});
