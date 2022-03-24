import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import CustomText from './CustomText';
import moment from 'moment';
import ReserveModal from '@components/view/modal/ReserveModal';
import CustomButton from './CustomButton';

function DetailsBox(props) {
  const {classData, idPresent} = props;
  let trainerPhoto =
    'https://lac-fitness-backend.herokuapp.com/api/images/' +
    classData?.trainer?.photo;
  const [isModal, setIsReserverModal] = useState(false);
  const [booked, setBooked] = useState(false);

  const openModal = () => {
    setIsReserverModal(!isModal);
  };

  const parentCall = () => {
    setBooked(true);
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
          style={{marginLeft: 15, width: '32%'}}
          transform={'none'}>
          {moment(classData?.startTime).utc().format('hh:mm')} -{' '}
          {moment(classData?.endTime).utc().format('hh:mm A')}
        </CustomText>

        <View style={styles.detailsBox}>
          <CustomText
            variant={'h3'}
            font={'bold'}
            fontFamily={'Montserrat'}
            gutterTop={5}
            gutterBottom={1}
            color={'white'}
            align={'left'}
            letterSpacing={1}
            transform={'none'}>
            {classData?.catType?.name}
          </CustomText>
          <View style={styles.instructorLayout}>
            <View style={styles.pictureView}>
              {classData?.trainer?.photo !== undefined ? (
                <Image
                  resizeMode="contain"
                  style={styles.profileImage}
                  source={{uri: trainerPhoto}}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  style={styles.profileImage}
                  source={require('../../assets/Images/profile.jpg')}
                />
              )}
            </View>
            <View>
              <CustomText
                font={'bold'}
                variant={'body5'}
                gutterBottom={0}
                color={'white'}
                align={'left'}
                style={{marginLeft: 5}}
                transform={'none'}>
                By{' '}
                {classData?.trainer?.firstName +
                  ' ' +
                  classData?.trainer?.lastName}
              </CustomText>
              <View style={{flexDirection: 'row'}}>
                <CustomText
                  variant={'small'}
                  font={'bold'}
                  fontFamily={'Montserrat'}
                  gutterTop={2}
                  gutterBottom={0}
                  color={'white'}
                  align={'left'}
                  style={{marginLeft: 5}}
                  transform={'none'}>
                  Yoga Expert
                </CustomText>
              </View>
            </View>
            {idPresent || booked ? null : (
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                }}>
                <CustomButton
                  value="Book"
                  bgColor={'#1BAC00'}
                  width={'100%'}
                  size={'sm'}
                  color={'white'}
                  top={10}
                  style={{padding: 10}}
                  borderRadius={100}
                  onPress={openModal}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <ReserveModal
        isVisibleModal={isModal}
        item={classData}
        {...props}
        childCall={parentCall}
      />
    </View>
  );
}
export default DetailsBox;
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
    paddingHorizontal: 10,
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
    paddingVertical: 20,
  },
  instructorLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 15,
  },
  pictureView: {
    height: 28,
    width: 28,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});
