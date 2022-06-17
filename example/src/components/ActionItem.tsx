import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

export interface Props {
  title: string;
  titleColor?: string;
  disabled?: boolean;
  onPress?: any;
  isShowSwitch?: boolean;
  switchValue?: boolean;
  onSwitchValueChange?: (value: boolean) => void;
  isShowSlider?: boolean;
  sliderValue?: number;
  onSliderValueChange?: (value: number) => void;
}

export const ActionItem = ({
  title,
  titleColor,
  disabled = false,
  onPress = () => {},
  isShowSwitch = false,
  switchValue = false,
  onSwitchValueChange,
  isShowSlider = false,
  sliderValue = 0,
  onSliderValueChange,
}: Props) => {
  const [isSwitchOn, setIsSwitchOn] = useState(switchValue);
  let showSlider: boolean;
  if (isShowSwitch) {
    showSlider = isShowSlider && isSwitchOn;
  } else {
    showSlider = isShowSlider;
  }
  return (
    <>
      <View style={styles.row}>
        {isShowSwitch || isShowSlider ? (
          <Text style={{ color: titleColor }}>{title}</Text>
        ) : (
          <Button
            disabled={disabled}
            onPress={onPress}
            title={title}
            color={titleColor}
          />
        )}
        {isShowSwitch && (
          <Switch
            disabled={disabled}
            onValueChange={(value: boolean) => {
              onSwitchValueChange && onSwitchValueChange(value);
              setIsSwitchOn((previousState) => !previousState);
            }}
            value={isSwitchOn}
          />
        )}
      </View>
      {showSlider && (
        <Slider
          style={styles.slider}
          disabled={disabled}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          minimumTrackTintColor={'white'}
          maximumTrackTintColor={'black'}
          value={Number.parseFloat(sliderValue?.toFixed(2))}
          onValueChange={onSliderValueChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
