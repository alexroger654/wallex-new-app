export default interface IAddress {
  userAddressId: string;
  userAccountId: string;
  name: string;
  mobileNumber: string;
  email: string;
  address: string;
  stateId: string;
  stateName: string;
  cityId: string;
  cityName: string;
  pincode: string;
  status: "active" | "inactive";
}
