import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Color } from '../../GlobalStyles';
import usePostData from '../../shared/fetch/usePostData';
import { useAuth } from '../../context/AuthContext';
import useGetData from '../../shared/fetch/useGetData';
import { ICardDetails } from '../../shared/interfaces/caed.details.interface';
import { useToast } from 'react-native-toast-notifications';
import Loading from '../Loading';
interface Limit {
  value: number;
  enabled: boolean;
}
interface LimitSetting {
  value: number;
  enabled: boolean;
}


interface LimitsState {
  atmWithdrawalDaily: LimitSetting;
  atmWithdrawalWeekly: LimitSetting;
  atmWithdrawalMonthly: LimitSetting;
  atmWithdrawalYearly: LimitSetting;

  contactlessDaily: LimitSetting;
  contactlessWeekly: LimitSetting;
  contactlessMonthly: LimitSetting;
  contactlessYearly: LimitSetting;

  ecommerceDaily: LimitSetting;
  ecommerceWeekly: LimitSetting;
  ecommerceMonthly: LimitSetting;
  ecommerceYearly: LimitSetting;

  posDaily: LimitSetting;
  posWeekly: LimitSetting;
  posMonthly: LimitSetting;
  posYearly: LimitSetting;
}

interface LimitData {
  CHWRes: {
    RRN: string;
    RespCode: string;
    RespData: string;
    EnquiryDeliveryChnl: string;
    EnquiryTranCde: string;
    CurrCode: string;
    LimitType: string;
    DailyUtilizedTransactionCount: string;
    DailyAvailableTransactionCount: string;
    DailyUtilizedTransactionAmount: string;
    DailyAvailableAmount: string;
    WeeklyUtilizedTransactionCount: string;
    WeeklyAvailableTransactionCount: string;
    WeeklyUtilizedAmount: string;
    WeeklyAvailableAmount: string;
    MonthlyUtilizedTransactionCount: string;
    MonthlyAvailableTransactionCount: string;
    MothlyUtilizedAmount: string; // (Typo: "Mothly" — did you mean "Monthly"? I kept it as-is based on your input.)
    MonthlyAvailableAmount: string;
    YearlyUtilizedTransactionCount: string;
    YearlyAvailableTransactionCount: string;
    YearlyUtilizedAmount: string;
    YearlyAvailableAmount: string;
    TxnEnbleDisble: string;
    Field1: object;
    Field2: object;
    Field3: object;
    Field4: object;
    Field5: object;
    Field6: object;
    Field7: object;
    Field8: object;
    Field9: object;
    Field10: object;
  };
}
type TransactionType = "ATM" | "POS" | "ECOM" | "CONTACTLESS";
type AuthType = "A" | "D";


interface SetCardRulePayload {
  transaction_type: TransactionType;
  auth_type: AuthType;
  mobile_number: string;
}




// =========================== render ====================

