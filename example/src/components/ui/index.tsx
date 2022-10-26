import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import PickerSelect, {
  PickerSelectProps,
  Item,
} from 'react-native-picker-select';
import { PickerProps } from '@react-native-picker/picker/typings/Picker';
import {
  Button,
  ButtonProps,
  DividerProps,
  Divider,
  InputProps,
  Input,
  Slider,
  SliderProps,
  SwitchProps,
  Switch,
  Text,
  TextProps,
  ImageProps,
  Image,
  lightColors,
} from '@rneui/base';

export const AgoraView = (props: ViewProps) => {
  return (
    <>
      <View {...props} />
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

export const AgoraTextInput = (props: InputProps) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const { style, ref, ...others } = props;
  return (
    <>
      <Input
        containerStyle={[AgoraStyle.input, style]}
        placeholderTextColor={'gray'}
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
  fullSize: {
    flex: 1,
  },
  input: {
    height: 50,
    color: 'black',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoLarge: {
    flex: 1,
  },
  videoSmall: {
    width: 120,
    height: 120,
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
});
