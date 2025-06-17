import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Color, Padding} from '../../GlobalStyles';
import usePostData from '../../shared/fetch/usePostData';
import {useAuth} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';

interface FormData {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}

export default function CreateBankDetailsScreen() {
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
  });

  // ====================== hooks
  const {user} = useAuth();
  const navigation = useNavigation();

  // Handle input changes
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.accountHolderName)
      newErrors.accountHolderName = 'Account Holder’s Name is required';
    if (!formData.accountNumber || !/^\d{9,18}$/.test(formData.accountNumber))
      newErrors.accountNumber = 'Valid Account Number is required';
    if (!formData.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
      newErrors.ifscCode = 'Valid IFSC Code is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle save button
  const handleSave = async () => {
    if (validateForm()) {
      const data = await usePostData('create-user-bank-account', {
        accountHolderName: formData?.accountHolderName,
        accountNumber: formData?.accountNumber,
        ifscCode: formData?.ifscCode,
        user_id: user?.id,
      });
    } else {
    }
  };

  // ====================== render =================
  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          backgroundColor: Color.primaryBlue100,
          paddingVertical: 20,
          paddingHorizontal: 14,
        }}>
        <ChevronLeftIcon size={22} color={Color.white} />
        <Text style={styles.header}>Bank Details</Text>
      </Pressable>

      <View
        style={{
          padding: Padding.p_13xl,
        }}>
        {/* Account Holder’s Name Field */}
        <Text style={styles.label}>Account Holder’s Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#B0C4DE"
          value={formData.accountHolderName}
          onChangeText={value => handleChange('accountHolderName', value)}
        />
        {errors.accountHolderName && (
          <Text style={styles.errorText}>{errors.accountHolderName}</Text>
        )}

        {/* Account No. Field */}
        <Text style={styles.label}>Account No.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account No."
          placeholderTextColor="#B0C4DE"
          value={formData.accountNumber}
          onChangeText={value => handleChange('accountNumber', value)}
          keyboardType="numeric"
        />
        {errors.accountNumber && (
          <Text style={styles.errorText}>{errors.accountNumber}</Text>
        )}

        {/* IFSC Code Field */}
        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter IFSC"
          placeholderTextColor="#B0C4DE"
          value={formData.ifscCode}
          onChangeText={value => handleChange('ifscCode', value)}
        />
        {errors.ifscCode && (
          <Text style={styles.errorText}>{errors.ifscCode}</Text>
        )}
        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.white,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.primaryBlue100,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.colorRed,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: Color.secondaryColors100,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#1A387D',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 60,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
