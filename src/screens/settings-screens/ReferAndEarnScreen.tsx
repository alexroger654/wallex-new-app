import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ClipboardDocumentIcon, ShareIcon} from 'react-native-heroicons/solid';
import {Color} from '../../GlobalStyles';

const ReferAndEarnScreen = () => {
  const referralCode = 'SIGDHWON03';

  const copyToClipboard = () => {
    // Logic to copy referral code to clipboard
    console.log('Referral code copied:', referralCode);
  };

  const shareReferralCode = () => {
    // Logic to share referral code
    console.log('Share referral code:', referralCode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Refer And Earn</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.amountLabel}>Amount Earned</Text>
        <Text style={styles.amount}>₹2400</Text>
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemButtonText}>Redeem Now</Text>
        </TouchableOpacity>
        <View style={styles.referralCodeContainer}>
          <Text style={styles.referralCodeLabel}>Your Code</Text>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
            <ClipboardDocumentIcon size={20} color="#4A4A4A" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareReferralCode}
            style={styles.iconButton}>
            <ShareIcon size={20} color="#4A4A4A" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  amountLabel: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 5,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },
  redeemButton: {
    backgroundColor: Color.secondaryColors100,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    width: 140,
  },
  redeemButtonText: {
    color: Color.primaryBlue100,
    fontWeight: 'bold',
    fontSize: 16,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referralCodeLabel: {
    fontSize: 14,
    color: '#4A4A4A',
    marginRight: 10,
  },
  referralCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    flex: 1,
  },
  iconButton: {
    marginHorizontal: 5,
  },
});

export default ReferAndEarnScreen;
