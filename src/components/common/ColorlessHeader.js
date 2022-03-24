import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  scale,
  verticalScale,
  ScaledSheet,
  moderateScale,
} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from './CustomText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ColorlessHeader(props) {
  const {mainProps} = props;
  return (
    <View style={styles.Container2}>
      <TouchableOpacity
        style={{width: width * 0.4}}
        onPress={() => {
          mainProps.navigation.goBack();
        }}>
        <AntDesign
          name="arrowleft"
          color="white"
          style={styles.icon}
          size={moderateScale(25, 0.6)}
        />
      </TouchableOpacity>

      <CustomText style={styles.Txt}>{props.title}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  Container2: {
    width: width,
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    fontWeight: 'bold',
    marginLeft: 30,
    // width: width * 0.3,
    // padding: '20%',
  },
  Txt: {
    fontSize: moderateScale(20, 0.3),
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
