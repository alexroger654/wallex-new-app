import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import {
  ChevronLeftIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
} from 'react-native-heroicons/outline';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeProvider';
import Loading from '../../component/Loading';
import Input from '../../component/ui/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import usePostData from '../../shared/fetch/usePostData';
import usePatchData from '../../shared/fetch/usePatchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// ============= component
const UpdateNameAndAgeScreen: React.FC = ({ navigation }: any) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // State for inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  // Date picker state
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // ============== hooks ===================
  const { color } = useTheme();
  const { user, setUser } = useAuth();

  // Handlers for date picker
  // Handlers for date picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (date: Date) => {
    setDateOfBirth(date); // Store Date object
    hideDatePicker();
  };

  function isOlderThan18(birthDateString: any) {
    const birthDate = new Date(birthDateString); // Convert to "YYYY-MM-DD"
    const today = new Date();

    // Calculate age
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Check if the person has turned 18 yet
    if (age > 18) {
      return true;
    } else if (age === 18) {
      return (
        monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)
      );
    } else {
      return false;
    }
  }

  // Validation function
  const validateInputs = (): boolean => {
    if (!fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!dateOfBirth) {
      setError('Date of birth is required');
      return false;
    }
    setError(''); // Clear any existing errors
    return true;
  };

  console.log(moment(dateOfBirth).format('YYYY-MM-DD'));

  async function handleUpdateUser() {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);


    console.log(isOlderThan18(dateOfBirth), "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")



    if (isOlderThan18(dateOfBirth)) {
      handleApply()

    }
    else {

      // @ts-ignore
      setUser({
        ...user, email: email,
        dob: moment(dateOfBirth).format('YYYY-MM-DD'),
        full_name: fullName,
      })
      navigation.navigate('GuardianDetailsScreen');
    }

    setLoading(false);
  }



  async function handleApply() {
    if (!validateInputs()) return;
    const formData = new FormData();

    // Append `data` field (must be stringified JSON)
    formData.append(
      'data',
      JSON.stringify({
        ...user,
        email: email,
        dob: moment(dateOfBirth).format('YYYY-MM-DD'),
        full_name: fullName,
        "location": {
          "address": "Y Road, M Appartment 6B",
          "city": "ABC",
          "country": "India",
          "pincode": 1234567,
          "state": "XYZ"
        },
        "aadhar": "12321244231",
        "bank_ifsc": "ICIC000011",
        "ac_number": "1730526751065803",
        "gender": "male",
      })
    );

    const res = await fetch('https://dev.wallex.world/service/users/activation-requests', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: formData,
    });

    const result = await res.text();
    if (result.startsWith('<!DOCTYPE html>')) {
      console.error('Got HTML instead of JSON. Possibly redirected to login.');
    } else {
      const data = JSON.parse(result);

      console.log(data)
      if (data?.data?._id) {
        setUser({
          ...user,
          ...data?.data
        })
        navigation?.navigate('ApplySuccess');
      }

    }








    // if (result?.code === 200) {
    //   // await AsyncStorage.setItem(
    //   //   'user',
    //   //   JSON.stringify({
    //   //     ...parsedUserData,
    //   //     accessToken: parsedUserData?.accessToken,
    //   //     ...result?.data,
    //   //     email: email,
    //   //     dob: moment(dateOfBirth).format('YYYY-MM-DD'),
    //   //     full_name: fullName,
    //   //   }),
    //   // );

    //   // setUser({
    //   //   ...parsedUserData,
    //   //   accessToken: parsedUserData?.accessToken,
    //   //   ...result?.data,
    //   //   email: email,
    //   //   dob: moment(dateOfBirth).format('YYYY-MM-DD'),
    //   //   full_name: fullName,
    //   // })



    //   // navigation?.navigate(isOlderThan18(dateOfBirth) ? 'ApplySuccess' : 'GuardianDetailsScreen');
    // } else {
    //   setError(result?.message || 'Failed to update user details');
    // }


    // try {
    //   setLoading(true);

    //   const res = await fetch('https://dev.wallex.world/users/activation-requests', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${parsedUserData?.accessToken}`,
    //     },
    //     body: formData,
    //   });

    //   const result = await res.json();

    //   console.log(result, ",,,,,,,,,,,,,,,,,,,,,,,,,,,, |||||||||||||||||||||||||||||")


    //   if (result?.code === 200) {
    //     // await AsyncStorage.setItem(
    //     //   'user',
    //     //   JSON.stringify({
    //     //     ...parsedUserData,
    //     //     accessToken: parsedUserData?.accessToken,
    //     //     ...result?.data,
    //     //     email: email,
    //     //     dob: moment(dateOfBirth).format('YYYY-MM-DD'),
    //     //     full_name: fullName,
    //     //   }),
    //     // );

    //     // setUser({
    //     //   ...parsedUserData,
    //     //   accessToken: parsedUserData?.accessToken,
    //     //   ...result?.data,
    //     //   email: email,
    //     //   dob: moment(dateOfBirth).format('YYYY-MM-DD'),
    //     //   full_name: fullName,
    //     // })



    //     // navigation?.navigate(isOlderThan18(dateOfBirth) ? 'ApplySuccess' : 'GuardianDetailsScreen');
    //   } else {
    //     setError(result?.message || 'Failed to update user details');
    //   }
    // } catch (err) {

    //   console.log(err)
    //   setError('Something went wrong');
    // } finally {
    //   setLoading(false);
    // }
  }


  if (loading) {
    return <Loading />;
  }

  //   =============== render
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.lightGray,
        paddingHorizontal: 20,
        paddingTop: 50,
        alignItems: 'center',
      }}>
      {/* Back Button */}
      <TouchableOpacity
        style={{ alignSelf: 'flex-start', marginBottom: 20 }}
        onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={24} color={color.primaryBlue100} />
      </TouchableOpacity>

      {/* Step Text */}
      <Text style={{ fontSize: 14, color: '#8A9CAD', marginBottom: 10 }}>
        Step 1/2
      </Text>

      {/* Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: color.primaryBlue100,
          textAlign: 'center',
          marginBottom: 8,
        }}>
        Join Wallex Membership
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 14,
          color: color.primaryBlue80,
          textAlign: 'center',
          marginBottom: 30,
        }}>
        Unlock Exclusive Benefits by Sharing Your Details Below!
      </Text>

      <View style={{ width: '100%' }}>
        {/* Display Error Message */}
        {error ? (
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              marginBottom: 10,
              textAlign: 'center',
            }}>
            {error}
          </Text>
        ) : null}

        {/* Full Name Input */}
        <Input
          value={fullName}
          label="Full name*"
          setValue={setFullName}
          placeholder="Enter full name"
          icon={<UserIcon size={24} color={color.gray20} />}
        />

        {/* Email Input */}
        <Input
          value={email}
          label="Email*"
          setValue={setEmail}
          placeholder="Enter email"
          icon={<EnvelopeIcon size={24} color={color.gray20} />}
        />

        {/* Date of Birth Input */}
        <TouchableOpacity onPress={showDatePicker} activeOpacity={0.8}>
          <Input
            value={dateOfBirth ? moment(dateOfBirth).format('YYYY-MM-DD') : ''} // Display formatted date
            label="Date of birth*"
            setValue={() => { }}
            placeholder="YYYY-MM-DD"
            editable={false}
            icon={<CalendarDaysIcon size={24} color={color.gray20} />}

          />
        </TouchableOpacity>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()} // Prevent selecting future dates
          display={Platform.OS === 'ios' ? 'inline' : 'default'} // Native look for iOS
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#001F54',
            paddingVertical: 15,
            borderRadius: 12,
            alignItems: 'center',
            width: '100%',
          }}
          onPress={handleUpdateUser}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
            {isOlderThan18(dateOfBirth) ? 'Apply' : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateNameAndAgeScreen;
