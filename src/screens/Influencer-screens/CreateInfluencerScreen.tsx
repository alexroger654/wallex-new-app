import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CreateInfluencerScreen = () => {
  const [whatsapp, setWhatsapp] = useState('');
  const [interests, setInterests] = useState<any>([]);
  const [interestInput, setInterestInput] = useState('');
  const [socialMedias, setSocialMedias] = useState({
    Facebook: null,
    Instagram: null,
    LinkedIn: null,
    TikTok: null,
    YouTube: null,
    Threads: null,
    X: null,
    Telegram: null,
  });

  const addInterest = () => {
    if (interestInput.trim() !== '') {
      setInterests((prev: any) => [...prev, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleSocialMediaChange = (platform: any, value: any) => {
    setSocialMedias(prev => ({
      ...prev,
      [platform]: value,
    }));
  };

  const handleSubmit = () => {
    const influencerData = {
      whatsapp,
      interests,
      socialMedias,
    };
    console.log('Influencer Data:', influencerData);
    // Handle submission logic here (e.g., API call)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>WhatsApp Number:</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
        placeholder="Enter WhatsApp number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Interests:</Text>
      <View style={styles.interestContainer}>
        <TextInput
          style={[styles.input, styles.interestInput]}
          value={interestInput}
          onChangeText={setInterestInput}
          placeholder="Add an interest"
        />
        <Button title="Add" onPress={addInterest} />
      </View>
      {interests.length > 0 && (
        <View style={styles.interestsList}>
          {interests.map((interest: any, index: number) => (
            <Text key={index} style={styles.interestItem}>
              {interest}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.label}>Social Media Links:</Text>
      {Object.keys(socialMedias).map(platform => (
        <View key={platform} style={styles.socialMediaInputContainer}>
          <Text style={styles.platformLabel}>{platform}:</Text>
          <TextInput
            style={styles.input}
            value={socialMedias[platform] || ''}
            onChangeText={value => handleSocialMediaChange(platform, value)}
            placeholder={`Enter ${platform} URL`}
          />
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  interestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  interestInput: {
    flex: 1,
    marginRight: 10,
  },
  interestsList: {
    marginBottom: 20,
  },
  interestItem: {
    fontSize: 14,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  socialMediaInputContainer: {
    marginBottom: 20,
  },
  platformLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default CreateInfluencerScreen;
