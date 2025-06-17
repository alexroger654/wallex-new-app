import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePostData from '../shared/fetch/usePostData';
import { IUser } from '../shared/interfaces/user.interface';

interface AuthContextType {
  user: IUser | null;
  applicationData: IUser | null;
  loading: boolean;
  sendOtp: (phone: string) => Promise<boolean>;
  setUser: (user: IUser) => void;
  setApplicationData: (user: IUser) => void;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  //@ts-ignore
  const [applicationData, setApplicationData] = useState<IUser>({})
  const [loading, setLoading] = useState(true);

  // Mock API calls
  const sendOtp = async (phone: string): Promise<boolean> => {
    try {
      const result = await usePostData(
        'auth/sendOTP',
        { mobile: phone },
        'service',
      );

      if (result?.code === 200) {
        return true;
      } else {
        console.error('Error sending OTP:', result?.message || 'Unknown error');
        return false;
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
      return false;
    }
  };

  const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
    try {
      const result = await usePostData(
        'auth/verifyOTP',
        { mobile: phone, otp: otp },
        'service',
      );

      if (result?.code === 200 && result?.data?.access_token) {

        console.log(result?.data?.access_token, "====================")
        const userData = {
          ...result?.data?.user,
          accessToken: result?.data?.access_token,
        };

        // Save user data to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      } else {
        console.error('Error sending OTP:', result?.message || 'Unknown error');
        return false;
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, sendOtp, verifyOtp, logout, setUser, applicationData, setApplicationData }}>
      {children}
    </AuthContext.Provider>
  );
};
