import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {
  ChevronLeftIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  PhoneIcon,
} from 'react-native-heroicons/outline';
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeProvider';
import Loading from '../../component/Loading';
import Input from '../../component/ui/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import usePostData from '../../shared/fetch/usePostData';
import usePatchData from '../../shared/fetch/usePatchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import useGetData from '../../shared/fetch/useGetData';
import {IUser} from '../../shared/interfaces/user.interface';

const EditProfileScreen: React.FC = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(false);

  // State for inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null); // Store Date object
  const [gender, setGender] = useState('');
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    instagram: '',
    x: '',
    whatsapp: '',
  });

  // Date picker state
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Hooks
  const {color} = useTheme();
  const toast = useToast();
  const {user} = useAuth();

  // Handlers for date picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (date: Date) => {
    setDateOfBirth(date); // Store Date object
    hideDatePicker();
  };

  async function getUser() {
    const result: {data: IUser} = await useGetData('user/profile', 'service');

    setFullName(result?.data?.full_name);
    setEmail(result?.data?.email);
    setMobile(result?.data?.mobile);
    setDateOfBirth(user?.dob ? new Date(result?.data?.dob) : null);
    setGender(result?.data?.full_name);
  }

  async function handleUpdateUser() {
    setLoading(true);
    let userData: any = await AsyncStorage.getItem('user');

    try {
      const formattedDOB = dateOfBirth
        ? moment(dateOfBirth).format('YYYY-MM-DD') // Format for submission
        : null;

      const response = await fetch(
        'https://dev.wallex.world/service/user/profile',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(userData)?.accessToken}`,
          },
          body: JSON.stringify({
            email,
            dob: formattedDOB,
            full_name: fullName,
            mobile,
            // gender,
          }),
        },
      );

      const result = await response.json();

      if (response.ok && result?.code === 200) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            ...JSON.parse(userData),
            accessToken: JSON.parse(userData)?.accessToken,
            ...result?.data,
          }),
        );

        toast.show('Updated');
      } else {
        console.error(
          'Error updating user:',
          result?.message || 'Unknown error',
        );

        getUser();
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [user?._id]);

  if (loading) {
    return <Loading />;
  }

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
        style={{alignSelf: 'flex-start', marginBottom: 20}}
        onPress={() =>
          navigation.navigate('ProfileOverviewScreen', {
            refetch: !route?.params?.refetch || true,
          })
        }>
        <ChevronLeftIcon size={24} color={color.primaryBlue100} />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: color.primaryBlue100,
          textAlign: 'center',
          marginBottom: 8,
        }}>
        Update Profile Info
      </Text>

      <ScrollView
        style={{width: '100%', flex: 1}}
        showsVerticalScrollIndicator={false}>
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

        {/* Mobile Input */}
        <Input
          value={mobile}
          label="Mobile*"
          setValue={setMobile}
          placeholder="Enter Mobile Number"
          icon={<PhoneIcon size={24} color={color.gray20} />}
        />

        {/* Date of Birth Input */}
        <TouchableOpacity onPress={showDatePicker} activeOpacity={0.8}>
          <Input
            value={dateOfBirth ? moment(dateOfBirth).format('YYYY-MM-DD') : ''} // Display formatted date
            label="Date of birth*"
            setValue={() => {}}
            placeholder="YYYY-MM-DD"
            icon={<CalendarDaysIcon size={24} color={color.gray20} />}
            editable={false} // Make this field read-only
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
      </ScrollView>
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
        }}>
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
          <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;
