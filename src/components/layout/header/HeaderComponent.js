import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import LogoHeader from '../../../assets/Images/Svgs/LogoHeader.svg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function HeaderComponent(props) {
  const {navigation} = props;
  const user = useSelector(state => state.user);

  let picture =
    'https://lac-fitness-backend.herokuapp.com/api/images/' + user?.user?.photo;

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <LogoHeader />
      <TouchableOpacity onPress={toggleDrawer} style={styles.rightView}>
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
    </View>
  );
}
export default HeaderComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    width: width * 0.9,
    marginTop: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.18,
    height: height * 0.035,
  },
  profileImage: {
    width: 55,
    height: 55,
    marginLeft: 10,
    borderRadius: 55,
  },
});
