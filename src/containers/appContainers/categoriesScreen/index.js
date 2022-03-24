import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import Wellness from '@assets/Images/Svgs/wellness';
import Individual from '@assets/Images/Svgs/individual';
import Group from '@assets/Images/Svgs/group';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CustomText from '@components/common/CustomText';

const width = Dimensions.get('window').width;

function Categories(props) {
  const {navigation} = props;

  const headerProps = {
    isHeader: true,
    isSubHeader: true,
    subHeading: 'Categories',
  };

  const OnSubmit = () => {
    navigation.navigate('GroupPackages');
  };
  const individual = () => {
    navigation.navigate('IndividualPackages');
  };
  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        nestedScrollEnabled={true}
        style={{height: 920}}
        bounces={false}>
        <View style={styles.container}>
          <View style={styles.categoryContainer}>
            <View style={styles.wellness}>
              <View style={styles.innerContent}>
                <View style={{flexDirection: 'row'}}>
                  <Wellness />
                  <CustomText
                    fontSize={24}
                    font={'bold'}
                    transform={'capitalize'}
                    style={{paddingHorizontal: 10}}>
                    Wellness
                  </CustomText>
                </View>
                <TouchableOpacity activeOpacity={0.6}>
                  <Icon name="arrowright" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <View style={styles.wellness}>
              <View style={styles.innerContent}>
                <View style={{flexDirection: 'row'}}>
                  <Group />

                  <CustomText
                    fontSize={24}
                    font={'bold'}
                    transform={'capitalize'}
                    style={{paddingHorizontal: 10}}>
                    Individual
                  </CustomText>
                </View>
                <TouchableOpacity onPress={individual}>
                  <Icon
                    name="arrowright"
                    type="AntDesign"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <View style={styles.wellness}>
              <View style={styles.innerContent}>
                <View style={{flexDirection: 'row'}}>
                  <Individual />

                  <CustomText
                    fontSize={24}
                    font={'bold'}
                    transform={'capitalize'}
                    style={{paddingHorizontal: 10}}>
                    Group
                  </CustomText>
                </View>
                <TouchableOpacity onPress={OnSubmit}>
                  <Icon
                    name="arrowright"
                    type="AntDesign"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: 'black',
    marginBottom: 20,
    marginTop: 30,
  },
  categoryContainer: {
    marginTop: 22,
  },
  wellness: {
    width: '80%',
    backgroundColor: '#707070',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    alignContent: 'center',
    width: width * 0.9,
  },
  innerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  icon: {
    color: '#fff',
    fontSize: moderateScale(24, 0.2),
  },
});
