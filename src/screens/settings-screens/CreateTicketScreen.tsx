import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useToast} from 'react-native-toast-notifications';
import usePostData from '../../shared/fetch/usePostData';
import {useAuth} from '../../context/AuthContext';

const reasons = [
  'Finance',
  'My Account',
  'UPI',
  'Rewards',
  'Cards',
  'Giveaways',
  'My Payments',
  'Other',
];

const CreateTicketScreen = ({navigation}: any) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [subject, setSubject] = useState('');
  const [issue, setIssue] = useState('');

  const toast = useToast();
  const {user} = useAuth();

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleSubmit = async () => {
    if (!subject || !selectedReason || !issue) {
      toast.show('Please fill out all required fields.', {
        type: 'danger',
      });
    } else {
      const result = await usePostData(
        'tickets/generate',
        {
          title: subject,
          description: issue,
          reason: selectedReason,
          otherDetails: '',
        },
        'service',
      );

      if (result?.data?._id) {
        navigation.navigate('HelpSupportScreen');
        toast.show(`Ticket Generated Successfully`);
      } else {
        toast.show(`Something Went Wrong`, {
          type: 'danger',
        });
      }

      // Reset the form or handle submission logic
      setSubject('');
      setSelectedReason('');
      setIssue('');
    }
  };

  return (
    <>
      {/* ================== header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: Color.primaryBlue100,
        }}>
        <Pressable onPress={() => {}}>
          <ChevronLeftIcon size={22} color={Color.white} />
        </Pressable>
        <Text
          style={{
            color: Color.white,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Create Ticket
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Subject*</Text>
        <TextInput
          style={styles.input}
          placeholder="Demo Issue"
          placeholderTextColor={Color.primaryBlue100}
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Reason*</Text>
        <View style={styles.reasonContainer}>
          {reasons.map(reason => (
            <TouchableOpacity
              key={reason}
              style={[
                styles.reasonButton,
                selectedReason === reason && styles.selectedReasonButton,
              ]}
              onPress={() => handleReasonSelect(reason)}>
              <Text
                style={[
                  styles.reasonText,
                  selectedReason === reason && styles.selectedReasonText,
                ]}>
                {reason}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Write Your Issue Here*</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="message........."
          placeholderTextColor={Color.chatText}
          multiline
          value={issue}
          onChangeText={setIssue}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit →</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.background,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Color.secondaryColors200,
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    color: Color.chatText,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevation: 2,
  },
  reasonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  reasonButton: {
    backgroundColor: Color.secondaryColors200,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedReasonButton: {
    backgroundColor: Color.primaryBlue100,
  },
  reasonText: {
    fontSize: 14,
    color: Color.chatText,
  },
  selectedReasonText: {
    color: Color.text,
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Color.primaryBlue100,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: Color.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateTicketScreen;
