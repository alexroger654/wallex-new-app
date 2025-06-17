import React from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GlobeAltIcon, MapIcon} from 'react-native-heroicons/solid';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useTheme} from '../context/ThemeProvider';
export default function PaymentModal({sheetRef}: {sheetRef: any}) {
  const [selected, setSelected] = React.useState(0);

  const {color} = useTheme();

  // [================ render]
  return (
    <View>
      <RBSheet
        customStyles={{container: styles.container}}
        height={440}
        openDuration={250}
        ref={sheetRef}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>EMI AMOUNT</Text>
          <Text style={styles.sheetText}>₹20000</Text>
        </View>
        <View style={styles.sheetBody}>
          <View style={styles.sheetBodyOptions}>
            <TouchableOpacity
              style={[
                styles.sheetBodyOption,
                selected === 0 && {borderColor: '#000'},
              ]}
              onPress={() => setSelected(0)}>
              <MapIcon color={selected === 0 ? '#000' : '#bcbdd9'} size={24} />
              <Text
                style={[
                  styles.sheetBodyOptionText,
                  selected === 0 && {color: '#000'},
                ]}>
                Option 1
              </Text>
            </TouchableOpacity>
            <View style={styles.delimiter} />
            <TouchableOpacity
              style={[
                styles.sheetBodyOption,
                selected === 1 && {borderColor: '#000'},
              ]}
              onPress={() => setSelected(1)}>
              <GlobeAltIcon
                color={selected === 1 ? '#000' : '#bcbdd9'}
                size={24}
              />
              <Text
                style={[
                  styles.sheetBodyOptionText,
                  selected === 1 && {color: '#000'},
                ]}>
                Option 2
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: color.primary,
              },
            ]}>
            <Text style={styles.btnText}>Make Payment</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // ============
  delimiter: {
    height: '100%',
    width: 1,
    backgroundColor: '#ebebf5',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 0,
  },
  placeholderInset: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sheetHeader: {
    paddingVertical: 24,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#bcbdd9',
  },
  sheetText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    marginTop: 12,
  },
  sheetBody: {
    padding: 24,
  },
  sheetBodyOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    marginHorizontal: -16,
  },
  sheetBodyOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 28,
  },
  sheetBodyOptionText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    color: '#bcbdd9',
  },
  /** Button */
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
