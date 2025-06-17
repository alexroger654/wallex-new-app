import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const PlanList = ({data}: any) => {
  // Sample data
  // const [data, setData] = useState([
  //   {
  //     _id: '674b8c27026a0bc6e2207230',
  //     circle: 'West Bengal',
  //     createdAt: '2024-11-30T22:05:28.307Z',
  //     currency: 'Rs.',
  //     data: 'NA',
  //     description: 'Price changed by Vi! You can recharge with Rs.379 plan.',
  //     discount: '0',
  //     group: 'Discontinued Plans',
  //     operator: 'Vi',
  //     planType: 'Recharge',
  //     price: '319',
  //     updatedAt: '2024-11-30T22:05:28.307Z',
  //     validity: 'NA',
  //   },
  //   // Add more data as needed
  // ]);

  // Render each item
  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.operator}>{item.operator}</Text>
        <Text style={styles.planType}>{item.planType}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.price}>
          {item.currency} {item.price}
        </Text>
        <Text style={styles.validity}>Validity: {item.validity}</Text>
      </View>
      <Text style={styles.circle}>Circle: {item.circle}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  operator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  planType: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  validity: {
    fontSize: 14,
    color: '#888',
  },
  circle: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
  },
});

export default PlanList;
