import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CustomText from './CustomText';
import moment from 'moment';
import CardsDetailsModal from '@components/view/modal/ClassDetailsModal';

function HistoryDetailsBox(props) {
  const {label, historyData, index} = props;
  const [isModal, setIsModal] = useState(false);

  let trainerPhoto =
    'https://lac-fitness-backend.herokuapp.com/api/images/' +
    historyData?.trainer?.photo;
  const openModal = () => {
    setIsModal(!isModal);
  };

  const bgColor =
    label === 'upcoming' ? 'green' : label === 'attended' ? '#28292D' : 'red';
  return (
    <View key={index}>
      {historyData ? (
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
            style={{marginLeft: 15, width: '30%'}}
            transform={'none'}>
            {moment(historyData?.startTime).utc().format('hh:mm')} -{' '}
            {moment(historyData?.endTime).utc().format('hh:mm A')}
          </CustomText>

          <TouchableOpacity style={styles.detailsBox} onPress={openModal}>
            <View
              style={{
                ...styles.expertise,
                backgroundColor: bgColor,
              }}>
              <CustomText
                variant={'body4'}
                font={'light'}
                fontFamily={'Montserrat'}
                gutterBottom={0}
                color={'white'}>
                {label}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
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
                {historyData?.catType?.name}
              </CustomText>
            </View>
            <View style={styles.instructorLayout}>
              <View style={styles.pictureView}>
                {historyData?.trainer?.photo !== undefined ? (
                  <Image
                    resizeMode="contain"
                    style={styles.profileImage}
                    imageStyle={{borderRadius: 120}}
                    source={{uri: trainerPhoto}}
                  />
                ) : (
                  <Image
                    resizeMode="contain"
                    style={styles.profileImage}
                    imageStyle={{borderRadius: 120}}
                    source={require('../../assets/Images/profilePic.jpg')}
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
                  {historyData?.trainer?.firstName +
                    ' ' +
                    historyData?.trainer?.lastName}
                </CustomText>
                <View style={{flexDirection: 'row'}}>
                  {historyData?.trainer?.tags?.length > 0 &&
                    historyData?.trainer?.tags &&
                    historyData?.trainer?.tags.map((item, index) => {
                      return (
                        <CustomText
                          key={index}
                          variant={'small'}
                          font={'bold'}
                          fontFamily={'Montserrat'}
                          gutterTop={2}
                          gutterBottom={0}
                          color={'white'}
                          align={'left'}
                          style={{marginLeft: 5}}
                          transform={'none'}>
                          {item}
                        </CustomText>
                      );
                    })}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.errorLayout}>
          <CustomText
            variant={'h5'}
            font={'light'}
            fontFamily={'Montserrat'}
            gutterTop={2}
            gutterBottom={0}
            color={'white'}
            align={'center'}
            transform={'none'}>
            No data found
          </CustomText>
        </View>
      )}
      <CardsDetailsModal
        isVisibleModal={isModal}
        item={historyData}
        label={label}
      />
    </View>
  );
}
export default HistoryDetailsBox;
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
    maxHeight: 120,
  },
  errorLayout: {
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'center',
  },
  detailsBox: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3B3C40',
    borderTopLeftRadius: 37,
    borderBottomLeftRadius: 37,
    display: 'flex',
    paddingLeft: 40,
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
    marginTop: 15,
  },
  pictureView: {
    height: 28,
    width: 28,
    borderRadius: 220,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 260,
  },
  expertise: {
    backgroundColor: 'green',
    paddingVertical: 2,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
});
