import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Color} from '../../GlobalStyles';

const UserInfo = ({contactInfo, setContactInfo}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const titles = ['Mr.', 'Mrs.', 'Miss'];

  const handleSelection = (title: string) => {
    setContactInfo({...contactInfo, title});
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Title:</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        {titles.map(title => (
          <TouchableOpacity
            key={title}
            style={{
              backgroundColor:
                contactInfo?.title == title
                  ? Color.primaryBlue100
                  : Color.white,
              paddingVertical: 6,
              paddingHorizontal: 16,
              marginBottom: 14,
              marginTop: 8,
              borderRadius: 8,
            }}
            onPress={() => handleSelection(title)}>
            <Text
              style={{
                color:
                  contactInfo?.title == title
                    ? Color.white
                    : Color.primaryBlue100,
                fontWeight: '700',
                fontSize: 16,
                borderRadius: 4,
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input Fields */}
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter first name"
        value={contactInfo?.firstName}
        onChangeText={e => setContactInfo({...contactInfo, firstName: e})}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter last name"
        value={contactInfo?.lastName}
        onChangeText={e => setContactInfo({...contactInfo, lastName: e})}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        keyboardType="email-address"
        value={contactInfo?.email}
        onChangeText={e => setContactInfo({...contactInfo, email: e})}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={contactInfo?.phone}
        onChangeText={e => setContactInfo({...contactInfo, phone: e})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1B386E',
  },
  select: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    height: 50,
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    color: '#1B386E',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 250,
    padding: 10,
    alignItems: 'center',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default UserInfo;
