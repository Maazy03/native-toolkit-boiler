import CustomButton from '@components/common/CustomButton';
import CustomText from '@components/common/CustomText';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {URL} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import Toast from '@components/utils/Toast';
import {refreshList} from '@store/user/userSlice';

function CardsDetailsModal(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const authToken = auth?.userToken;
  const cancelSlotUrl = URL('timeTable/trainee/cancel/slot/');

  const Header = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [loader, setLoader] = useState(false);

  const {item, label} = props;

  let trainerPhoto =
    'https://lac-fitness-backend.herokuapp.com/api/images/' +
    item?.trainer?.photo;
  const startTime = moment(item?.startTime).utc().format('hh:mm A');
  const endTime = moment(item?.endTime).utc().format('hh:mm A');
  const date = moment(item?.startTime).format('D MMMM YYYY');

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const cancel = async () => {
    setLoader(true);
    const url = cancelSlotUrl + `${item?._id}`;
    const response = await Patch(url, Header);
    if (response !== undefined) {
      Toast.show({
        title: 'Sucess',
        message: response?.data?.message,
        type: 'success',
      });
      dispatch(refreshList(true));
      setIsBlur(false);
    }
    setLoader(false);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      // visible={true}
      onRequestClose={() => setIsBlur(false)}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <CustomText
              variant={'h2'}
              font={'bold'}
              gutterTop={25}
              gutterBottom={30}
              color={'white'}
              align={'center'}
              transform={'none'}>
              Class Details
            </CustomText>

            <View style={{alignItems: 'center'}}>
              {item?.trainer?.photo === undefined ? (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  source={require('@assets/Images/profilePic.jpg')}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  source={{uri: trainerPhoto}}
                />
              )}
            </View>

            <CustomText
              variant={'h5'}
              font={'bold'}
              gutterTop={15}
              gutterBottom={10}
              color={'white'}
              align={'center'}
              numberOfLines={1}
              ellipsis="tail"
              transform={'uppercase'}>
              {item?.trainer?.firstName + item?.trainer?.lastName}
            </CustomText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="book" size={20} color={'white'} />
              <CustomText
                variant={'h5'}
                font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                numberOfLines={1}
                ellipsis="tail"
                style={{marginLeft: 20}}
                transform={'none'}>
                {item?.catType?.name} ~{item?.catType?.type}
              </CustomText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons name="book" size={20} color={'white'} />
              <CustomText
                variant={'h5'}
                font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                numberOfLines={2}
                ellipsis="tail"
                style={{marginLeft: 20}}
                transform={'none'}>
                {item?.catType?.description}
              </CustomText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="calendar-sharp" size={20} color={'white'} />
              <CustomText
                variant={'h5'}
                font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                style={{marginLeft: 20}}
                transform={'none'}>
                {startTime + ' - ' + endTime}
              </CustomText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="time" size={20} color={'white'} />
              <CustomText
                variant={'h5'}
                font={'light'}
                gutterTop={15}
                gutterBottom={10}
                color={'white'}
                align={'left'}
                style={{marginLeft: 20}}
                transform={'none'}>
                {date}
              </CustomText>
            </View>
            {label === 'upcoming' && (
              <CustomButton
                value="Cancel Class"
                bgColor={'#888888'}
                width={'70%'}
                size={'lg'}
                color={'white'}
                font={'bold'}
                variant={'h6'}
                borderRadius={100}
                gutterTop={20}
                borderColor={'white'}
                loaderColor={'black'}
                borderWidth={1}
                loader={loader}
                onPress={cancel}
              />
            )}
          </View>
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorToast: {
    backgroundColor: '#87adbd',
    marginBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: '#888888',
  },
  modalView: {
    backgroundColor: '#3B3C40',
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 20,
  },
});

export default CardsDetailsModal;
