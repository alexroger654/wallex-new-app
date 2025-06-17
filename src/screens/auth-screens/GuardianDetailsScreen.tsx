import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  ChevronLeftIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
} from 'react-native-heroicons/outline';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeProvider';
import Loading from '../../component/Loading';
import Input from '../../component/ui/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import usePostData from '../../shared/fetch/usePostData';
import usePatchData from '../../shared/fetch/usePatchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MapIcon, PhoneIcon, UserGroupIcon } from 'react-native-heroicons/solid';
import { Dropdown } from 'react-native-element-dropdown';
import useGetData from '../../shared/fetch/useGetData';
import { Color } from '../../GlobalStyles';

// ============= component
const GuardianDetailsScreen: React.FC = ({ navigation }: any) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // State for inputs
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [relation, setRelation] = useState('father');
  const [relationship_details, setRelationship_details] = useState('');
  const [city, setCity] = useState<any>('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [stateList, setStateList] = useState<any[]>([]);
  const [cityList, setCityList] = useState([]);

  const { user, setUser } = useAuth();

  async function getStateData() {
    const stateData = await useGetData('stateList');
    setStateList(stateData?.data);
  }

  async function getCityData() {
    const stateData = await useGetData(
      `cityList?stateId=${stateList?.find(item => item?.name == state)?.id}`,
    );
    setCityList(stateData?.data);
  }

  // Date picker state

  // ============== hooks ===================
  const { color } = useTheme();

  const validateForm = () => {
    if (!fullName || !mobile || !state || !address || !relation) {
      setError('Please Fill all the  required fields');
      return false;
    }

    // Validate mobile number (example: basic check for a 10-digit number)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.match(mobileRegex)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }

    if (relation === 'other' && !relationship_details) {
      setError('Please provide relationship details');
      return false;
    }

    setError('');
    return true;
  };

  async function handleUpdateUser() {

    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();

    // Append `data` field (must be stringified JSON)
    formData.append(
      'data',
      JSON.stringify({
        ...user,
        guardian_details: {
          full_name: fullName,
          mobile: mobile,
          relation: relation,
          relationship_details: relationship_details,
          location: {
            address: address,
            city: city,
            country: 'India',
            pincode: 1234567,
            state: state,
          },
        },
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

      console.group(data)

      if (data?.data?._id) {
        navigation?.navigate('ApplySuccess');

        // @ts-ignore
        setUser({
          ...user,
          ...data?.data
        })
      }

    }
  }

  useEffect(() => {
    getStateData();
  }, []);

  console.log(state, 'ppppppppppp');

  // =============

  useEffect(() => {
    getCityData();
  }, [state]);

  if (loading) {
    return <Loading />;
  }

  // =============== render
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 20,
        paddingTop: 50,
        alignItems: 'center',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          style={{ alignSelf: 'flex-start', marginBottom: 20 }}
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color={color.primaryBlue100} />
        </TouchableOpacity>

        {/* Step Text */}
        <Text
          style={{
            fontSize: 14,
            color: '#8A9CAD',
            marginBottom: 10,
            textAlign: 'center',
          }}>
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

        {error ? (
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 12,
              textAlign: 'center',
            }}>
            {error}
          </Text>
        ) : null}

        <View style={{ width: '100%' }}>
          {/* Full Name Input */}
          <Input
            value={fullName}
            label="Guardian Full name*"
            setValue={setFullName}
            placeholder="Enter full name"
            icon={<UserIcon size={24} color={color.gray20} />}
          />

          {/* mobile Input */}
          <Input
            value={mobile}
            label="Mobile*"
            setValue={setMobile}
            placeholder="Enter Mobile"
            icon={<DevicePhoneMobileIcon size={24} color={color.gray20} />}
          />

          <Text
            style={{
              color: color.primaryBlue100,
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 12,
              marginLeft: 8,
            }}>
            Relationship*
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}>
            {['father', 'mother', 'other']?.map(item => (
              <Pressable
                onPress={() => setRelation(item)}
                style={{
                  backgroundColor:
                    relation == item ? color.primaryBlue100 : color.lightGray,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color:
                      relation == item ? color.white : color.primaryBlue100,
                    fontSize: 14,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Relationship Details */}
          {relation == 'other' ? (
            <Input
              value={relationship_details}
              label="Relationship details*"
              setValue={setRelationship_details}
              placeholder="Relationship details"
              icon={<UserGroupIcon size={24} color={color.gray20} />}
            />
          ) : null}

          {/* State Dropdown */}
          <View style={{ flexDirection: 'row', marginBottom: 14, marginTop: 20 }}>
            <View style={{ flexGrow: 1 }}>
              <Dropdown
                labelField="name"
                valueField="name"
                style={{
                  height: 50,
                  borderColor: Color.secondaryColors300,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
                placeholderStyle={{
                  fontSize: 16,
                  color: Color.secondaryColors300,
                }}
                itemTextStyle={{
                  color: Color.primaryBlue100,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: color.primaryBlue100,
                }}
                data={stateList}
                value={state}
                onChange={item => setState(item?.name)}
                placeholder="Select State"
              />
            </View>
          </View>

          {/* City Dropdown */}
          <View style={{ flexDirection: 'row', marginBottom: 14, marginTop: 20 }}>
            <View style={{ flexGrow: 1 }}>
              <Dropdown
                labelField="name"
                valueField="name"
                style={{
                  height: 50,
                  borderColor: Color.secondaryColors300,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
                placeholderStyle={{
                  fontSize: 16,
                  color: Color.secondaryColors300,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: color.primaryBlue100,
                }}
                data={cityList}
                value={city}
                onChange={item => setCity(item?.name)}
                placeholder="Select City"
              />
            </View>
          </View>

          {/* <Input
            value={pincode}
            label="pincode*"
            setValue={setPincode}
            placeholder="Enter pincode"
            icon={<EnvelopeIcon size={24} color={color.gray20} />}
          /> */}

          {/* Address Input */}
          <Input
            value={address}
            label="Address*"
            setValue={setAddress}
            placeholder="Address"
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View
        style={{
          marginBottom: 10,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#001F54',
            paddingVertical: 15,
            borderRadius: 12,
            alignItems: 'center',
            width: '100%',
          }}
          onPress={handleUpdateUser}
          disabled={loading}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GuardianDetailsScreen;
