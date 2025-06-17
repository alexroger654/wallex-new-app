import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Color} from '../../src/GlobalStyles';
import {IRoom} from '../../src/shared/interfaces/hotel-room.interface';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

interface ISelectedRoom {
  ratePlanId: string;
  roomTypeId: string;
  tax: number;
  price: number;
  quantity: number;
  roomName: string;
  basePrice: number;
}

const HotelRoomsScreen: React.FC = ({
  data,
  additionalData,
  bookingData,
  selectedRooms,
  setSelectedRoom,
}: any) => {
  const toast = useToast();

  const handleSelectRoom = (item: any) => {
    console.log('here ====================>');

    if (!item?.ratePlanId || !item?.roomTypeId) return;

    console.log('here ====================>');

    // Find if the room is already selected
    const roomIndex = selectedRooms.findIndex(
      (room: ISelectedRoom) => room.roomTypeId === item.roomTypeId,
    );

    if (roomIndex !== -1) {
      // Room is already selected, increase the quantity
      const updatedRooms = [...selectedRooms];
      const selectedRoom = updatedRooms[roomIndex];

      // Ensure we don't exceed the maximum number of rooms allowed
      const totalQuantity = updatedRooms.reduce(
        (acc, room) => acc + room.quantity,
        0,
      );

      if (totalQuantity < bookingData?.rooms?.length) {
        updatedRooms[roomIndex] = {
          ...selectedRoom,
          quantity: selectedRoom.quantity + 1,
        };
        setSelectedRoom(updatedRooms);

        // Show a toast for the updated quantity
        toast.show(`Selected`);
      } else {
        // Show a toast if the maximum number of rooms is already selected
        toast.show(`Already Selected ${bookingData?.rooms?.length} Room(s)`);
      }
    } else {
      // Add the room as a new selection with quantity 1
      // @ts-ignore
      const totalQuantity = selectedRooms.reduce(
        (acc, room) => acc + room.quantity,
        0,
      );

      if (totalQuantity < bookingData?.rooms?.length) {
        const newRoom: ISelectedRoom = {
          ratePlanId: item.ratePlanId,
          roomTypeId: item.roomTypeId,
          tax: item?.pricing?.total?.taxes?.[0]?.amount || 0,
          price: item?.pricing?.total?.price || 0,
          quantity: 1,
          roomName: item.roomName,
          basePrice: item?.pricing?.total?.base || 0,
        };

        setSelectedRoom([...selectedRooms, newRoom]);

        // Show a toast for the new room selection
        toast.show(`Room Selected`);
      } else {
        // Show a toast if the maximum number of rooms is already selected
        toast.show(`Already Selected ${bookingData?.rooms?.length} Room(s)`);
      }
    }
  };

  const isRoomSelected = selectedRooms.some(
    (room: any) => room.roomTypeId === data?.id,
  );

  const navigation: any = useNavigation();

  const renderRoomCard = ({item}: {item: IRoom}) => (
    <Pressable onPress={() => handleSelectRoom(item)} style={styles.roomCard}>
      <Text style={styles.roomTitle}>{item?.roomName}</Text>
      <Text style={styles.roomAvailability}>
        {item?.roomsLeft > 0
          ? `${item?.roomsLeft} rooms left`
          : 'No rooms left'}
      </Text>
      <Text style={styles.roomInclusions}>
        Inclusions: {item?.inclusions?.join(', ')}
      </Text>

      {/* Pricing per night */}
      <Text style={styles.roomPrice}>
        Price per night: {item.currency} {item.pricing.perNight.price} (Base:{' '}
        {item.currency} {item?.pricing?.perNight?.base})
      </Text>

      {/* Total Price */}
      <Text style={styles.roomTotalPrice}>
        Total Price: {item.currency} {item?.pricing?.total?.price}
      </Text>

      {/* Tax details */}
      <Text style={styles.roomTax}>Tax: {item?.taxPercentage}%</Text>

      {/* Cancellation Policy */}
      {item.cancellation.freeCancellation && (
        <Text style={styles.roomCancellation}>
          Free cancellation until{' '}
          {new Date(item?.cancellation?.freeCancelDeadLine).toLocaleString()}
        </Text>
      )}
      {/* <Text style={styles.roomCancellationPolicies}>Cancellation Policies:</Text>
            {item.cancellation.cancellationPolicies.map((policy, index) => (
                <Text key={index} style={styles.cancellationPolicyText}>
                    {policy}
                </Text>
            ))} */}

      <TouchableOpacity
        onPress={() => handleSelectRoom(item)}
        style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Select</Text>
      </TouchableOpacity>
    </Pressable>
  );

  const renderCategory = ({item}: {item: IRoom}) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.ratePlanName}</Text>
      <FlatList
        data={[item]} // Wrap single item in array to use FlatList
        renderItem={renderRoomCard}
        keyExtractor={room => room.roomTypeId}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalFlatList}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={additionalData}
        renderItem={renderCategory}
        keyExtractor={item => item.roomTypeId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.primaryBlue100,
  },
  horizontalFlatList: {
    paddingVertical: 8,
  },
  roomCard: {
    maxWidth: 325,
    width: '100%',
    padding: 16,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  roomAvailability: {
    fontSize: 12,
    color: '#FF6B6B',
    marginBottom: 4,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Color.primaryBlue100,
  },
  roomInclusions: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  roomTax: {
    fontSize: 12,
    color: '#888',
  },
  roomOriginalPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  roomSavings: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 12,
  },
  bookButton: {
    backgroundColor: '#002B7F',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  roomTotalPrice: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomCancellation: {fontSize: 14, color: 'red', marginBottom: 5},
  roomCancellationPolicies: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  cancellationPolicyText: {fontSize: 12, color: '#555'},
});

export default HotelRoomsScreen;
