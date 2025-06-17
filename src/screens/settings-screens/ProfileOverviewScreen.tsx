import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import {useAuth} from '../../context/AuthContext';
import {IUser} from '../../shared/interfaces/user.interface';
import useGetData from '../../shared/fetch/useGetData';

export default function ProfileOverviewScreen({navigation, route}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  //@ts-ignore
  const [user, setUser] = useState<IUser>({});

  async function getUser() {
    const result: {data: IUser} = await useGetData('user/profile', 'service');
    setUser(result?.data);
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getUser();
  }, [route?.params?.refetch]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable onPress={() => navigation.goBack()} style={styles.header}>
        <ChevronLeftIcon size={24} color={Color.white} />
        <Text style={styles.headerTitle}>Account Info</Text>
      </Pressable>

      <View
        style={{
          padding: 20,
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('EditProfileScreen', {
                refetch: route?.params?.refetch ? route?.params?.refetch : true,
              })
            }>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 12,
          }}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://via.placeholder.com/100',
              }}
            />
            <View>
              <Text style={styles.profileName}>{user?.full_name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
          </View>

          {/* Details Section */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Name</Text>
              <Text style={styles.detailValue}>{user?.full_name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Gender</Text>
              <Text style={styles.detailValue}>Male</Text>
            </View>
            {/* <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Phone</Text>
              <Text style={styles.detailValue}>{user?.full_name}</Text>
            </View> */}
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>DOB</Text>
              <Text style={styles.detailValue}>11-04-2004</Text>
            </View>

            <Text style={styles.sectionTitle}>Contact Info</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Phone Number</Text>
              <Text style={styles.detailValue}>{user?.mobile}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>Email</Text>
              <Text style={styles.detailValue}>{user?.email}</Text>
            </View>

            <Text style={styles.sectionTitle}>Social Links</Text>
            <View style={styles.socialRow}>
              <Text style={styles.socialLabel}>Instagram</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Edit Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name*"
              defaultValue={user?.full_name}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address*"
              defaultValue={user?.email}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number*"
              defaultValue={user?.mobile}
              keyboardType="number-pad"
            />

            <TouchableOpacity style={styles.saveButton} onPress={closeModal}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 24,
    backgroundColor: Color.primaryBlue100,
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    gap: 6,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Color.primaryBlue20,
    marginBottom: 10,
  },
  editButtonText: {
    color: Color.primaryBlue100,
    fontSize: 14,
  },
  detailsSection: {
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  detailTitle: {
    fontSize: 16,
    color: Color.secondaryColors600,
  },
  detailValue: {
    fontSize: 16,
    color: Color.secondaryColors600,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Color.primaryBlue100,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  socialLabel: {
    fontSize: 16,
    color: Color.secondaryColors600,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#1D4AB8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
