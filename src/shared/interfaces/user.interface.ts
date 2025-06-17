export interface IUser {
  _id: string;
  aadhar: string;
  ac_number: string;
  ac_status: "activated" | "inactive" | "deactivated" | "verifying" | "archived"
  accessToken: string;
  balance: number;
  bank_ifsc: string;
  createdAt: string; // ISO date string
  device_id: string;
  device_type: "android" | "ios";
  dob: string; // ISO date string
  email: string;
  family_members: any[]; // Array of family member details (define specific structure if known)
  full_name: string;
  gender: "male" | "female" | "other";
  guardian_details: null | any; // Define specific structure if guardian details are known
  has_digigold_ac: boolean;
  is_new_user: boolean;
  last_login: string; // ISO date string
  location: {
    address: string;
    city: string;
    country: string;
    pincode: number;
    state: string;
  };
  mobile: string;
  mobile_isd: string;
  profile_picture: string | null;
  referral_code: string;
  role: "user" | "admin" | "superadmin"; // Add more roles as needed
  updatedAt: string; // ISO date string
}
