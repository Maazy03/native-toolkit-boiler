import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import moment from 'moment';
import ReserveModal from '@components/view/modal/ReserveModal';

const TimeCard = props => {
  const {item} = props;
  const [isModal, setIsReserverModal] = useState(false);

  const momentTime = moment(item?.startTime).utc().format('hh:mm A');
  let time = momentTime.substring(0, momentTime.indexOf(' '));
  let zone = momentTime.substring(momentTime.indexOf(' ') + 1);
  let trainerPhoto =
    'https://lac-fitness-backend.herokuapp.com/api/images/' +
    item?.trainer?.photo;

    const openModal = () => {
    setIsReserverModal(!isModal);
  };

  return (
    <View style={styles.container}>
      <CustomText
        variant={'body4'}
        font={'bold'}
        gutterTop={5}
        gutterBottom={0}
        color={'white'}
        align={'left'}
        transform={'none'}>
        Today, {item?.day}
      </CustomText>
      <CustomText
        variant={'body1'}
        font={'bold'}
        gutterTop={5}
        gutterBottom={20}
        color={'white'}
        align={'left'}
        letterSpacing={2}
        transform={'none'}>
        {item?.catType?.name}
      </CustomText>

      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <CustomText
          variant={'body4'}
          font={'bold'}
          gutterTop={1}
          gutterBottom={25}
          color={'white'}
          align={'left'}
          transform={'none'}>
          {zone}
        </CustomText>
        <CustomText
          font={'bold'}
          variant={'extraLargeTitle'}
          fontFamily={'Montserrat'}
          gutterTop={5}
          gutterBottom={15}
          color={'white'}
          align={'left'}
          letterSpacing={5}
          transform={'none'}>
          {time}
        </CustomText>
      </View>

      <CustomButton
        value="See Details"
        bgColor={'#888888'}
        width={'90%'}
        size={'sm'}
        color={'black'}
        borderRadius={100}
        borderColor={'#000000'}
        loaderColor={'black'}
        borderWidth={1}
        onPress={openModal}
      />
      <View style={styles.instructorLayout}>
        <View style={styles.pictureView}>
          <Image
            resizeMode="cover"
            style={styles.profileImage}
            source={{uri: trainerPhoto}}
          />
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
            By {item?.trainer?.firstName + item?.trainer?.lastName}
          </CustomText>
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
      <ReserveModal isVisibleModal={isModal} item={item} {...props} />
    </View>
  );
};
export default TimeCard;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#888888',
    borderRadius: 34,
    paddingVertical: 20,
  },
  cardLayout: {
    marginTop: 120,
  },
  pictureView: {
    height: 30,
    width: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  instructorLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});
