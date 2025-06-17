import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';

type InputProps = {
  value: string;
  label?: string;
  setValue: (text: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  errorMessage?: string;
  multiline?: boolean;
  editable?: boolean;
  numberOfLines?: number;
};

const Input: React.FC<InputProps> = ({
  value,
  label,
  setValue,
  placeholder,
  icon = null,
  errorMessage = '',
  multiline = false,
  numberOfLines = 1,
  editable = true
}) => {
  const { color } = useTheme();

  return (
    <View style={{ marginBottom: errorMessage ? 25 : 20 }}>
      {label && (
        <Text
          style={{
            color: color.primaryBlue100,
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 12,
            marginLeft: 8,
          }}>
          {label}
        </Text>
      )}

      {/* Input Field Container */}
      <View
        style={[
          styles.container,
          {
            borderColor: errorMessage ? 'red' : '#E4E7ED',
            height: multiline ? 'auto' : 50, // Adjust height for multi-line
            alignItems: multiline ? 'flex-start' : 'center', // Adjust alignment
          },
        ]}>
        {/* Icon Section */}
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {icon && (
          <View
            style={[
              styles.divider,
              { borderColor: color.gray20, marginRight: 10 },
            ]}
          />
        )}
        {/* Text Input */}
        <TextInput
          style={[
            styles.textInput,
            {
              color: color.primaryBlue100,
              textAlignVertical: multiline ? 'top' : 'center',
            }, // Align text for multi-line
          ]}
          placeholderTextColor={color.gray20}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
        />
      </View>

      {/* Error Message */}
      {errorMessage ? (
        <Text style={[styles.errorText, { color: 'red' }]}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 15,
    width: '100%',
  },
  iconContainer: {
    marginRight: 10,
  },
  divider: {
    borderWidth: 0.5,
    height: '60%',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10, // Add padding for multi-line inputs
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default Input;
