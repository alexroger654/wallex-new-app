import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const FareRule = ({fareRules}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fare Rules</Text>

      <FlatList
        data={fareRules}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.an} ({item.ac})
            </Text>
            <Text style={styles.details}>Refund Policy: {item.cp}</Text>
            <Text style={styles.details}>Change Policy: {item.chp}</Text>
            <Text style={styles.details}>Reissue Policy: {item.ri}</Text>
            <Text style={styles.details}>Other: {item.o}</Text>
            <Text style={styles.details}>
              Cancellation Fee: INR {item.camt}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'justify',
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    textAlign: 'justify',
  },
  details: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
    textAlign: 'justify',
  },
});

export default FareRule;
