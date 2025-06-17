import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import Select from '../../component/Select';
import { IState } from '../../interfaces/state.interface';
import useGetData from '../../shared/fetch/useGetData';
import { Color, Padding } from '../../GlobalStyles';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import usePostData from '../../shared/fetch/usePostData';
import { useAuth } from '../../context/AuthContext';





interface FormData {
    name: string;
    email: string;
    mobile_number: string;
    state: string;
}

interface Props {
    navigation: any;
}

const CreateDigiGoldAccount: React.FC<Props> = ({ navigation }) => {
    const [state, setState] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<IState[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        mobile_number: '',
        state: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});





    // =============== hooks ====================
    const { user } = useAuth()



    // Fetch state options
    async function getState() {
        setLoading(true);
        const data = await useGetData('stateList');
        setOptions(data?.data);
        setLoading(false);
    }

    useEffect(() => {
        getState();
    }, []);

    // Handle input changes
    const handleChange = (name: keyof FormData, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.mobile_number || !/^\d{10}$/.test(formData.mobile_number)) newErrors.mobile_number = 'Valid 10-digit phone number is required';
        if (!formData.state) newErrors.state = 'Please select a state';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Handle save button
    const handleSave = async () => {
        if (validateForm()) {
            console.log({
                state: formData.state,
                mobile_number: formData.mobile_number,
                email: formData?.email,
                name: formData?.name,
                user_id: user?.id
            })
            // const data = await usePostData('create-user', {
            //     state: formData.state,
            //     mobile_number: formData.mobile_number,
            //     email: formData?.email,
            //     name: formData?.name,
            //     user_id: user?.id
            // })
            // console.log(data)
        } else {

        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Pressable
                onPress={() => navigation.goBack()}
                style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                    backgroundColor: Color.primaryBlue100,
                    paddingVertical: 20,
                    paddingHorizontal: 14
                }}
            >
                <ChevronLeftIcon size={22} color={Color.white} />
                <Text style={styles.header}>Account Info</Text>
            </Pressable>

            <ScrollView style={{
                padding: Padding.p_5xl
            }}>
                {/* Name Field */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    placeholderTextColor="#B0C4DE"
                    value={formData.name}
                    onChangeText={(value) => handleChange('name', value)}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                {/* Email Field */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    placeholderTextColor="#B0C4DE"
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                {/* Phone Number Field */}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#B0C4DE"
                    value={formData.mobile_number}
                    onChangeText={(value) => handleChange('mobile_number', value)}
                    keyboardType="numeric"
                />
                {errors.mobile_number && <Text style={styles.errorText}>{errors.mobile_number}</Text>}

                {/* State Dropdown */}
                <Text style={styles.label}>State</Text>
                <Select
                    options={options.map(item => ({
                        id: item.id,
                        label: item.name,
                    }))}
                    selectedValue={formData.state}
                    setSelectedValue={(value: string) => {
                        handleChange('state', value);
                        setState(value);
                    }}
                />
                {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: Color.white,
    },
    label: {
        fontSize: 12,
        fontWeight: "500",
        color: Color.primaryBlue100,
        marginBottom: 8,
        textTransform: 'capitalize'
    },
    errorText: {
        fontSize: 12,
        fontWeight: "500",
        color: Color.colorRed,
        marginBottom: 8,
        textTransform: 'capitalize'
    },
    input: {
        backgroundColor: Color.secondaryColors100,
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        color: '#000000',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#1A387D',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 60,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});
export default CreateDigiGoldAccount;