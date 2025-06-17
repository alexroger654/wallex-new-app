import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen2 from '../screens/HomeScreen2';
import LoadingScreen from '../screens/LoadingScreen';
import BuyGoldSilverScreen from '../screens/digi-gold/BuyGoldSilverScreen';
import CreateBankDetailsScreen from '../screens/digi-gold/CreateBankDetailsScreen';
import CreateDigiGoldAccount from '../screens/digi-gold/CreateDigiGoldAccount';
import DigiGoldCartScreen from '../screens/digi-gold/DigiGoldCartScreen';
import DigiGoldHomeScreen from '../screens/digi-gold/DigiGoldHomeScreen';
import SelectAddressScreen from '../screens/digi-gold/SelectAddressScreen';
import CreateAddressScreen from '../screens/digi-gold/CreateAddressScreen';
import GiftCardHomeScreen from '../screens/gift-card-screens/GiftCardHomeScreen';
import GiftCardDetailsScreen from '../screens/gift-card-screens/GiftCardDetailsScreen';
import GiftCardListScreen from '../screens/gift-card-screens/GiftCardListScreen';
import HotelHomeScreen from '../screens/hotels/HotelHomeScreen';
import HotelSearchScreen from '../screens/hotels/HotelSearchScreen';
import HotelDetailsScreen from '../screens/hotels/HotelDetailsScreen';
import TravelerDetailsScreen from '../screens/hotels/TravelerDetailsScreen';
import DigiGoldOrderScreen from '../screens/digi-gold/DigiGoldOrderScreen';
import AllProductsScreen from '../screens/digi-gold/AllProductsScreen';
import SellGoldScreen from '../screens/digi-gold/SellGoldScreen';
import HotelBookingList from '../screens/hotels/HotelBookingList';
import BillPaymentHomeScreen from '../screens/bill-payment/BillPaymentHomeScreen';
import BillPaymentScreen from '../screens/bill-payment/BillPaymentScreen';
import ReceiptScreen from '../screens/bill-payment/ReceiptScreen';
import FlightBookingHome from '../screens/flight-booking-screens/FlightBookingHome';
import FlightCheckoutScreen from '../screens/flight-booking-screens/FlightCheckoutScreen';
import FlightSearchResultScreen from '../screens/flight-booking-screens/FlightSearchResultScreen';
import MyBookingsScreen from '../screens/flight-booking-screens/MyBookingsScreen';
import PaymentSuccessfulScreen from '../screens/flight-booking-screens/PaymentSuccessfulScreen';
import SeatSelectionScreen from '../screens/flight-booking-screens/SeatSelectionScreen';
import TravellerDetailsScreen from '../screens/flight-booking-screens/TravellerDetailsScreen';
import SelectContactOrProvider from '../screens/bill-payment/SelectContactOrProvider';
import ComplaintDetailsScreen from '../screens/bill-payment/ComplaintDetailsScreen';
import MyComplaintsScreen from '../screens/bill-payment/MyComplaintsScreen';
import SupportScreen from '../screens/bill-payment/SupportScreen';
import HomeScreen from '../screens/HomeScreen';
import UpdateNameAndAgeScreen from '../screens/auth-screens/UpdateNameAndAgeScreen';
import { useAuth } from '../context/AuthContext';
import Loading from '../component/Loading';
import LoginScreen from '../screens/auth-screens/LoginScreen';
import OtpVerificationScreen from '../screens/auth-screens/OtpVerificationScreen';
import GuardianDetailsScreen from '../screens/auth-screens/GuardianDetailsScreen';
import AadharNumberScreen from '../screens/auth-screens/AadharNumberScreen';
import AdharCardOtpScreen from '../screens/auth-screens/AdharCardOtpScreen';
import PersonalDetailsScreen from '../screens/auth-screens/PersonalDetailsScreen';
import ApplySuccess from '../screens/auth-screens/ApplySuccess';
import GiftCardOrderListScreen from '../screens/gift-card-screens/GiftCardOrderListScreen';
import BookingDetails from '../screens/hotels/BookingDetails';
import MyInvestments from '../screens/digi-gold/MyInvestments';
import EnterAmountScreen from '../screens/banking-screens/send-money-screens/EnterAmountScreen';
import SelectContactScreen from '../screens/banking-screens/send-money-screens/SelectContactScreen';
import TopUpScreens from '../screens/banking-screens/TopUpScreens';
import ConfirmTopupPaymentScreen from '../screens/banking-screens/ConfirmTopupPaymentScreen';
import TopUpBankDetailsScreen from '../screens/banking-screens/TopUpBankDetailsScreen';
import TopUpOtpScreen from '../screens/banking-screens/TopUpOtpScreen';
import TopUpReceiptScreen from '../screens/banking-screens/TopUpReceiptScreen';
import CardScreen from '../screens/card/CardScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import EditProfileScreen from '../screens/auth-screens/EditProfileScreen';
import CardDetailsScreen from '../screens/card-details/CardDetailsScreen';
import TransactionScreen from '../screens/card/TransactionScreen';
import BottomTab from './BottomTab';
import ExpensesScreen from '../screens/split-bills/ExpensesScreen';
import SplitBillHomeScreen from '../screens/split-bills/SplitBillHomeScreen';
import SplitBillSelectServiceScreen from '../screens/split-bills/SplitBillSelectServiceScreen';
import EntertainmentServiceScreen from '../screens/split-bills/EntertainmentServiceScreen';
import ChoosePlatformScreen from '../screens/split-bills/ChoosePlatformScreen';
import SelectGroupContactScreen from '../screens/split-bills/SelectGroupContactScreen';
import AddExpenseScreen from '../screens/split-bills/AddExpenseScreen';
import AdjustSplitScreen from '../screens/split-bills/AdjustSplitScreen';
import InfluencerHomeScreen from '../screens/Influencer-screens/InfluencerHomeScreen';
import MyReportScreen from '../screens/Influencer-screens/MyReportScreen';
import AboutMeScreen from '../screens/Influencer-screens/AboutMeScreen';
import PaymentsScreen from '../screens/Influencer-screens/PaymentScreen';
import BrandsScreen from '../screens/Influencer-screens/BrandsScreen';
import CampaignDetails from '../screens/Influencer-screens/CampaignDetails';
import CreateInfluencerScreen from '../screens/Influencer-screens/CreateInfluencerScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileOverviewScreen from '../screens/settings-screens/ProfileOverviewScreen';
import NotificationsScreen from '../screens/settings-screens/NotificationScreen';
import ReferAndEarnScreen from '../screens/settings-screens/ReferAndEarnScreen';
import HelpSupportScreen from '../screens/settings-screens/HelpSupportScreen';
import CreateTicketScreen from '../screens/settings-screens/CreateTicketScreen';
import SupportChatScreen from '../screens/settings-screens/SupportChatScreen';
import SecurityScreen from '../screens/auth-screens/SecurityScreen';
import BankAccountScreen from '../screens/digi-gold/BankAccountScreen';
import RoundTripSearchScreen from '../screens/flight-booking-screens/roundtrip/RoundTripSearchScreen';
import RoundTripFlightCheckoutScreen from '../screens/flight-booking-screens/roundtrip/RoundTripFlightCheckoutScreen';
import RoundTripTravellerDetailsScreen from '../screens/flight-booking-screens/roundtrip/RoundTripTravellerDetailsScreen';
import RoundTripSeatSelectionScreen from '../screens/flight-booking-screens/roundtrip/RoundTripSeatSelectionScreen';
import RoundTripPaymentSuccessfulScreen from '../screens/flight-booking-screens/roundtrip/RoundTripPaymentSuccessfulScreen';
import MiniStatementScreen from '../screens/card/MiniStatementScreen';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  // ============ states==========================
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log(user?._id);
  }, [user?._id]);

  // =============== loading======================
  if (loading) {
    return <Loading />;
  }

  // ================== render ===================

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarAnimation: 'slide',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          animationDuration: 9000,
        }}>
        {/* ==================  screens ================== */}
        {user ? (
          <>
            <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
            <Stack.Screen name="Main" component={BottomTab} />
            {/* ============== shared screens =========================== */}
            <Stack.Screen name="HomeScreen" component={HomeScreen2} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
            <Stack.Screen
              name="ProfileOverviewScreen"
              component={ProfileOverviewScreen}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationsScreen}
            />
            <Stack.Screen
              name="ReferAndEarnScreen"
              component={ReferAndEarnScreen}
            />
            <Stack.Screen
              name="HelpSupportScreen"
              component={HelpSupportScreen}
            />
            <Stack.Screen
              name="CreateTicketScreen"
              component={CreateTicketScreen}
            />
            <Stack.Screen
              name="SupportChatScreen"
              component={SupportChatScreen}
            />

            {/* Influencer ====================================== */}

            <Stack.Screen
              name="InfluencerHomeScreen"
              component={InfluencerHomeScreen}
            />
            <Stack.Screen name="MyReportScreen" component={MyReportScreen} />
            <Stack.Screen
              name="CreateInfluencerScreen"
              component={CreateInfluencerScreen}
            />
            <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
            <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
            <Stack.Screen name="BrandsScreen" component={BrandsScreen} />
            <Stack.Screen name="CampaignDetails" component={CampaignDetails} />

            {/* split bills ====================================== */}
            <Stack.Screen
              name="SelectGroupContactScreen"
              component={SelectGroupContactScreen}
            />
            <Stack.Screen
              name="AdjustSplitScreen"
              component={AdjustSplitScreen}
            />
            <Stack.Screen
              name="AddExpenseScreen"
              component={AddExpenseScreen}
            />
            <Stack.Screen
              name="SplitBillSelectServiceScreen"
              component={SplitBillSelectServiceScreen}
            />
            <Stack.Screen
              name="ChoosePlatformScreen"
              component={ChoosePlatformScreen}
            />
            <Stack.Screen
              name="EntertainmentServiceScreen"
              component={EntertainmentServiceScreen}
            />
            <Stack.Screen
              name="SplitBillHomeScreen"
              component={SplitBillHomeScreen}
            />
            <Stack.Screen name="ExpensesScreen" component={ExpensesScreen} />

            {/* ============== Banking =========================== */}
            <Stack.Screen
              name="CardDetailsScreen"
              component={CardDetailsScreen}
            />
            <Stack.Screen
              name="TransactionScreen"
              component={TransactionScreen}
            />
            <Stack.Screen
              name="EnterAmountScreen"
              component={EnterAmountScreen}
            />
            <Stack.Screen name="CardScreen" component={CardScreen} />
            <Stack.Screen
              name="SelectContactScreen"
              component={SelectContactScreen}
            />
            <Stack.Screen name="TopUpScreens" component={TopUpScreens} />
            <Stack.Screen
              name="ConfirmTopupPaymentScreen"
              component={ConfirmTopupPaymentScreen}
            />
            <Stack.Screen
              name="TopUpReceiptScreen"
              component={TopUpReceiptScreen}
            />
            <Stack.Screen
              name="TopUpBankDetailsScreen"
              component={TopUpBankDetailsScreen}
            />
            <Stack.Screen name="TopUpOtpScreen" component={TopUpOtpScreen} />

            {/* ========= apply for member ship screen=========  */}
            <Stack.Screen
              name="UpdateNameAndAgeScreen"
              component={UpdateNameAndAgeScreen}
            />
            <Stack.Screen
              name="GuardianDetailsScreen"
              component={GuardianDetailsScreen}
            />
            <Stack.Screen
              name="PersonalDetailsScreen"
              component={PersonalDetailsScreen}
            />
            <Stack.Screen name="ApplySuccess" component={ApplySuccess} />

            {/* digi gold */}
            <Stack.Screen
              name="DigiGoldHomeScreen"
              component={DigiGoldHomeScreen}
            />
            <Stack.Screen
              name="BuyGoldSilverScreen"
              component={BuyGoldSilverScreen}
            />
            <Stack.Screen
              name="CreateDigiGoldAccount"
              component={CreateDigiGoldAccount}
            />
            <Stack.Screen
              name="CreateBankDetailsScreen"
              component={CreateBankDetailsScreen}
            />
            <Stack.Screen
              name="DigiGoldCartScreen"
              component={DigiGoldCartScreen}
            />
            <Stack.Screen
              name="SelectAddressScreen"
              component={SelectAddressScreen}
            />
            <Stack.Screen
              name="CreateAddressScreen"
              component={CreateAddressScreen}
            />
            <Stack.Screen
              name="DigiGoldOrderScreen"
              component={DigiGoldOrderScreen}
            />
            <Stack.Screen
              name="AllProductsScreen"
              component={AllProductsScreen}
            />
            <Stack.Screen name="MyInvestments" component={MyInvestments} />
            <Stack.Screen
              name="BankAccountScreen"
              component={BankAccountScreen}
            />

            {/* gift card */}
            <Stack.Screen
              name="GiftCardHomeScreen"
              component={GiftCardHomeScreen}
            />
            <Stack.Screen
              name="GiftCardListScreen"
              component={GiftCardListScreen}
            />
            <Stack.Screen
              name="GiftCardDetailsScreen"
              component={GiftCardDetailsScreen}
            />
            <Stack.Screen name="SellGoldScreen" component={SellGoldScreen} />
            <Stack.Screen
              name="GiftCardOrderListScreen"
              component={GiftCardOrderListScreen}
            />

            {/* hotels ============ */}
            <Stack.Screen name="HotelHomeScreen" component={HotelHomeScreen} />
            <Stack.Screen
              name="HotelSearchScreen"
              component={HotelSearchScreen}
            />
            <Stack.Screen
              name="HotelDetailsScreen"
              component={HotelDetailsScreen}
            />
            <Stack.Screen
              name="TravelerDetailsScreen"
              component={TravelerDetailsScreen}
            />
            <Stack.Screen
              name="HotelBookingList"
              component={HotelBookingList}
            />
            <Stack.Screen name="BookingDetails" component={BookingDetails} />

            {/* bill payment */}
            <Stack.Screen
              name="BillPaymentHomeScreen"
              component={BillPaymentHomeScreen}
            />
            <Stack.Screen
              name="BillPaymentScreen"
              component={BillPaymentScreen}
            />
            <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
            <Stack.Screen
              name="MyComplaintsScreen"
              component={MyComplaintsScreen}
            />
            <Stack.Screen name="SupportScreen" component={SupportScreen} />
            <Stack.Screen
              name="ComplaintDetailsScreen"
              component={ComplaintDetailsScreen}
            />
            <Stack.Screen
              name="SelectContactOrProvider"
              component={SelectContactOrProvider}
            />
            {/* ============== shared screens =========================== */}
            <Stack.Screen
              name="FlightBookingHome"
              component={FlightBookingHome}
            />
            <Stack.Screen
              name="FlightSearchResultScreen"
              component={FlightSearchResultScreen}
            />
            <Stack.Screen
              name="FlightCheckoutScreen"
              component={FlightCheckoutScreen}
            />
            <Stack.Screen
              name="TravellerDetailsScreen"
              component={TravellerDetailsScreen}
            />
            <Stack.Screen
              name="SeatSelectionScreen"
              component={SeatSelectionScreen}
            />
            <Stack.Screen
              name="PaymentSuccessfulScreen"
              component={PaymentSuccessfulScreen}
            />
            <Stack.Screen
              name="MyBookingsScreen"
              component={MyBookingsScreen}
            />

            {/* flight */}

            <Stack.Screen
              name="RoundTripSearchScreen"
              component={RoundTripSearchScreen}
            />
            <Stack.Screen
              name="RoundTripFlightCheckoutScreen"
              component={RoundTripFlightCheckoutScreen}
            />
            <Stack.Screen
              name="RoundTripTravellerDetailsScreen"
              component={RoundTripTravellerDetailsScreen}
            />
            <Stack.Screen
              name="RoundTripSeatSelectionScreen"
              component={RoundTripSeatSelectionScreen}
            />
            <Stack.Screen
              name="RoundTripPaymentSuccessfulScreen"
              component={RoundTripPaymentSuccessfulScreen}
            />
            <Stack.Screen
              name="MiniStatementScreen"
              component={MiniStatementScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="OtpVerificationScreen"
              component={OtpVerificationScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
