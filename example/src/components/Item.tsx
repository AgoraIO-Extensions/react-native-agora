import React, { useState } from 'react';
import { StyleSheet, Switch, View, Button, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface ItemProps {
  title: string;
  disabled?: boolean;
  btnOnPress?: any;
  onSliderValueChange?: (value: number) => void;
  onSwitchValueChange?: (value: boolean) => void;
  isShowSlider?: boolean;
  isShowSwitch?: boolean;
  titleColor?: string;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Item = ({
  title,
  disabled = false,
  btnOnPress = () => {},
  onSliderValueChange,
  onSwitchValueChange,
  isShowSlider = false,
  isShowSwitch = false,
  titleColor,
}: ItemProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  let showSlider: boolean;
  if (isShowSwitch) {
    showSlider = isShowSlider && isSwitchOn;
  } else {
    showSlider = isShowSlider;
  }
  return (
    <View style={styles.item}>
      <View style={styles.top}>
        {isShowSwitch || isShowSlider ? (
          <Text style={{ color: titleColor }}>{title}</Text>
        ) : (
          <Button
            disabled={disabled}
            onPress={btnOnPress}
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
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={onSliderValueChange}
        />
      )}
    </View>
  );
};

export default Item;
