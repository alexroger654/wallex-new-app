import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Offers = () => {
  const offers = [
    {
      id: '1',
      title: 'Flat 10% cashback*',
      description: 'On Food, Instamart, Dineout!',
      avatar: 'https://img.icons8.com/ios/50/avatar.png',
    },
    {
      id: '2',
      title: 'Flat 10% cashback*',
      description: 'On Food, Instamart, Dineout!',
      avatar: 'https://img.icons8.com/ios/50/avatar.png',
    },
    {
      id: '3',
      title: 'Flat 10% cashback*',
      description: 'On Food, Instamart, Dineout!',
      avatar: 'https://img.icons8.com/ios/50/avatar.png',
    },
  ];

  const renderItem = ({item}: any) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
        }}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cashback Offers Section */}
      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Know More Button */}
      <TouchableOpacity style={styles.knowMoreButton}>
        <Text style={styles.knowMoreText}>Know More →</Text>
      </TouchableOpacity>

      {/* Card Image Section */}
      <Image
        source={{
          uri: 'https://t4.ftcdn.net/jpg/00/61/06/27/240_F_61062796_NF87GPnWV0fQ2LhoYNlyjev0PocRwZj9.jpg',
        }} // Replace with your card image URL
        style={styles.cardImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  knowMoreButton: {
    backgroundColor: '#1D4ED8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  knowMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
});

export default Offers;
