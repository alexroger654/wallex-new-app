import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

const CustomText2 = (props: TextProps) => (
  <RNText {...props} style={[{fontFamily: 'Poppins-Regular'}, props.style]} />
);

export default CustomText2;
