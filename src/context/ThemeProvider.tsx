import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useState} from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: any;
  color: {
    textColor: string;
    backgroundColor: string;
    primary: string;
    white: string;
    border: string;
    lightColor: string;
    secondaryTextColor: string;
    lightGray: string;
    green: string;
    primaryBlue100: string;
    primaryBlue80: string;
    gray20: string;
  };
}

//==================== Create Context==================================
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

//========================= component ==================================

export default function ThemeProvider({children}: any) {
  //====================== state =====================================
  const [theme, setTheme] = useState('light');
  const [color, setColor] = useState({
    textColor: '#4F5060',
    secondaryTextColor: '#4F5060',
    primary: '#5225DC',
    backgroundColor: '#FFFFFF',
    white: '#fff',
    border: '#C8CDD9',
    lightColor: '#F3F3FF',
    lightGray: '#F5F6F8',
    green: '#04C300',
    primaryBlue100: '#1B386E',
    primaryBlue80: '#49608B',
    gray20: '#D2D8E8',
  });

  //=================== render ========================================
  return (
    <ThemeContext.Provider value={{color, theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

//============================= hook =====================================

export function useTheme() {
  const result = useContext(ThemeContext);
  if (!result) {
    throw new Error('CartContext must be used within a CartProvider');
  }
  const {color, theme, setTheme} = result;
  return {color, theme, setTheme};
}

const styles = StyleSheet.create({});
