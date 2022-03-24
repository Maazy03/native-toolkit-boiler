import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import DatePick from '@components/common/DatePick';
import CustomButton from '@components/common/CustomButton';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CustomText from '@components/common/CustomText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function BicycleSlots(props) {
  const auth = useSelector(state => state.auth);
  const [selected, setSelected] = useState({});

  const headerProps = {
    isHeader: false,
    isSubHeader: true,
    isRightIcon: true,
  };

  const callback = items => {
    setSelected(items);
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={styles.container}>
        <View>
          <CustomText
            variant={'h2'}
            font={'bold'}
            fontFamily={'Montserrat'}
            gutterTop={25}
            gutterBottom={1}
            color={'white'}
            align={'left'}
            letterSpacing={1}
            transform={'none'}>
            Pick A Bike
          </CustomText>
          <CustomText
            variant={'body2'}
            font={'bold'}
            fontFamily={'Montserrat'}
            gutterTop={5}
            gutterBottom={1}
            color={'#888888'}
            align={'left'}
            transform={'none'}>
            {auth?.user?.displayName}
          </CustomText>

          <View style={styles.timeLayout}>
            <CustomText
              variant={'h6'}
              font={'bold'}
              fontFamily={'Montserrat'}
              gutterTop={5}
              gutterBottom={1}
              color={'white'}
              align={'left'}
              transform={'none'}>
              {moment().format('dddd')} {moment().format('MMM Do')}
            </CustomText>
            <CustomText
              variant={'h6'}
              font={'light'}
              fontFamily={'Montserrat'}
              gutterTop={5}
              gutterBottom={1}
              color={'white'}
              align={'right'}
              transform={'none'}>
              {moment('2022-02-07T07:00:00+05:00').format('hh:mm')}
              {'-'}
              {moment('2022-02-07T07:45:00+05:00').format('hh:mmA')}
            </CustomText>
          </View>
          <ScrollView contentContainerStyle={{paddingBottom: 120}}>
            <DatePick selected={selected} handleSetSelection={callback} />
          </ScrollView>
        </View>

        <View style={styles.bottom}>
          <CustomText
            variant={'h5'}
            font={'bold'}
            fontFamily={'Montserrat'}
            gutterTop={5}
            gutterBottom={1}
            color={'white'}
            align={'center'}>
            32 Bikes Left
          </CustomText>
          <CustomButton
            value="Confirm Booking"
            bgColor={'#1BAC00'}
            width={'40%'}
            size={'xmd'}
            color={'white'}
            borderRadius={100}
          />
        </View>
      </View>
    </ScreenBoiler>
  );
}
export default BicycleSlots;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal:10
  },
  timeLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#242424',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bottom: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B3C40',
    width: width,
    height: 140,
    opacity: 1,
    position: 'absolute',
    bottom: 0,
    paddingBottom:50
  },
});
