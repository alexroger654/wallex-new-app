import RazorpayCheckout from "react-native-razorpay";
import { Color } from "../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

interface LineItem {
  type?: string;
  sku?: string;
  variant_id?: string;
  price?: number;
  offer_price?: number;
  tax_amount?: number;
  quantity: number;
  name: string;
  description?: string;
  weight?: number;
  dimensions?: { length?: string; width?: string; height?: string };
  image_url?: string;
  product_url?: string;
}

const makeOrder = async (
  customer_id: string,
  amount: number,
  email: string,
  name: string,
  phone: string,
  shipping_address: Address = {},
  billing_address: Address = {},
  line_items: LineItem[] = [],
): Promise<any> => {
  try {
    // Retrieve user data from AsyncStorage
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      throw new Error("User not found in storage.");
    }
    const parsedUser = JSON.parse(user);

    if (!parsedUser?.accessToken) {
      throw new Error("User access token not found.");
    }

    // Prepare API request
    const response = await fetch("https://dev.wallex.world/payment-gateway/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedUser.accessToken}`,
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: "",
        offer_id: null,
        method: "netbanking",
        notes: { customer_order_id: "" },
        partial_payment: false,
        line_items,
        customer_id,
        customer_details: {
          name,
          contact: phone,
          email,
          shipping_address,
          billing_address,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Failed to create order");
    }

    const orderId = data?.data?.id;
    if (!orderId) {
      throw new Error("Order ID not found in response.");
    }

    // Handle payment
    return await handleMakePayment(orderId, amount, email, name, phone);
  } catch (error: any) {
    console.error("Error in makeOrder:", error.message);
    throw error;
  }
};

const handleMakePayment = async (
  id: string,
  amount: number,
  email: string,
  name: string,
  phone: string
): Promise<any> => {
  const paymentOptions = {
    description: "Credits towards consultation",
    image: "https://i.ibb.co.com/VWGBDsn/logo.png",
    currency: "INR",
    key: "rzp_test_juxG7GwSlx3ANg",
    amount,
    name: "Wallex",
    order_id: id,
    prefill: {
      email,
      contact: phone,
      name,
    },
    theme: { color: Color.primaryBlue100 },
  };

  return new Promise((resolve, reject) => {
    RazorpayCheckout.open(paymentOptions)
      .then(data => {
        console.log(`Payment Success: ${data?.razorpay_order_id}`);
        resolve(data);
      })
      .catch(error => {
        console.error(`Payment Error: ${error.code} | ${error.description}`);
        reject(error);
      });
  });
};

export default makeOrder;
