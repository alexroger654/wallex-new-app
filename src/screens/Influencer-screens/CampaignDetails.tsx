import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const CampaignDetails = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>{`<`}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campaign Name Here</Text>
      </View>

      {/* Slots */}
      <View style={styles.slotsContainer}>
        <Text style={styles.slotLabel}>Slots:</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill} />
          <Text style={styles.progressText}>59%</Text>
        </View>
      </View>

      {/* Campaign Type */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Campaign Type</Text>
        <View style={styles.row}>
          <Image
            source={{uri: 'https://img.icons8.com/flat-round/64/book.png'}}
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Product Review</Text> {'\n'}You are
            required to review a product
          </Text>
        </View>
      </View>

      {/* Earning Capacity */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Earning Capacity</Text>
        <View style={styles.row}>
          <Image
            source={{
              uri: 'https://img.icons8.com/color/48/money.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Earn upto ₹8</Text> {'\n'}You will receive
            cash for this collaboration
          </Text>
        </View>
      </View>

      {/* Campaign Duration */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Campaign Type</Text>
        <View style={styles.row}>
          <Image
            source={{uri: 'https://img.icons8.com/color/48/calendar.png'}}
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            <Text style={styles.bold}>Mar 01, 2024 – Mar 31, 2024</Text> {'\n'}
            Application open till Mar 31, 2024
          </Text>
        </View>
      </View>

      {/* Steps to Follow */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Campaign Steps to follow</Text>
        <View style={styles.stepContainer}>
          {[
            'Likes and comments',
            'Reshares by Micro and Macro creators',
            'LinkedIn Amplification',
          ].map((item, index) => (
            <View key={index} style={styles.step}>
              <Text style={styles.stepIndex}>{index + 1}</Text>
              <Text style={styles.stepText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Post Deliverables */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          Where to post the deliverables?
        </Text>
        <View style={styles.postContainer}>
          <Image
            source={{
              uri: 'https://img.icons8.com/fluency/48/instagram-new.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.postLabel}>Instagram</Text>
        </View>
      </View>

      {/* Deliverables */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>What are the deliverables?</Text>
        <View style={styles.row}>
          <Image
            source={{uri: 'https://img.icons8.com/ios-filled/50/story.png'}}
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            Story post {'\n'}
            <Text style={styles.light}>BGC • Duration: 15 sec</Text>
          </Text>
        </View>
      </View>

      {/* Product to Review */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Product to review?</Text>
        <View style={styles.productContainer}>
          <Image
            source={{
              uri: 'https://img.icons8.com/color/48/food.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.linkText}>
            Swiggy {'\n'}https://www.swiggy.com
          </Text>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.reimbursement}>
            You will receive a reimbursement of ₹70 at the end of the campaign
          </Text>
          <Text style={styles.purchaseNote}>
            You are required to purchase all the product(s) from the above
            mentioned links.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#F8F9FB', flex: 1},
  header: {flexDirection: 'row', alignItems: 'center', padding: 20},
  backArrow: {fontSize: 20, color: '#333'},
  headerTitle: {fontSize: 18, fontWeight: '600', marginLeft: 10},
  slotsContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
  },
  slotLabel: {fontSize: 16, color: '#333'},
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBarFill: {
    width: '60%',
    height: 8,
    backgroundColor: '#1DAB87',
    borderRadius: 5,
  },
  progressText: {marginLeft: 10, color: '#1DAB87', fontWeight: '700'},
  section: {paddingHorizontal: 20, marginBottom: 10},
  sectionLabel: {fontSize: 14, color: '#666', marginBottom: 5},
  sectionHeader: {fontSize: 16, fontWeight: '600', marginBottom: 10},
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {width: 32, height: 32, marginRight: 10},
  detailText: {fontSize: 14, color: '#333'},
  bold: {fontWeight: '700'},
  light: {color: '#888'},
  stepContainer: {backgroundColor: '#F8F9FB', borderRadius: 10, padding: 10},
  step: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  stepIndex: {
    width: 24,
    height: 24,
    textAlign: 'center',
    backgroundColor: '#1DAB87',
    color: '#fff',
    borderRadius: 12,
    marginRight: 10,
  },
  stepText: {fontSize: 14, color: '#333'},
  postContainer: {flexDirection: 'row', alignItems: 'center'},
  postLabel: {fontSize: 14, color: '#333', marginLeft: 10},
  productContainer: {flexDirection: 'row', alignItems: 'center'},
  linkText: {color: '#1DAB87', textDecorationLine: 'underline'},
  reimbursement: {fontSize: 14, color: '#1DAB87', marginVertical: 10},
  purchaseNote: {fontSize: 12, color: '#888'},
});

export default CampaignDetails;
