import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {scale} from 'react-native-size-matters';
import CustomText from './CustomText';

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
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

const CustomButton = props => {
  const sizes = {sm: 28, md: 32, xmd: 42, lg: 56};

  const {
    size,
    btnWrapperStyles,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    loader = false,
    loaderColor = 'white',
    borderColor = 'black',
    bgColor = 'white',
    borderWidth = 0,
    fontSize = 15,
    textStyles,
    font = 'light',
    variant,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity ? props.activeOpacity : 0.9}
      onPress={props.onPress}
      style={[
        styles.mainBtn,
        {
          width: props.width,
          height: sizes[size],
          backgroundColor: bgColor,
          borderColor: borderColor,
          marginTop: gutterTop,
          marginBottom: gutterBottom,
          borderWidth: borderWidth,
        },
        btnWrapperStyles,
        props.justifyContent && {
          justifyContent: props.justifyContent,
        },
        props.borderRadius && {
          borderRadius: props.borderRadius,
        },
      ]}>
      <CustomText
        style={[
          styles.buttonText,
          {
            fontSize: fontSize,
            color: color,
          },
          variant && FONTVARIANTS[variant],
          font && FONTSSTYLE[font],
          textStyles,
        ]}>
        {!loader && props.value}
      </CustomText>
      {loader && (
        <ActivityIndicator
          style={styles.indicatorStyle}
          size="small"
          color={loaderColor}
        />
      )}

      {props.iconName && (
        <Icon
          name={props.iconName}
          type={props.iconType}
          style={[styles.iconCustom, props.iconStyle && props.iconStyle]}
        />
      )}
      <CustomText
        style={[
          styles.text,
          {color: props.textColor, fontSize: scale(15)},
          props.textTransform && {
            textTransform: props.textTransform,
          },
        ]}>
        {props.text}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
  iconCustom: {
    color: '#C0C0C0',
    fontSize: 20,
    paddingRight: 20,
    paddingLeft: I18nManager.isRTL ? 20 : 0,
  },
});

export default CustomButton;
