import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigator/stackNavigator';
import CartProvider from './src/context/DigiGoldCartContext';
import {AuthProvider} from './src/context/AuthContext';
import {ToastProvider} from 'react-native-toast-notifications';
import ThemeProvider from './src/context/ThemeProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Text as DefaultText} from 'react-native';
import CustomText2 from './src/component/CustomText2';
import * as Keychain from 'react-native-keychain';
// Override the default Text globally
// @ts-ignore
global.Text = CustomText2;

// import ThemeProvider from './src/context/ThemeProvider';
// import { AuthProvider } from './src/context/AuthContext';
// import { ToastProvider } from 'react-native-toast-notifications';
// import CartProvider from './src/context/DigiGoldCartContext';

function App(): React.JSX.Element {
  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  // const authenticateUser = async () => {
  //   try {
  //     // Request authentication using biometrics or PIN
  //     const options = {
  //       accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  //       authenticationPrompt: {
  //         title: 'Authenticate',
  //         subtitle: 'Unlock to access the app',
  //       },
  //     };

  //     // Save dummy credentials to trigger authentication
  //     await Keychain.setGenericPassword('dummyUser', 'dummyPassword', options);

  //     // Attempt to retrieve the saved credentials
  //     const credentials = await Keychain.getGenericPassword(options);

  //     if (credentials) {
  //       console.log('Authentication successful!');
  //       Alert.alert('Success', 'You are authenticated!');
  //     } else {
  //       console.log('Authentication canceled by user.');
  //       Alert.alert(
  //         'Authentication Failed',
  //         'Please authenticate to use the app.',
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Authentication error:', error);
  //     Alert.alert(
  //       'Error',
  //       'Your device does not support authentication or it is not set up.',
  //     );
  //   }
  // };

  //======================= render =======================
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider>
              <ToastProvider>
                <MyStack />
              </ToastProvider>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
