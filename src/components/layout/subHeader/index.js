import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomText from '../../common/CustomText';

const width = Dimensions.get('window').width;

function SubHeaderComponent(props) {
  const {navigation, headerProps} = props;

  const {mainHeading, subHeading, isRightIcon = false} = headerProps;
  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FontAwesome5
        name="arrow-left"
        color={'white'}
        size={25}
        onPress={back}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginRight: isRightIcon ? 0 : 15,
        }}>
        {mainHeading && (
          <CustomText
            variant={'body3'}
            font={'light'}
            gutterTop={5}
            color={'#707070'}
            align={'left'}
            transform={'capitalize'}>
            {mainHeading}
          </CustomText>
        )}
        {subHeading && (
          <CustomText
            variant={'h2'}
            font={'bold'}
            fontFamily={'Montserrat'}
            color={'white'}
            align={'left'}
            transform={'capitalize'}>
            {subHeading}
          </CustomText>
        )}
      </View>
      {isRightIcon && (
        <FontAwesome5 name="calendar-alt" color={'white'} size={20} />
      )}
    </View>
  );
}
export default SubHeaderComponent;

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
});
