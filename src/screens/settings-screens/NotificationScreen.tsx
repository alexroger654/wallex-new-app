import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ChevronLeftIcon, CogIcon} from 'react-native-heroicons/outline'; // Replace with your icons
import {Color} from '../../GlobalStyles';

const notifications = [
  {
    id: 1,
    title: 'Rewards',
    message: 'You Have Successfully Redeemed 100 points',
    time: '23 mins Ago',
    section: 'Today',
  },
  {
    id: 2,
    title: 'Rewards',
    message: 'You Have Successfully Redeemed 100 points',
    time: '23 mins Ago',
    section: 'Today',
  },
  {
    id: 3,
    title: 'Rewards',
    message: 'You Have Successfully Redeemed 100 points',
    time: '23 mins Ago',
    section: 'Today',
  },
  {
    id: 4,
    title: 'Rewards',
    message: 'You Have Successfully Redeemed 100 points',
    time: 'Mar 20',
    section: 'This Week',
  },
  {
    id: 5,
    title: 'Rewards',
    message: 'You Have Successfully Redeemed 100 points',
    time: 'Mar 20',
    section: 'This Week',
  },
  // Add more as needed
];

const NotificationCard = ({title, message, time}: any) => (
  <View style={styles.notificationCard}>
    <Image
      source={{uri: 'https://img.icons8.com/emoji/48/trophy-emoji.png'}}
      style={styles.notificationIcon}
    />
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationMessage}>{message}</Text>
    </View>
    <Text style={styles.notificationTime}>{time}</Text>
  </View>
);

const NotificationsScreen = ({navigation}: any) => {
  const renderSection = (sectionTitle: string, data: any) => (
    <>
      <Text style={styles.sectionHeader}>{sectionTitle}</Text>
      {data.map((item: any) => (
        <NotificationCard
          key={item.id}
          title={item.title}
          message={item.message}
          time={item.time}
        />
      ))}
    </>
  );

  const todayNotifications = notifications.filter(n => n.section === 'Today');
  const thisWeekNotifications = notifications.filter(
    n => n.section === 'This Week',
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <CogIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <FlatList
        ListHeaderComponent={() => (
          <>
            {renderSection('Today', todayNotifications)}
            {renderSection('This Week', thisWeekNotifications)}
          </>
        )}
        data={[]}
        renderItem={null}
        keyExtractor={(item: any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#001F54',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeader: {
    color: '#001F54',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#001F54',
  },
  notificationMessage: {
    fontSize: 12,
    color: '#8E8E8E',
  },
  notificationTime: {
    fontSize: 12,
    color: '#8E8E8E',
  },
});

export default NotificationsScreen;
