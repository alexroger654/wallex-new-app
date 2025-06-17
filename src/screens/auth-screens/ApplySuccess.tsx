import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const ApplySuccess = ({navigation}: any) => {
  const handleContinue = () => {
    console.log('Continue button pressed');
    // Add navigation logic here if needed
    // Example: navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png', // Example success icon URL
        }}
        style={styles.successIcon}
      />
      {/* Success Message */}
      <Text style={styles.title}>Application Successful!</Text>
      <Text style={styles.message}>
        Thank you for applying for membership. Your application has been
        successfully submitted. We'll notify you soon!
      </Text>
      {/* Continue Button */}
      <TouchableOpacity
        onPressIn={() => navigation?.navigate('HomeScreen')}
        style={styles.button}
        onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ApplySuccess;
