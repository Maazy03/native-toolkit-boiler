import React from 'react';
import {Text} from 'react-native';

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  extraLargeTitle: 50,
  largeTitle: 40,
  h0: 36,
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 22,
  h5: 20,
  h6: 18,
  body1: 18,
  body2: 16,
  body3: 14,
  body4: 12,
  body5: 10,
  small: 8,
};

export const FONTVARIANTS = {
  extraLargeTitle: {fontFamily: 'Roboto', fontSize: SIZES.extraLargeTitle},
  largeTitle: {fontFamily: 'Roboto', fontSize: SIZES.largeTitle},
  h0: {fontFamily: 'Roboto', fontSize: SIZES.h0, lineHeight: 38},
  h1: {fontFamily: 'Roboto', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto', fontSize: SIZES.h3, lineHeight: 26},
  h4: {fontFamily: 'Roboto', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Roboto', fontSize: SIZES.h5, lineHeight: 20},
  h6: {fontFamily: 'Roboto', fontSize: SIZES.h6, lineHeight: 18},
  body1: {fontFamily: 'Roboto', fontSize: SIZES.body1, lineHeight: 19},
  body2: {fontFamily: 'Roboto', fontSize: SIZES.body2, lineHeight: 18},
  body3: {fontFamily: 'Roboto', fontSize: SIZES.body3, lineHeight: 16},
  body4: {fontFamily: 'Roboto', fontSize: SIZES.body4, lineHeight: 14},
  body5: {fontFamily: 'Roboto', fontSize: SIZES.body5, lineHeight: 12},
  small: {fontFamily: 'Roboto', fontSize: SIZES.small, lineHeight: 10},
};
export const FONTSSTYLE = {
  light: {fontFamily: 'Montserrat-light'},
  semiBold: {fontFamily: 'Roboto-Bold', fontWeight: 'bold'},
  bold: {fontFamily: 'Montserrat-Bold'},
  italic: {fontFamily: 'Montserrat-italic', fontStyle: 'italic'},
  underline: {fontFamily: 'Montserrat-light', textDecorationLine: 'underline'},
};

const CustomText = props => {
  const {
    children,
    numberOfLines,
    style,
    variant,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    align = 'auto',
    transform = 'none',
    font = 'light',
    fontFamily = '',
    letterSpacing = 0,
    top = 0,
  } = props;
  return (
    <Text
      style={[
        {
          fontFamily: fontFamily,
          marginTop: gutterTop,
          marginBottom: gutterBottom,
          color: color,
          textAlign: align,
          textTransform: transform,
          letterSpacing: letterSpacing,
          top: top,
        },
        style,
        variant && FONTVARIANTS[variant],
        font && FONTSSTYLE[font],
      ]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default CustomText;
