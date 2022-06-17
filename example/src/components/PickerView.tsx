import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export interface Props {
  title: string;
  type: any;
  enabled?: boolean;
  selectedValue?: any;
  onValueChange: (value: any) => void;
}

export const PickerView = ({
  title,
  type,
  enabled = true,
  selectedValue,
  onValueChange,
}: Props) => {
  const items = Object.values(type);
  const keys = items.filter((v) => typeof v === 'string') as string[];
  const values = items.filter((v) => typeof v === 'number') as number[];
  const [value, setValue] = useState(
    selectedValue === undefined ? values[0] : selectedValue
  );
  return (
    <>
      <Text>{title}</Text>
      <Picker
        enabled={enabled}
        style={styles.picker}
        dropdownIconColor={'gray'}
        selectedValue={value}
        onValueChange={(itemValue: number) => {
          setValue(itemValue);
          onValueChange(itemValue);
        }}
      >
        {keys.map((v, i) => (
          <Picker.Item key={i} label={v} value={values[i]} />
        ))}
      </Picker>
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});
