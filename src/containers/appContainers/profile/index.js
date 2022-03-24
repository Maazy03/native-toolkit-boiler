import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CustomText from '@components/common/CustomText';
import CustomButton from '@components/common/CustomButton';

const width = Dimensions.get('window').width;

function Profile(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);
  const headerProps = {
    isHeader: false,
    isSubHeader: true,
    subHeading: 'Settings',
  };

  const navigateEdit = () => {
    navigation.navigate('EditProfile');
  };
  let userPhoto =
    'https://lac-fitness-backend.herokuapp.com/api/images/' + user?.user?.photo;

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        style={{...styles.container, ...styles.mainLayout}}
        contentContainerStyle={{alignItems: 'center',paddingBottom:40}}>
        <CustomText
          variant={'h4'}
          font={'light'}
          color={'#888888'}
          align={'center'}
          gutterTop={50}
          gutterBottom={10}
          numberOfLines={1}
          ellipsizeMode="tail"
          transform={'capitalize'}>
          Profile
        </CustomText>
        <View style={styles.profilePictureLayout}>
          {userPhoto ? (
            <Image
              resizeMode="cover"
              style={styles.profileimage}
              imageStyle={{borderRadius: 120}}
              source={{uri: userPhoto}}
            />
          ) : (
            <Image
              resizeMode="cover"
              style={styles.profileimage}
              source={require('@assets/Images/profilePic.jpg')}
            />
          )}
        </View>
        <View style={styles.boxLayout}>
          <View style={styles.rowLayout}>
            <Entypo
              name="user"
              color={'#ABABAB'}
              size={25}
              style={{justifyContent: 'center', marginLeft: 2}}
            />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'white'}
              align={'left'}
              style={{marginLeft: 10, maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'capitalize'}>
              {user?.user?.firstName + ' ' + user?.user?.lastName}
            </CustomText>
          </View>
          <View style={styles.rowLayout}>
            <FontAwesome name="envelope-o" color={'#ABABAB'} size={25} />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'white'}
              align={'left'}
              style={{marginLeft: 10, maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'capitalize'}>
              {user?.user?.email}
            </CustomText>
          </View>
          <View style={styles.rowLayout}>
            <FontAwesome name="phone" color={'#ABABAB'} size={25} />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'white'}
              align={'left'}
              style={{marginLeft: 15, maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'capitalize'}>
              {user?.user?.contact}
            </CustomText>
          </View>
          <View style={styles.rowLayout}>
            <FontAwesome name="address-card" color={'#ABABAB'} size={25} />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'white'}
              align={'left'}
              style={{marginLeft: 10, maxWidth: '87%'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              transform={'capitalize'}>
              {user?.user?.address ? user?.user?.address : 'Enter address...'}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.rowLayout,
              borderBottomWidth: 0,
            }}>
            <Entypo name="location-pin" color={'#ABABAB'} size={30} />
            <CustomText
              variant={'body2'}
              font={'light'}
              color={'white'}
              align={'left'}
              style={{marginLeft: 10, maxWidth: '87%'}}
              transform={'capitalize'}>
              {user?.user?.city}
            </CustomText>
          </View>
        </View>
        <View style={styles.buttonLayout}>
          <CustomButton
            value="Edit"
            bgColor={'#888888'}
            width={'40%'}
            size={'xmd'}
            height={50}
            gutterTop={20}
            color={'white'}
            borderRadius={100}
            borderColor={'#000000'}
            loaderColor={'black'}
            onPress={navigateEdit}
          />
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default Profile;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  mainLayout: {
    paddingHorizontal: 10,
  },
  boxLayout: {
    backgroundColor: '#3B3C40',
    borderWidth: 1,
    width: width * 0.8,
    borderRadius: 15,
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    height: 60,
  },
  buttonLayout: {
    width: width * 0.8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profilePictureLayout: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    height: 150,
    width: 150,
    borderRadius: 120,
  },
  profileimage: {
    height: 150,
    width: 150,
    borderRadius: 200,
  },
});
