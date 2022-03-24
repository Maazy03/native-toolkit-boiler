import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import CustomText from '../../common/CustomText';
import {logOut} from '../../../store/auth/authSlice';
import CustomButton from '../../common/CustomButton';

const height = Dimensions.get('window').height;

const CustomDrawer = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  let picture =
    'https://lac-fitness-backend.herokuapp.com/api/images/' + user?.user?.photo;

  const navigateProfile = () => {
    navigation.navigate('Profile');
  };


  const toggleDrawer = () => {
    // DrawerActions.toggleDrawer()
    // navigation?.toggleDrawer();
    // navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const switchScreen = route => {
    navigation.navigate(route);
  };

  const logOutFunction = () => {
    dispatch(logOut());
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationLayout}>
        {/* <FontAwesome5
          name="arrow-left"
          color={'white'}
          size={25}
          style={{padding: 20, width: '30%'}}
          onPress={toggleDrawer}
        /> */}
        <View style={styles.bioView}>
          <TouchableOpacity
            style={styles.pictureView}
            onPress={navigateProfile}>
            {picture === undefined ? (
              <Image
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: 120}}
                source={require('../../../assets/Images/profile.jpg')}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={styles.profileImage}
                imageStyle={{borderRadius: 120}}
                source={{uri: picture}}
              />
            )}
          </TouchableOpacity>
          <View style={styles.nameView}>
            <CustomText
              variant={'body1'}
              font={'bold'}
              fontFamily={'Montserrat'}
              color={'white'}
              align={'left'}
              transform={'capitalize'}>
              {user?.user?.displayName}
            </CustomText>
            <TouchableOpacity onPress={navigateProfile}>
              <CustomText
                variant={'body4'}
                font={'bold'}
                color={'#888888'}
                align={'left'}
                fontFamily={'Montserrat'}
                transform={'capitalize'}>
                View Profile
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? '#888888' : 'white'},
            {width: '100%'},
            {marginTop: 10},
          ]}
          onPress={() => {
            switchScreen('HomeScreen');
          }}>
          {({pressed}) => (
            <CustomText
              variant={'body3'}
              font={'bold'}
              fontFamily={'Montserrat'}
              gutterTop={0}
              color={pressed ? 'white' : '#888888'}
              align={'left'}
              transform={'capitalize'}
              style={{paddingVertical: 15, paddingHorizontal: 15}}>
              Home
            </CustomText>
          )}
        </Pressable>
      </View>

      {/* {user?.userAllClasses?.results > 0 && ( */}
      <View>
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? '#888888' : 'white'},
            {width: '100%'},
            {marginTop: 10},
          ]}
          onPress={() => {
            switchScreen('Classes');
          }}>
          {({pressed}) => (
            <CustomText
              variant={'body3'}
              font={'bold'}
              fontFamily={'Montserrat'}
              gutterTop={0}
              color={pressed ? 'white' : '#888888'}
              align={'left'}
              transform={'capitalize'}
              style={{paddingVertical: 15, paddingHorizontal: 15}}>
              My Classes
            </CustomText>
          )}
        </Pressable>
      </View>
      {/* )} */}

      <View>
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? '#888888' : 'white'},
            {width: '100%'},
            {marginTop: 10},
          ]}
          onPress={() => {
            switchScreen('Categories');
          }}>
          {({pressed}) => (
            <CustomText
              variant={'body3'}
              font={'bold'}
              fontFamily={'Montserrat'}
              gutterTop={0}
              color={pressed ? 'white' : '#888888'}
              align={'left'}
              transform={'capitalize'}
              style={{paddingVertical: 15, paddingHorizontal: 15}}>
              Packages
            </CustomText>
          )}
        </Pressable>
      </View>
      <View>
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? '#888888' : 'white'},
            {width: '100%'},
            {marginTop: 10},
          ]}
          onPress={() => {
            switchScreen('Contact');
          }}>
          {({pressed}) => (
            <CustomText
              variant={'body3'}
              font={'bold'}
              fontFamily={'Montserrat'}
              gutterTop={0}
              color={pressed ? 'white' : '#888888'}
              align={'left'}
              transform={'capitalize'}
              style={{paddingVertical: 15, paddingHorizontal: 15}}>
              Contact Us
            </CustomText>
          )}
        </Pressable>
      </View>
      <View>
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? '#888888' : 'white'},
            {width: '100%'},
            {marginTop: 10},
          ]}
          onPress={() => {
            switchScreen('Bicycle');
          }}>
          {({pressed}) => (
            <CustomText
              variant={'body3'}
              font={'bold'}
              fontFamily={'Montserrat'}
              gutterTop={0}
              color={pressed ? 'white' : '#888888'}
              align={'left'}
              transform={'capitalize'}
              style={{paddingVertical: 15, paddingHorizontal: 15}}>
              BiCycle
            </CustomText>
          )}
        </Pressable>
      </View>

      {/* <View >
        {navigationObject?.map((item, index) => {
          return (
            <Pressable
              style={({pressed}) => [
                {backgroundColor: pressed ? '#888888' : 'white'},
                {width: '100%'},
                {marginTop: 10},
              ]}
              key={index}
              onPress={() => {
                switchScreen(item?.route);
              }}>
              {({pressed}) => (
                <CustomText
                  variant={'body3'}
                  font={'bold'}
                  fontFamily={'Montserrat'}
                  gutterTop={0}
                  color={pressed ? 'white' : '#888888'}
                  align={'left'}
                  transform={'capitalize'}
                  style={{paddingVertical: 15, paddingHorizontal: 15}}>
                  {item?.name}
                </CustomText>
              )}
            </Pressable>
          );
        })}
      </View> */}

      <CustomButton
        value="Logout"
        bgColor={'#888888'}
        width={'90%'}
        size={'xmd'}
        height={50}
        gutterTop={40}
        color={'white'}
        borderRadius={100}
        btnWrapperStyles={{
          paddingHorizontal: 90,
        }}
        onPress={logOutFunction}
      />
    </View>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#3B3C40',
    borderTopLeftRadius: 30,
  },
  navigationLayout: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  bioView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20
  },
  pictureView: {
    height: 70,
    width: 70,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 200,
  },
  nameView: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  itemNormal: {
    backgroundColor: 'white',
    width: '100%',
  },
  itemPress: {
    backgroundColor: '#888888',
    width: '100%',
    color: 'red',
  },
});