const LimitSettings = ({ cardData }: { cardData: any }) => {
  const [isLimitTab, setIsLimitTab] = useState(true);
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  // Centralized state for all limits
  const [limits, setLimits] = useState<LimitsState>({
    atmWithdrawalDaily: { value: 0, enabled: true },
    atmWithdrawalWeekly: { value: 0, enabled: true },
    atmWithdrawalMonthly: { value: 0, enabled: true },
    atmWithdrawalYearly: { value: 0, enabled: true },

    contactlessDaily: { value: 0, enabled: true },
    contactlessWeekly: { value: 0, enabled: true },
    contactlessMonthly: { value: 0, enabled: true },
    contactlessYearly: { value: 0, enabled: true },

    ecommerceDaily: { value: 0, enabled: true },
    ecommerceWeekly: { value: 0, enabled: true },
    ecommerceMonthly: { value: 0, enabled: true },
    ecommerceYearly: { value: 0, enabled: true },

    posDaily: { value: 0, enabled: true },
    posWeekly: { value: 0, enabled: true },
    posMonthly: { value: 0, enabled: true },
    posYearly: { value: 0, enabled: true },
  });

  const toast = useToast();

  async function BlockCard() {
    // const result = await useGetData(`cardBlock?mobile_number==${user?.mobile}`, 'card')
    // console.log(result, " limitEnquiry?trans_type=ATM&mobile_number= ")
  }

  async function handleGetCardLimitDetails() {
    const result = await useGetData(`limitEnquiry?trans_type=ATM&mobile_number=${user?.mobile}`, 'card')

  }



  async function handleGetLimit() {
    setLoading(true);
    const items: ("ATM" | "POS" | "ECOM" | "CONTACTLESS")[] = ["ATM", "POS", "ECOM", "CONTACTLESS"];

    for (const type of items) {
      const success = await getLimit(type);
      if (!success) {
        // Stop fetching if any error occurred
        break;
      }
      console.log(`Waiting 30 seconds before next call...`);
      await sleep(30000); // Wait 30 seconds
    }

    setLoading(false);
  }

  async function getLimit(type: "ATM" | "POS" | "ECOM" | "CONTACTLESS"): Promise<boolean> {
    console.log(`${type}: Fetching limits...`);

    const result = await useGetData(
      `limitEnquiry?trans_type=${type}&mobile_number=${user?.mobile}`,
      'card'
    );

    const data = result?.CHWRes;

    if (data?.RespData?.includes('Exception')) {
      toast.show(`Server Busy, try after sometime`, {
        type: "danger"
      });
      return false; // Indicates error
    }

    if (!data) return false;

    setLimits(prev => {
      const prefixMap: Record<typeof type, string> = {
        ATM: "atmWithdrawal",
        POS: "pos",
        ECOM: "ecommerce",
        CONTACTLESS: "contactless",
      };

      const prefix = prefixMap[type];

      return {
        ...prev,
        [`${prefix}Daily`]: {
          ...prev[`${prefix}Daily` as keyof LimitsState],
          value: Number(data?.DailyAvailableAmount) || 0,
          enabled: data?.TxnEnbleDisble === "ENABLE"
        },
        [`${prefix}Weekly`]: {
          ...prev[`${prefix}Weekly` as keyof LimitsState],
          value: Number(data?.WeeklyAvailableAmount) || 0,
          enabled: data?.TxnEnbleDisble === "ENABLE"
        },
        [`${prefix}Monthly`]: {
          ...prev[`${prefix}Monthly` as keyof LimitsState],
          value: Number(data?.MonthlyAvailableAmount) || 0,
          enabled: data?.TxnEnbleDisble === "ENABLE"
        },
        [`${prefix}Yearly`]: {
          ...prev[`${prefix}Yearly` as keyof LimitsState],
          value: Number(data?.YearlyAvailableAmount) || 0,
          enabled: data?.TxnEnbleDisble === "ENABLE"
        },
      };
    });

    return true; // Indicates success
  }






  const handleLimitChange = (
    key: keyof LimitsState,
    field: keyof LimitSetting,
    value: number | boolean
  ) => {
    setLimits((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };


  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // const handleSetLimit = async (type: "ATM" | "POS" | "ECOM" | "CONTACTLESS") => {
  //   const prefixMap: Record<string, string> = {
  //     ATM: "atmWithdrawal",
  //     POS: "pos",
  //     ECOM: "ecommerce",
  //     CONTACTLESS: "contactless",
  //   };

  //   const prefix = prefixMap[type];

  //   const requestBody = {
  //     mobile_number: user?.mobile || '',
  //     single_tran_name: type,
  //     minimum_amount_per_transaction: "",
  //     maximum_amount_per_transaction: "",

  //     daily_maximum_amount: limits[`${prefix}Daily` as keyof LimitsState]?.value?.toString(),
  //     weekly_maximum_amount: limits[`${prefix}Weekly` as keyof LimitsState]?.value?.toString(),
  //     monthly_maximum_amount: limits[`${prefix}Monthly` as keyof LimitsState]?.value?.toString(),
  //     yearly_maximum_amount: limits[`${prefix}Yearly` as keyof LimitsState]?.value?.toString(),


  //     "daily_allow_transaction_count": "",
  //     "weekly_allow_transaction_count": "",
  //     "monthly_allow_transaction_count": "",
  //     "yearly_allow_transaction_count": "",
  //     limit_flag: "S",
  //   };


  //   const result = await usePostData(
  //     `limitSet`,
  //     requestBody,
  //     'card'
  //   );

  //   await setCardRule(type, limits[`${prefix}Daily` as keyof LimitsState]?.enabled)


  //   console.log(result, "}|||||||||||| +++++++++++++++++++++++")

  //   if (result?.CHWRes?.RespData?.includes('Exception')) {
  //     toast.show(`Server Busy try after sometime`)
  //     return
  //   }

  //   if (result?.CHWRes?.RRN) {
  //     toast.show(`${type} limit updated`)
  //   }



  //   console.log("Submitting limit config for:", type);
  // };



  const handleSetLimit = async (type: "ATM" | "POS" | "ECOM" | "CONTACTLESS"): Promise<boolean> => {
    const prefixMap: Record<string, string> = {
      ATM: "atmWithdrawal",
      POS: "pos",
      ECOM: "ecommerce",
      CONTACTLESS: "contactless",
    };

    const prefix = prefixMap[type];

    const requestBody = {
      mobile_number: user?.mobile || '',
      single_tran_name: type,
      minimum_amount_per_transaction: "",
      maximum_amount_per_transaction: "",
      daily_maximum_amount: limits[`${prefix}Daily` as keyof LimitsState]?.value?.toString(),
      weekly_maximum_amount: limits[`${prefix}Weekly` as keyof LimitsState]?.value?.toString(),
      monthly_maximum_amount: limits[`${prefix}Monthly` as keyof LimitsState]?.value?.toString(),
      yearly_maximum_amount: limits[`${prefix}Yearly` as keyof LimitsState]?.value?.toString(),
      daily_allow_transaction_count: "",
      weekly_allow_transaction_count: "",
      monthly_allow_transaction_count: "",
      yearly_allow_transaction_count: "",
      limit_flag: "S",
    };

    const result = await usePostData(`limitSet`, requestBody, 'card');

    await setCardRule(type, limits[`${prefix}Daily` as keyof LimitsState]?.enabled);

    console.log(result, "}|||||||||||| +++++++++++++++++++++++");

    if (result?.CHWRes?.RespData?.includes('Exception')) {
      toast.show(`Server Busy, try after sometime`, {
        type: "danger"
      });
      return false; // error - stop further processing
    }

    if (result?.CHWRes?.RRN) {
      toast.show(`${type} limit updated`);
    }

    console.log("Submitting limit config for:", type);
    return true; // success
  };


  async function handleSubmit() {
    setLoading(true);
    const items: ("ATM" | "POS" | "ECOM" | "CONTACTLESS")[] = ["ATM", "POS", "ECOM", "CONTACTLESS"];

    for (const type of items) {
      const success = await handleSetLimit(type);
      if (!success) {
        break; // stop if error
      }
      console.log(`Waiting 30 seconds before next call...`);
      await sleep(30000); // Wait 30 seconds
    }

    setLoading(false);
  }

  // async function handleSubmit() {

  //   setLoading(true)
  //   const items: ("ATM" | "POS" | "ECOM" | "CONTACTLESS")[] = ["ATM", "POS", "ECOM", "CONTACTLESS"];

  //   for (const type of items) {
  //     await handleSetLimit(type);
  //     console.log(`Waiting 30 seconds before next call...`);
  //     await sleep(30000); // Wait 30 seconds
  //   }
  //   setLoading(false)
  // }


  async function setCardRule(type: "ATM" | "POS" | "ECOM" | "CONTACTLESS", value: boolean) {
    try {


      const payload = {
        "transaction_type": type,
        "auth_type": value ? "A" : "D",
        "mobile_number": user?.mobile
      }



      const response = await fetch("https://dev.wallex.world/cards/cardRule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization here if needed
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to set card rule:", data);
        // throw new Error(data?.message || "Error setting card rule");
      }

      return data;
    } catch (error) {
      console.error("Error in setCardRule:", error);
      throw error;
    }
  }






  useEffect(() => {
    handleGetLimit()
  }, [])










  // const LimitItem: React.FC<{ label: string; limitKey: keyof LimitsState }> = ({
  //   label,
  //   limitKey,
  // }) => {
  //   const limit = limits[limitKey];

  //   return (
  //     <View style={[styles.limitItem, { position: 'relative', width: '100%' }]}>
  //       <View style={styles.info}>
  //         <Text style={styles.label}>{label}</Text>
  //         <View style={{ flexDirection: 'row', marginTop: 8 }}>
  //           <Slider
  //             style={styles.slider}
  //             minimumValue={0}
  //             maximumValue={50000}
  //             minimumTrackTintColor="#1e90ff"
  //             maximumTrackTintColor="#d3d3d3"
  //             value={limit.value}
  //             onValueChange={(val: number) => {
  //               console.log('Final value:', val)
  //               handleLimitChange(limitKey, 'value', Math.round(val))
  //             }
  //             }
  //           />
  //           <TextInput
  //             readOnly
  //             style={{
  //               borderWidth: 1,
  //               borderColor: '#ccc',
  //               height: 35,
  //               width: 80,
  //               borderRadius: 8,
  //               textAlign: 'center',
  //               color: Color.primaryBlue100
  //             }}
  //             value={`₹ ${limit.value}`}
  //             keyboardType="numeric"
  //           />
  //         </View>
  //       </View>
  //       <Switch
  //         onValueChange={() =>
  //           handleLimitChange(limitKey, 'enabled', !limit.enabled)
  //         }
  //         style={styles.toggle}
  //         value={limit.enabled}
  //       />
  //     </View>
  //   );
  // };



  const LimitItem: React.FC<{ label: string; limitKey: keyof LimitsState }> = ({
    label,
    limitKey,
  }) => {
    const limit = limits[limitKey];
    const [sliderValue, setSliderValue] = useState(limit.value);

    useEffect(() => {
      // Sync local slider value when external limit.value changes (e.g., initial load or external update)
      setSliderValue(limit.value);
    }, [limit.value]);

    return (
      <View style={[styles.limitItem, { position: 'relative', width: '100%' }]}>
        <View style={styles.info}>
          <Text style={styles.label}>{label}</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={50000}
              minimumTrackTintColor="#1e90ff"
              maximumTrackTintColor="#d3d3d3"
              value={sliderValue}
              onValueChange={(val: number) => {
                setSliderValue(val); // Update local value during drag
              }}
              onSlidingComplete={(val: number) => {
                handleLimitChange(limitKey, 'value', Math.round(val)); // Commit final value
              }}
            />
            <TextInput
              readOnly
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                height: 35,
                width: 80,
                borderRadius: 8,
                textAlign: 'center',
                color: Color.primaryBlue100
              }}
              value={`₹ ${Math.round(sliderValue)}`}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Switch
          onValueChange={() =>
            handleLimitChange(limitKey, 'enabled', !limit.enabled)
          }
          style={styles.toggle}
          value={limit.enabled}
        />
      </View>
    );
  };



  if (loading) {
    return <Loading />
  }






  // ========================= render =======================
  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, isLimitTab && styles.activeTab]}
            onPress={() => setIsLimitTab(true)}
          >
            <Text style={[styles.tabText, isLimitTab && styles.activeTabText]}>
              Set Limit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLimitTab && styles.activeTab]}
            onPress={() => setIsLimitTab(false)}
          >
            <Text style={[styles.tabText, !isLimitTab && styles.activeTabText]}>
              Card Information
            </Text>
          </TouchableOpacity>
        </View>

        {
          isLimitTab ? <>
            {/* Pass limitKey to map the state */}

            <ScrollView style={{
              flex: 1
            }}>
              <LimitItem label="Daily ATM Limit" limitKey="atmWithdrawalDaily" />
              <LimitItem label="Weekly ATM Limit" limitKey="atmWithdrawalWeekly" />
              <LimitItem label="Monthly ATM Limit" limitKey="atmWithdrawalMonthly" />
              <LimitItem label="Yearly ATM Limit" limitKey="atmWithdrawalYearly" />

              <LimitItem label="Daily Contactless Limit" limitKey="contactlessDaily" />
              <LimitItem label="Weekly Contactless Limit" limitKey="contactlessWeekly" />
              <LimitItem label="Monthly Contactless Limit" limitKey="contactlessMonthly" />
              <LimitItem label="Yearly Contactless Limit" limitKey="contactlessYearly" />


              <LimitItem label="Daily Ecommerce Limit" limitKey="ecommerceDaily" />
              <LimitItem label="Weekly Ecommerce Limit" limitKey="ecommerceWeekly" />
              <LimitItem label="Monthly Ecommerce Limit" limitKey="ecommerceMonthly" />
              <LimitItem label="Yearly Ecommerce Limit" limitKey="ecommerceYearly" />

              <LimitItem label="Daily POS Limit" limitKey="ecommerceDaily" />
              <LimitItem label="Weekly POS Limit" limitKey="ecommerceWeekly" />
              <LimitItem label="Monthly POS Limit" limitKey="ecommerceMonthly" />
              <LimitItem label="Yearly POS Limit" limitKey="ecommerceYearly" />


            </ScrollView>
            {/* Submit Button */}
            <View style={{
              padding: 10
            }}>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{
                  backgroundColor: Color.primaryBlue100,
                  paddingVertical: 15,
                  borderRadius: 12,
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >

                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>


          </> : <>

            {/* =================== card info */}

            <View style={{
              flex: 1
            }}>
              <Text style={{
                color: Color.primaryBlue100,
                fontWeight: '800',
                fontSize: 16
              }}>
                Card Information
              </Text>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10
              }}>
                <Text style={{
                  color: Color.primaryBlue100,
                  fontSize: 14
                }}>
                  Card
                </Text>
                <Text style={{
                  color: Color.primaryBlue100,
                  fontSize: 14,
                  fontWeight: '700'
                }}>
                  {cardData?.Card_No}
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10
              }}>
                <Text style={{
                  color: Color.primaryBlue100,
                  fontSize: 14
                }}>
                  Expiry Date
                </Text>
                <Text style={{
                  color: Color.primaryBlue100,
                  fontSize: 14,
                  fontWeight: '700'
                }}>
                  {cardData?.Expiry_Date}
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10
              }}>
                <Text style={{
                  color: Color.primaryBlue100,
                  fontSize: 14
                }}>
                  Balance
                </Text>
                <Text style={{
                  color: Color.primaryBlue100,
                  fontSize: 14,
                  fontWeight: '700'
                }}>
                  ₹{cardData?.Account_Bal}
                </Text>
              </View>
            </View>


            <TouchableOpacity
              onPress={BlockCard}
              style={{
                backgroundColor: Color.colorRed_200,
                paddingVertical: 15,
                borderRadius: 12,
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 3,
              }}
            >

              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                Block Card
              </Text>
            </TouchableOpacity>


          </>
        }




      </View>


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondaryColors100,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    width: '100%',
    alignSelf: 'center',
    flex: 1
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: Color.secondaryColors200,
    borderRadius: 28,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 28,
  },
  activeTab: {
    backgroundColor: Color.primaryBlue100,
  },
  tabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  limitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  info: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.primaryBlue100,
  },
  slider: {
    width: '70%',
  },
  toggle: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default LimitSettings;
