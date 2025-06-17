import { IDatabaseDefaultProps } from "./db.interface";

export interface IMobileISD {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export interface IAppUsersFilter {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc" | "1" | "-1";
  sortBy?: string;
  searchTerm?: string;
  createdFrom?: string; // date string YYYY-MM-DD
  createdTo?: string; // date string YYYY-MM-DD
  ac_status?: "activated" | "inactive" | "";
  is_new_user?: boolean;
}

type Location = {
  country: string;
  state: string;
  city: string;
  pincode: number;
  address: string;
};

export interface IAppUser extends IDatabaseDefaultProps {
  mobile: string;
  mobile_isd: string;
  has_digigold_ac: boolean;
  profile_picture: string | null;
  // Bank Account Number
  ac_number?: string;
  // Bank IFSC Details
  bank_ifsc?: string;
  ac_status: "activated" | "inactive" | "deactivated" | "verifying";
  role: "user" | "guardian" | "student";
  referral_code: string;
  balance: number;
  full_name?: string;
  gender?: "male" | "female" | "other";
  dob: string;
  email: string;
  aadhar?: string;
  location: Location;
  guardian_details: {
    full_name: string;
    mobile: string;
    relation: "father" | "mother" | "other";
    location: Location;
    relationship_details?: string; // if 'other' selected
  } | null;
  family_members: string[];
  last_login: string;
  is_new_user: boolean;
  // fcm_token: { type: String, default: "" },
  device_type: string;
  device_id: string;
}
