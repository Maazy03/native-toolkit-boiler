import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import CustomText from './CustomText';

function BiCycleDetailsBox(props) {
  const {navigation} = props;

  const navigationBooking = () => {
    navigation.navigate('BicycleSlots', {text: 'HELLO'});
  };

  return (
    <View>
      <View style={styles.rowLayout}>
        <CustomText
          variant={'h3'}
          font={'bold'}
          fontFamily={'Montserrat'}
          gutterTop={5}
          gutterBottom={1}
          color={'white'}
          align={'left'}
          letterSpacing={1}
          style={{marginLeft: 15, width: '45%'}}
          transform={'none'}>
          17:00 - 17:45 AM
        </CustomText>

        <View style={styles.detailsBox}>
          <CustomText
            variant={'h5'}
            font={'bold'}
            fontFamily={'Montserrat'}
            gutterTop={5}
            gutterBottom={1}
            color={'white'}
            align={'left'}
            letterSpacing={1}
            transform={'none'}>
            Classic
          </CustomText>
          <View style={styles.instructorLayout}>
            <CustomText
              font={'bold'}
              variant={'body5'}
              gutterBottom={0}
              color={'white'}
              align={'left'}
              style={{marginLeft: 2}}
              transform={'none'}>
              Medeline
            </CustomText>
            <CustomButton
              value="Book"
              bgColor={'#1BAC00'}
              width={'45%'}
              size={'sm'}
              height={20}
              color={'white'}
              borderRadius={100}
              onPress={navigationBooking}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
export default BiCycleDetailsBox;
const styles = StyleSheet.create({
  scheduleLayout: {
    backgroundColor: '#242424',
    width: '100%',
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailsBox: {
    flex: 1,
    padding: 25,
    backgroundColor: '#3B3C40',
    borderTopLeftRadius: 37,
    borderBottomLeftRadius: 37,
    display: 'flex',
    paddingLeft: 20,
    shadowColor: 'black',
    shadowOffset: {width: 30, height: 1},
    shadowOpacity: 1,
    shadowRadius: 21,
    elevation: 10,
  },
  instructorLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 0,
    justifyContent: 'space-between',
  },
});
