import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Color} from '../../GlobalStyles';
import {Bars3Icon, ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Dropdown} from 'react-native-element-dropdown';
import {IAirport} from '../../shared/interfaces/airports.interface';
import SelectGuestCount from '../../component/flight-search/SelectGuestCounts';
import {useToast} from 'react-native-toast-notifications';
import FlightSidebar from '../../component/flight-bookin/FlightSidebar';

// ================= component

export default function FlightSearchScreen({navigation}: any) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [passengers, setPassengers] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tripType, setTripType] = useState('O');
  const [isFocus, setIsFocus] = useState(false);
  const [isToFocus, setIsToFocus] = useState(false);
  const [isTypeFocus, setIsTypeFocus] = useState(false);
  const [flightType, setFlightType] = useState('');
  const [value, setValue] = useState('');
  const [airPorts, setAirPorts] = useState<IAirport[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [isReturnDatePickerVisible, setReturnDatePickerVisibility] =
    useState(false);

  const handleConfirmReturnDate = (date: any) => {
    const formattedDate = formatDate(date);
    setReturnDate(formattedDate);
    setReturnDatePickerVisibility(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const flightTypeArray = [
    {label: 'First Class', value: 'First'},
    {label: 'Special', value: 'Special'},
    {label: 'Business', value: 'Business'},
    {label: 'Economy', value: 'Economy'},
  ];
  const toast = useToast();

  async function getAirports(searchTerm = '', limit = 40) {
    console.log('here ========================>');
    try {
      const baseUrl = 'https://dev.wallex.world/service/airports';
      const url = `${baseUrl}?searchTerm=${encodeURIComponent(
        searchTerm,
      )}&limit=${limit}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();

      console.log(data, '[[[[[[[[[[[[[[[[[[[[[[[');

      const transformedAirports = data?.data.map((airport: any) => ({
        ...airport,
        label: `${airport.city} (${airport.country}) - ${airport.name}`,
      }));

      setAirPorts(transformedAirports);
    } catch (error) {
      console.error('Failed to fetch airports:', error);
    }
  }

  const handleConfirmDate = (date: any) => {
    const formattedDate = formatDate(date);
    setDepartDate(formattedDate);
    setDatePickerVisibility(false);
  };

  // Helper function to format the date
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    getAirports();
  }, []);

  function handleNext() {
    if (!flightType || !guestCounts?.adults || !departDate || !to || !from) {
      toast?.show('All Fields Are Required', {
        type: 'danger',
      });
      return;
    }

    if (tripType == 'O') {
      navigation?.navigate('FlightSearchResultScreen', {
        search: {
          seatType: flightType,
          INF: guestCounts?.infants,
          CHD: guestCounts?.children,
          ADT: guestCounts?.adults,
          flight_depart_date: departDate,
          returnDate: returnDate,
          destination: to?.iata,
          origin: from?.iata,
          originCountry: from?.country,
          destinationCountry: to?.country,
          type: tripType,
        },
      });
    } else {
      navigation?.navigate('RoundTripSearchScreen', {
        search: {
          seatType: flightType,
          INF: guestCounts?.infants,
          CHD: guestCounts?.children,
          ADT: guestCounts?.adults,
          flight_depart_date: departDate,
          returnDate: returnDate,
          destination: to?.iata,
          origin: from?.iata,
          originCountry: from?.country,
          destinationCountry: to?.country,
          type: tripType,
        },
      });
    }
  }

  // ============================ render ===================
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View
        style={{
          backgroundColor: Color.primaryBlue100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
          paddingVertical: 20,
          marginBottom: 20,
          paddingHorizontal: 14,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={22} color={Color.white} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: Color.white,
            }}>
            Travel Services
          </Text>
        </View>
        <Pressable onPress={() => setIsSidebarVisible(true)}>
          <Bars3Icon size={22} color={Color.white} />
        </Pressable>
      </View>

      <View
        style={{
          padding: 20,
        }}>
        {/* Trip Type Toggle */}
        <View style={styles.tripTypeContainer}>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              tripType === 'O' && styles.selectedTripType,
            ]}
            onPress={() => setTripType('O')}>
            <Text style={styles.tripTypeText}>One Way Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              tripType === 'R' && styles.selectedTripType,
            ]}
            onPress={() => setTripType('R')}>
            <Text style={styles.tripTypeText}>Round Trip</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <View
            style={{
              backgroundColor: 'white',
            }}>
            <Dropdown
              style={[styles.input]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={airPorts}
              search
              maxHeight={300}
              labelField="label"
              valueField="iata"
              searchQuery={(keyword: any) => {
                getAirports(keyword);
              }}
              itemTextStyle={{
                color: Color.primaryBlue100,
              }}
              placeholder={!isFocus ? 'From*' : '...'}
              searchPlaceholder="Search..."
              value={from}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setFrom(item);
                setIsFocus(false);
              }}
              // onSearch={(searchTerm: any) => {
              //   getAirports(searchTerm); // Call API with user input
              // }}
            />
            {/* <Text style={styles.text}>Selected: {value}</Text> */}
          </View>

          <View
            style={{
              backgroundColor: 'white',
            }}>
            <Dropdown
              style={[styles.input]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={airPorts}
              search
              maxHeight={300}
              labelField="label"
              valueField="iata"
              searchQuery={(keyword: any) => {
                getAirports(keyword);
              }}
              itemTextStyle={{
                color: Color.primaryBlue100,
              }}
              placeholder={!isToFocus ? 'To*' : '...'}
              searchPlaceholder="Search..."
              value={to}
              onFocus={() => setIsToFocus(true)}
              onBlur={() => setIsToFocus(false)}
              onChange={item => {
                setTo(item);
                setIsToFocus(false);
              }}
            />
            {/* <Text style={styles.text}>Selected: {value}</Text> */}
          </View>
          <View
            style={{
              backgroundColor: 'white',
            }}>
            <Dropdown
              style={[styles.input]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={flightTypeArray}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={{
                color: Color.primaryBlue100,
              }}
              placeholder={!isTypeFocus ? 'Class' : '...'}
              searchPlaceholder="Search..."
              value={flightType}
              onFocus={() => setIsTypeFocus(true)}
              onBlur={() => setIsTypeFocus(false)}
              onChange={item => {
                setFlightType(item?.value);
                setIsTypeFocus(false);
              }}
            />
            {/* <Text style={styles.text}>Selected: {value}</Text> */}
          </View>

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.dateText}>
              {departDate ? departDate : 'DD - MM - YYYY'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            minimumDate={new Date()}
            onCancel={() => setDatePickerVisibility(false)}
          />

          {/* ================ */}
          {/* Date Pickers */}

          {tripType === 'R' && (
            <>
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setReturnDatePickerVisibility(true)}>
                <Text style={styles.dateText}>
                  {returnDate ? returnDate : 'Return Date (DD - MM - YYYY)'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isReturnDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmReturnDate}
                minimumDate={new Date()}
                onCancel={() => setReturnDatePickerVisibility(false)}
              />
            </>
          )}

          <Text
            style={[
              styles.searchButtonText,
              {
                color: Color.primaryBlue100,
                marginBottom: 6,
              },
            ]}>
            Travelers
          </Text>
          <TouchableOpacity onPress={openModal}>
            <TextInput
              onPress={() => setIsModalVisible(true)}
              style={styles.input}
              placeholder="Number Of Passengers*"
              keyboardType="numeric"
              readOnly
              value={`Adult-${guestCounts?.adults} Child-${guestCounts?.children} Infants -${guestCounts?.infants}`}
              onChangeText={setPassengers}
              placeholderTextColor={Color.primaryBlue20}
            />
          </TouchableOpacity>

          {/* Search Button */}
          <TouchableOpacity onPress={handleNext} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search Flights</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SelectGuestCount
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        guestCounts={guestCounts}
        setGuestCounts={setGuestCounts}
      />
      <FlightSidebar
        isModalVisible={isSidebarVisible}
        setModalVisible={setIsSidebarVisible}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  backArrow: {
    fontSize: 24,
    color: '#1a2d6d',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.white,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: Color.primaryBlue20,
    borderRadius: 10,
    padding: 6,
  },
  tripTypeButton: {
    padding: 9,
    borderRadius: 10,
    width: '49%',
  },
  selectedTripType: {
    backgroundColor: Color.white,
  },
  tripTypeText: {
    color: Color.primaryBlue100,
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  datePicker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#888',
  },
  searchButton: {
    backgroundColor: '#1a2d6d',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: '#000',
  },
  text: {
    marginTop: 20,
    fontSize: 14,
    color: '#000',
  },
});
