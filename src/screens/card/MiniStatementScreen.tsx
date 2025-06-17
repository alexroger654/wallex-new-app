import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
} from 'react-native';
import { Color } from '../../GlobalStyles';
import {
    AdjustmentsVerticalIcon,
    ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuth } from '../../context/AuthContext';
import useGetData from '../../shared/fetch/useGetData';
import { IMiniStatement } from '../../shared/interfaces/mini.statement.interface';
import Loading from '../../component/Loading';










const MiniStatementScreen = ({ navigation }: any) => {
    const [transactions, setTransactions] = useState<IMiniStatement[]>([]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [isStartPickerVisible, setStartPickerVisible] = useState(false);
    const [isEndPickerVisible, setEndPickerVisible] = useState(false);
    const [loading, setLoading] = useState(false)




    // =================== hooks
    const { user } = useAuth()



    async function handleGetCardDetails() {
        setLoading(true)
        const result = await useGetData(`miniStatement?mobile_number=${user?.mobile}`, 'card')
        console.log(result, "miniStatement?mobile_number= ")
        setTransactions(result?.RespData)
        setLoading(false)
    }



    useEffect(() => {
        handleGetCardDetails()
    }, [])




    // const formatDate = (date: Date) =>
    //     date
    //         .toLocaleDateString('en-GB', {
    //             day: '2-digit',
    //             month: 'short',
    //             year: 'numeric',
    //         })
    //         .toUpperCase()
    //         .replace(' ', '-');

    // const filteredTransactions = transactions.filter(transaction => {
    //     const transactionDate = new Date(transaction.date.replace(/-/g, ' '));
    //     if (startDate && endDate) {
    //         return transactionDate >= startDate && transactionDate <= endDate;
    //     }
    //     return true;
    // });

    const TransactionItem = ({ item }: { item: IMiniStatement }) => (
        <View style={styles.transactionItem}>
            <View>
                <Text style={styles.date}>{item?.trans_data}</Text>
                <Text style={styles.ref}>Ref No: {item?.from_acct_no}</Text>
                <Text style={styles.description}>{item?.merchant_city}</Text>
            </View>
            <View>
                <Text
                    style={[
                        styles.amount,
                        item?.trans_type === 'DR' ? styles.debit : styles.credit,
                    ]}>
                    {item?.trans_type === 'CR' ? '⬆' : '⬇'} ₹
                    {Math?.abs(parseFloat(item?.tran_amount)).toFixed(2)}
                </Text>
                <Text style={styles.closingBalance}>
                    Closing Balance: ₹{Math.abs(parseFloat(item?.account_balance)).toFixed(2)}
                </Text>
            </View>
        </View>
    );



    if (loading) {
        return <Loading />
    }








    // =============================== render ==========================
    return (
        <View style={styles.container}>
            {/* Header */}
            <View
                style={{
                    backgroundColor: Color.primaryBlue100,
                    paddingVertical: 24,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Pressable onPress={() => navigation.goBack()} style={styles.header}>
                    <ChevronLeftIcon size={20} color={'#fff'} />
                    <Text style={styles.headerText}>Mini Statement</Text>
                </Pressable>
                {/* <Pressable
                    onPress={() => setStartPickerVisible(true)}
                    style={{
                        backgroundColor: Color.primaryBlue100,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 16,
                    }}>
                    <AdjustmentsVerticalIcon size={20} color={Color.white} />
                </Pressable> */}
            </View>

            {/* Date Range Selection */}
            {/* <View style={styles.dateRangeContainer}>
        <View></View>
        <Pressable
          onPress={() => setStartPickerVisible(true)}
          style={{
            backgroundColor: Color.primaryBlue100,
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
          }}>
          <AdjustmentsVerticalIcon size={20} color={Color.white} />
        </Pressable>
      </View> */}

            {/* Transaction List */}
            <FlatList
                data={transactions}
                keyExtractor={item => item.trans_data}
                renderItem={({ item }) => <TransactionItem item={item} />}
            />

            {/* Date Pickers */}
            <DateTimePickerModal
                isVisible={isStartPickerVisible}
                mode="date"
                onConfirm={date => {
                    setStartDate(date);
                    setStartPickerVisible(false);
                }}
                onCancel={() => setStartPickerVisible(false)}
                minimumDate={new Date('2022-01-01')} // Optional: Limit start date selection
            />

            <DateTimePickerModal
                isVisible={isEndPickerVisible}
                mode="date"
                onConfirm={date => {
                    setEndDate(date);
                    setEndPickerVisible(false);
                }}
                onCancel={() => setEndPickerVisible(false)}
                minimumDate={startDate || new Date('2022-01-01')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        // backgroundColor: Color.primaryBlue100,
        // paddingVertical: 20,
        // paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    dateRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    dateButton: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: Color.primaryBlue100,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        height: 30,
        width: 30,
    },
    dateButtonText: {
        color: Color.primaryBlue100,
        fontWeight: '600',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    date: {
        fontWeight: 'bold',
        color: Color.secondaryColors700,
    },
    ref: {
        color: Color.secondaryColors500,
        fontSize: 12,
    },
    description: {
        color: Color.secondaryColors500,
        fontSize: 12,
    },
    closingBalance: {
        color: Color.secondaryColors500,
        marginTop: 5,
        fontSize: 12,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    debit: {
        color: 'red',
    },
    credit: {
        color: 'green',
    },
});

export default MiniStatementScreen;
