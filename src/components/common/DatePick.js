import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Color from '../../assets/Utilities/Color';
import CustomText from './CustomText';
import {Icon} from 'native-base';

const height = Dimensions.get('window').height;

const DatePick = props => {
  const {handleSetSelection, selected} = props;

  return (
    <View style={styles.container}>
      <View style={styles.slotsLayout}>
        {item.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.checkBoxView}
              onPress={() => {
                handleSetSelection({item, index});
              }}>
              <CustomText
                variant={'h5'}
                font={'light'}
                fontFamily={'Montserrat'}
                gutterTop={5}
                gutterBottom={1}
                color={'white'}
                align={'center'}
                letterSpacing={1}
                transform={'none'}
                style={[
                  styles.number,
                  index == selected?.index && styles.selectedContainer,
                ]}>
                {index == selected?.index ? (
                  <Icon
                    name="check"
                    type="FontAwesome"
                    style={{color: Color.white}}
                  />
                ) : (
                  item.number
                )}
              </CustomText>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Image
        source={require('../../assets/Images/walk.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default DatePick;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    marginTop: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
    paddingTop: 10,
  },
  selectedContainer: {
    backgroundColor: '#5eb6e1',
  },
  slotsLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkBoxView: {
    backgroundColor: '#242424',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  number: {
    backgroundColor: '#888888',
    width: 50,
    height: 50,
    borderRadius: 25,
    paddingTop: 18,
  },
});

const item = [
  {
    number: 1,
  },
  {
    number: 2,
  },
  {
    number: 3,
  },
  {
    number: 4,
  },
  {
    number: 5,
  },
  {
    number: 6,
  },
  {
    number: 7,
  },
  {
    number: 8,
  },
  {
    number: 9,
  },
  {
    number: 10,
  },
  {
    number: 11,
  },
  {
    number: 12,
  },
  {
    number: 13,
  },
  {
    number: 14,
  },
  {
    number: 15,
  },
  {
    number: 16,
  },
  {
    number: 17,
  },
  {
    number: 18,
  },
  {
    number: 19,
  },
  {
    number: 20,
  },
  {
    number: 21,
  },
  {
    number: 22,
  },
  {
    number: 23,
  },
  {
    number: 24,
  },
  {
    number: 25,
  },
];
