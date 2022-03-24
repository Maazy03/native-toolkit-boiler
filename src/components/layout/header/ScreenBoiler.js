import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import SubHeaderComponent from '../subHeader';
import HeaderComponent from './HeaderComponent';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ScreenBoiler(props) {
  const {navigation, children, headerProps} = props;
  const {isHeader, isSubHeader} = headerProps;

  return (
    <View style={styles.background}>
      {isHeader && <HeaderComponent navigation={navigation} />}
      {isSubHeader && (
        <SubHeaderComponent navigation={navigation} headerProps={headerProps} />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'black',

    alignItems: 'center',
  },
  main: {
    fontSize: 25,
    color: 'white',
  },
});
