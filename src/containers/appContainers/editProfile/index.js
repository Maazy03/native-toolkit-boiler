import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {URL, apiHeader} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import {updateUser} from '@store/user/userSlice';
import CustomButton from '@components/common/CustomButton';
import CustomText from '@components/common/CustomText';
import TextInputWithTitle from '@components/common/TextInputWithTitle';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Toast from '@components/utils/Toast';

const width = Dimensions.get('window').width;

function EditProfile(props) {
  const {navigation} = props;
  const headerProps = {
    isHeader: true,
    isSubHeader: true,
    subHeading: 'Profile',
  };
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const updateURL = URL('users/updateMe');
  const Header = apiHeader(false, true);

  const [cityError, setCityError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [picture, setPicture] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    city: '',
    address: '',
    pictureTest: '',
    photo: '',
  });

  useEffect(() => {
    setProfile({
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      contactNo: user?.user?.contact,
      city: user?.user?.city,
      address: user?.user?.address,
      photo:
        'https://lac-fitness-backend.herokuapp.com/api/images/' +
        user?.user?.photo,
    });
  }, [props.navigation, isFocused]);

  let firstNameDefault = profile?.firstName;
  let lastNameDefault = profile?.lastName;
  let contactNoDefault = profile?.contactNo;
  let cityStateDefault = profile?.city;
  let addressDefault = profile?.address;
  let photoDefault =
    'https://lac-fitness-backend.herokuapp.com/api/images/' + profile?.photo;

  const uploadImage = async () => {
    try {
      let pickerResult;
      pickerResult = await ImagePicker.openPicker({mediaType: 'photo'});
      if (pickerResult) {
        if (
          pickerResult.path.includes('.jpeg') ||
          pickerResult.path.includes('.jpg') ||
          pickerResult.path.includes('.png') ||
          pickerResult.path.includes('.JPG') ||
          pickerResult.path.includes('.PNG') ||
          pickerResult.path.includes('.JPEG') ||
          pickerResult.path.includes('.HEIC')
        ) {
          setProfile({...profile, photo: pickerResult.path});
          setPicture(pickerResult);
        } else {
          Toast.show({
            title: 'Picture Error',
            message: 'Image path is wrong',
            type: 'danger',
          });
        }
      }
    } catch (error) {
      Toast.show({
        title: 'Picture Error',
        message: 'Image not uploaded',
        type: 'danger',
      });
    }
  };

  const formData = () => {
    var formData = new FormData();

    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('contact', profile.contactNo);
    formData.append('address', profile.address);
    formData.append('city', profile.city);
    if (picture !== undefined) {
      formData.append('photo', {
        uri: profile?.photo,
        type: picture.mime,
        name: new Date() + '_image',
      });
    }
    return formData;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (profile?.firstName == undefined || profile?.firstName?.length == 0) {
      setFirstNameError(true);
      setIsLoading(false);
    }
    if (profile?.lastName == undefined || profile?.lastName?.length == 0) {
      setLastNameError(true);
      setIsLoading(false);
    }
    if (profile?.contactNo == undefined || profile?.contactNo?.length == 0) {
      setContactNumberError(true);
      setIsLoading(false);
    }
    if (profile?.city == undefined || profile?.city?.length == 0) {
      setCityError(true);
      setIsLoading(false);
    }
    if (profile?.address == undefined || profile?.address?.length == 0) {
      setAddressError(true);
      setIsLoading(false);
    } else if (
      profile.firstName &&
      profile.lastName &&
      profile.address &&
      profile.city &&
      profile.contactNo
    ) {
      try {
        const userData = await formData();
        const response = await Patch(updateURL, userData, Header);
        const user = response?.data?.data?.user;
        dispatch(updateUser(user));
        Toast.show({
          title: 'Hurrah!',
          message: 'Profile Updated Successfully',
          type: 'success',
        });
        setIsLoading(false);
        navigation.navigate('Profile');
      } catch (error) {
        Toast.show({
          title: 'Ooops!',
          message: 'Profile Not Updated',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView nestedScrollEnabled={true} bounces={false}>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            style={styles.buttonLayout}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'flex-end'}}>
            <View style={styles.profilePictureLayout}>
              {profile?.photo === undefined ? (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  imageStyle={{borderRadius: 120}}
                  source={{uri: photoDefault}}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  style={styles.profileImage}
                  imageStyle={{borderRadius: 120}}
                  source={{uri: profile.photo}}
                />
              )}
            </View>
            <TouchableOpacity onPress={uploadImage}>
              <Ionicons name="camera-sharp" style={styles.uploadIcon} />
            </TouchableOpacity>
            <CustomText
              variant={'h5'}
              font={'light'}
              gutterTop={0}
              gutterBottom={30}
              color={'white'}
              align={'center'}
              transform={'capitalize'}>
              Upload Image
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <TextInputWithTitle
                secureText={false}
                placeholder={'Enter FirstName'}
                onChangeText={text => {
                  setProfile({...profile, firstName: text});
                }}
                defaultValue={firstNameDefault}
                height={50}
                inputWidth={0.35}
                width={0.45}
                gutterTop={0}
                gutterBottom={20}
                borderColor={'#707070'}
                borderWidth={2}
                borderBottomWidth={2}
                inputContainerStyles={{borderRadius: 5}}
                formErrorText={'Empty Field'}
                formError={firstNameError}
              />
              <TextInputWithTitle
                secureText={false}
                placeholder={'Enter LastName'}
                onChangeText={text => {
                  setProfile({...profile, lastName: text});
                }}
                defaultValue={lastNameDefault}
                height={50}
                inputWidth={0.4}
                width={0.45}
                gutterTop={0}
                gutterBottom={20}
                borderColor={'#707070'}
                borderWidth={2}
                borderBottomWidth={2}
                inputContainerStyles={{borderRadius: 5}}
                formErrorText={'Empty Field'}
                formError={lastNameError}
              />
            </View>
            <TextInputWithTitle
              secureText={false}
              placeholder={'Enter Contact Number'}
              onChangeText={text => {
                setProfile({...profile, contactNo: text});
              }}
              defaultValue={contactNoDefault}
              height={50}
              width={0.95}
              gutterTop={0}
              gutterBottom={20}
              borderColor={'#707070'}
              borderWidth={2}
              borderBottomWidth={2}
              inputContainerStyles={{borderRadius: 5}}
              formError={contactNumberError}
              formErrorText={'Empty Field'}
            />

            <TextInputWithTitle
              secureText={false}
              placeholder={'Enter Street Address'}
              onChangeText={text => {
                setProfile({...profile, address: text});
              }}
              defaultValue={addressDefault}
              width={0.95}
              gutterTop={0}
              gutterBottom={20}
              borderColor={'#707070'}
              borderWidth={2}
              borderBottomWidth={2}
              inputContainerStyles={{borderRadius: 5}}
              formError={addressError}
              formErrorText={'Empty Field'}
            />
            <TextInputWithTitle
              secureText={false}
              placeholder={'Enter city'}
              onChangeText={text => {
                setProfile({...profile, city: text});
              }}
              defaultValue={cityStateDefault}
              height={50}
              width={0.95}
              gutterTop={0}
              gutterBottom={20}
              borderColor={'#707070'}
              borderWidth={2}
              borderBottomWidth={2}
              inputContainerStyles={{borderRadius: 5}}
              formError={cityError}
              formErrorText={'Empty Field'}
            />
            <CustomButton
              value="Save Changes"
              bgColor={'#707070'}
              width={'95%'}
              size={'xmd'}
              height={50}
              color={'white'}
              borderRadius={100}
              borderColor={'#707070'}
              btnWrapperStyles={{marginRight: 10}}
              loader={isLoading}
              onPress={onSubmit}
              loaderColor={'white'}
              borderWidth={1.2}
            />
          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonLayout: {
    width: '100%',

    marginBottom: 0,
    flexGrow: 0,
    overflow: 'scroll',
    paddingBottom: 20,
    paddingHorizontal: 17,
  },
  imageLayout: {
    position: 'absolute',
    top: 20,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    marginLeft: 15,
  },
  profilePictureLayout: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: -15,
  },
  textLayout: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: 48,
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    marginLeft: 10,
    borderRadius: 120,
  },
  uploadIcon: {
    color: 'white',
    alignSelf: 'center',
    bottom: 10,
    fontSize: 22,
    left: 30,
    backgroundColor: '#707070',
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 100,
    padding: 4,
  },
});
