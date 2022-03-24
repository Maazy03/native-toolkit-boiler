import {StyleSheet, View, Dimensions, Image} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
const height = Dimensions.get('window').height;

const Cards = props => {
  const {navigation, data} = props;
  const user = useSelector(state => state.user);
  const navigateCards = () => {
    navigation.navigate('Cards', {
      type: data?.productType,
      planId: data?._id,
    });
  };

  return (
    <>
      <View style={{marginBottom: 20}}>
        <Image
          source={require('../../assets/Images/back.png')}
          resizeMode={'contain'}
          style={styles.image}
        />

        <View style={styles.layoutContainer}>
          <View style={styles.cardHeader}>
            <CustomText
              color={'#363636'}
              font={'bold'}
              variant={'largeTitle'}
              fontFamily={'Montserrat'}
              gutterTop={20}
              transform={'capitalize'}>
              ${data?.price}
            </CustomText>
            <CustomText
              color={'#363636'}
              variant={'h6'}
              fontFamily={'Montserrat'}
              transform={'capitalize'}>
              {data?.isRecurring && 'Monthly'}
            </CustomText>
            {user?.user?.subscriptionType[0] == 'group' && (
              <View>
                <CustomText
                  variant={'body2'}
                  font={'light'}
                  fontFamily={'Montserrat'}
                  gutterTop={5}
                  color={'green'}
                  align={'center'}
                  transform={'capitalize'}>
                  Already Subscribed
                </CustomText>
              </View>
            )}
          </View>

          <View style={styles.bodyCard}>
            <CustomText color={'#888888'} font={'bold'}>
              Overview:
            </CustomText>
            <View style={styles.bodycontent}>
              <View style={styles.content}>
                {data?.description.map(item => {
                  return (
                    <>
                      <View style={{flexDirection: 'row'}}>
                        <Icon name="dot-single" style={styles.dot} />
                        <CustomText style={styles.listText}>
                          {item?.description}
                        </CustomText>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>
            {user?.user?.subscriptionType[0] !== 'group' && (
              <View>
                <CustomButton
                  value={'Buy Now'}
                  bgColor={'black'}
                  width={'65%'}
                  size={'md'}
                  height={50}
                  color={'white'}
                  borderRadius={100}
                  borderColor={'black'}
                  gutterTop={10}
                  onPress={navigateCards}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default Cards;

const styles = StyleSheet.create({
  layoutContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height,
  },

  dot: {
    fontSize: 22,
    color: '#888888',
  },
  empty: {
    fontSize: 14,
    color: '#888888',
  },
  content: {
    flexDirection: 'column',
    paddingVertical: 5,
  },
  bodyCard: {
    top: height * 0.15,
    paddingHorizontal: 20,
  },
  cardHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodycontent: {
    width: '90%',
    alignSelf: 'center',
  },

  listText: {
    color: '#888888',
  },
});
