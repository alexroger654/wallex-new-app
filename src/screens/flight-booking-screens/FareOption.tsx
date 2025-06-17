import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import { Color } from '../../GlobalStyles';

// ===================== component =============================
const Options = ({data, value}: any) => {
  // ==================== render ================================
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        borderColor: 'red',
        marginBottom: 16,
        width: '100%',
        overflow: 'hidden'
      }}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 1,
            borderRadius: 12,
            borderColor: '#000',
            marginRight: 8,
          }}
        />
        <View>
          <Text style={{color: '#000'}}>{data.title}</Text>
          <Text style={{color: '#fbc02d', fontWeight: 'bold'}}>
            {data.totalFare} INR
          </Text>
        </View>
      </View>
      {/* <View
        style={{borderBottomWidth: 1, borderColor: '#e0e0e0', marginBottom: 8}}
      /> */}
      {/* <View style={{marginBottom: 8}}>
        {data.cancellation.map((item, i) => (
          <Text style={{color: Color.primaryBlue100}} key={i}>{item}</Text>
        ))}
      </View>
      <View
        style={{borderBottomWidth: 1, borderColor: '#e0e0e0', marginBottom: 8}}
      /> */}
      {/* <View style={{marginBottom: 8}}>
        {data.dateChange.map((item, i) => (
          <Text style={{color: Color.primaryBlue100}} key={i}>{item}</Text>
        ))}
      </View>
      <View
        style={{borderBottomWidth: 1, borderColor: '#e0e0e0', marginBottom: 8}}
      />
      <View style={{marginBottom: 8}}>
        {data.seatSelection.map((item, i) => (
          <Text  style={{color: Color.primaryBlue100}} key={i}>{item}</Text>
        ))}
      </View>
      <View
        style={{borderBottomWidth: 1, borderColor: '#e0e0e0', marginBottom: 8}}
      />
      <Text style={{color: Color.primaryBlue100}}
      
      >
        {data.checkedBagCapacity} Kg{data.checkedBagCapacity > 1 ? 's' : ''}
      </Text>
      <View
        style={{borderBottomWidth: 1, borderColor: '#e0e0e0', marginBottom: 8}}
      />
      <Text style={{color: Color.primaryBlue100}}>
        {data.handBagCapacity} Kg{data.handBagCapacity > 1 ? 's' : ''}
      </Text>
      <View
        style={{borderBottomWidth: 1, borderColor: '#e0e0e0', marginBottom: 8}}
      />
      <View>
        {data.meals.map((item, i) => (
          <Text style={{color: Color.primaryBlue100}} key={i}>{item}</Text>
        ))}
      </View> */}
      {/* <TouchableOpacity
        style={{
          marginTop: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <Text style={{color: Color.primaryBlue100}}>Book</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default Options;
