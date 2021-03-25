import React, { useState } from 'react';
import { Button, View, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface ItemProps {
  title: string;
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
    alignItems: 'flex-start',
    marginTop: 10,
  },
  slider: {
    width: '35%',
    height: 40,
  },
  top: {
    flexDirection: 'row',
  },
});
const Item = ({
  title,
  btnOnPress = () => {},
  onSliderValueChange,
  onSwitchValueChange,
  isShowSlider = false,
  isShowSwitch = false,
  titleColor,
}: ItemProps) => {
  const [isEnabled, setIsEnabled] = useState(isShowSwitch || isShowSlider);
  return (
    <View style={styles.item}>
      <View style={styles.top}>
        <Button onPress={btnOnPress} title={title} color={titleColor} />
        {isShowSwitch && (
          <Switch
            onValueChange={(value: boolean) => {
              onSwitchValueChange && onSwitchValueChange(value);
              setIsEnabled((previousState) => !previousState);
            }}
            value={isEnabled}
          />
        )}
      </View>
      {isShowSlider && isEnabled && (
        <Slider
          style={styles.slider}
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
