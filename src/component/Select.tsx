import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Color} from '../GlobalStyles';

interface IOption {
  id: string;
  label: string;
}

export default function Select({
  selectedValue,
  setSelectedValue,
  options,
}: {
  selectedValue: string;
  setSelectedValue: any;
  options: IOption[];
}) {
  return (
    <View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={styles.picker}>
          {options?.map(item => (
            <Picker.Item label={item?.label} value={item?.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.primaryBlue100,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: Color.secondaryColors100,
    padding: 4,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
  },
  picker: {
    height: 50,
    width: '100%',
    color: Color.primaryBlue100,
  },
  selectedText: {
    fontSize: 16,
  },
});
