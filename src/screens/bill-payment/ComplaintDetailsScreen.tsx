import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';

const ComplaintDetailsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <ChevronLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Transaction Overview */}
        <View style={styles.transactionOverview}>
          <View style={styles.transactionDetails}>
            <Image
              source={{uri: 'https://via.placeholder.com/50'}}
              style={styles.transactionIcon}
            />
            <View>
              <Text style={styles.transactionTitle}>
                Bill for Indian oil gas
              </Text>
              <Text style={styles.transactionStatus}>
                <Text style={styles.statusSuccess}>Success</Text> • 03 Nov'23,
                04:55 PM
              </Text>
            </View>
          </View>
          <Text style={styles.transactionAmount}>₹ 19.00</Text>
        </View>

        {/* Complaint Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Complaint Details</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>CC0118581863830</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Complaint ID</Text>
            <Text style={styles.value}>349305</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Customer Name</Text>
            <Text style={styles.value}>Salmaan Ahmed</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Mobile Number</Text>
            <Text style={styles.value}>9600016417</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Complaint Status</Text>
            <Text style={styles.statusPending}>Pending</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Complaint Made on</Text>
            <Text style={styles.value}>17 Nov 2023, 09:37 PM</Text>
          </View>
        </View>

        {/* Your Complaint Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Complaint</Text>
          <View style={styles.complaintDetail}>
            <Text style={styles.label}>What is the issue?</Text>
            <Text style={styles.value}>
              Amount deducted, biller account credited but transaction ID not
              received
            </Text>
          </View>
          <View style={styles.complaintDetail}>
            <Text style={styles.label}>Additional description</Text>
            <Text style={styles.value}>
              Lorem ipsum dolor sit amet consectetur. Gravida eu id et ut
              pellentesque. Cras orci morbi porttitor enim mi. Orci sit et
              lectus odio sit venenatis interdum. Nibh.
            </Text>
          </View>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Back to home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FC',
  },
  header: {
    backgroundColor: '#003366',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  transactionOverview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  transactionStatus: {
    fontSize: 12,
    color: '#A1A1A1',
  },
  statusSuccess: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#A1A1A1',
  },
  value: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
  statusPending: {
    fontSize: 14,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  complaintDetail: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ComplaintDetailsScreen;
