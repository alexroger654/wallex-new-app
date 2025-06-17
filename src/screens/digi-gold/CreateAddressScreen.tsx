import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {Color, Padding} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import usePostData from '../../shared/fetch/usePostData';
import {Toast} from 'react-native-toast-notifications';

interface FormData {
  name: string;
  emailId: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  address: string;
}

export default function CreateAddressScreen({navigation}: any) {
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    emailId: '',
    city: '',
    state: '',
    pincode: '',
    mobileNumber: '',
    address: '',
  });

  // Handle input changes
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.emailId.trim() || !/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = 'Enter a valid email';
    }
    if (
      !formData.mobileNumber.trim() ||
      !/^\d{10}$/.test(formData.mobileNumber)
    ) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle save button
  const handleSave = async () => {
    if (validateForm()) {
      //   const data = await usePostData('create-user-address', {
      //     ...formData,
      //     user_id: '66292db9d603a297d4535585',
      //   });
      const data = await usePostData('create-user-address', {
        user_id: '66292db9d603a297d4535585',
        mobileNumber: formData.mobileNumber,
        emailId: formData.emailId,
        name: formData.name,
        address: formData.address,
        state: 'eyqMQqYd',
        city: 'LQ78Mo9m',
        pincode: formData.pincode,
      });

      if (data) {
        Toast.show('Address Created', {
          type: 'danger',
        });
        navigation?.goBack();
      } else {
        Toast.show('Something Went Wrong Please Try Again ', {
          type: 'danger',
        });
      }
    }
  };

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
        <Text style={styles.header}>Create Address</Text>
      </Pressable>

      <ScrollView
        style={{
          padding: Padding.p_13xl,
        }}>
        {/* Name Field */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={value => handleChange('name', value)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* Email Field */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.emailId}
          onChangeText={value => handleChange('emailId', value)}
          keyboardType="email-address"
        />
        {errors.emailId && (
          <Text style={styles.errorText}>{errors.emailId}</Text>
        )}

        {/* Mobile Field */}
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={formData.mobileNumber}
          onChangeText={value => handleChange('mobileNumber', value)}
          keyboardType="numeric"
        />
        {errors.mobileNumber && (
          <Text style={styles.errorText}>{errors.mobileNumber}</Text>
        )}

        {/* City Field */}
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={value => handleChange('city', value)}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

        {/* State Field */}
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={formData.state}
          onChangeText={value => handleChange('state', value)}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

        {/* Pincode Field */}
        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          value={formData.pincode}
          onChangeText={value => handleChange('pincode', value)}
          keyboardType="numeric"
        />
        {errors.pincode && (
          <Text style={styles.errorText}>{errors.pincode}</Text>
        )}

        {/* Address Field */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={value => handleChange('address', value)}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}
      </ScrollView>

      {/* Save Button */}
      <View style={{padding: 14}}>
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
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
