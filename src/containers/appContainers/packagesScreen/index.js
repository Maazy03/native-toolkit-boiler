import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import CustomText from '@components/common/CustomText';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CustomButton from '@components/common/CustomButton';
const width = Dimensions.get('window').width;
const data = [
  {
    id: '1',
    price: '75',
    packageType: 'Standard',
    days: '3 Days of the week',
    trainer: 'Professional Trainer',
    body: 'Bodybuilding',
    hand: 'Free Hand',
    fitness: 'Fitness & Boxing',
  },
  {
    id: 2,
    price: '75',
    packageType: 'Starter',
    days: '3 Days of the week',
    trainer: 'Professional Trainer',
    body: 'Bodybuilding',
    hand: 'Free Hand',
    fitness: 'Fitness & Boxing',
  },
  {
    id: 3,
    price: '75',
    packageType: 'Starter',
    days: '3 Days of the week',
    trainer: 'Professional Trainer',
    body: 'Bodybuilding',
    hand: 'Free Hand',
    fitness: 'Fitness & Boxing',
  },
];

function Package(props) {
  const headerProps = {
    isHeader: true,
    isSubHeader: true,
    mainHeading: 'Pricing',
    subHeading: 'Packages',
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        nestedScrollEnabled={true}
        style={{height:920}}
        bounces={false}>
        <View style={styles.container}>
          {data.map((val, index) => {
            let colorText = val.id % 2 === 1 ? 'white' : 'black';
            return (
              <View
                style={
                  val.id % 2 === 1
                    ? styles.standardPackageLayout
                    : styles.starterPackageLayout
                }
                key={index}>
                <View
                  style={
                    val.id % 2 === 1
                      ? styles.standardPackageHeading
                      : styles.starterPackageHeading
                  }>
                  <CustomText
                    variant={'h4'}
                    font={'bold'}
                    gutterTop={5}
                    gutterBottom={0}
                    color={colorText}
                    align={'left'}
                    transform={'none'}>
                    ${val.price}
                  </CustomText>

                  <CustomText
                    variant={'h4'}
                    font={'light'}
                    gutterTop={5}
                    gutterBottom={0}
                    color={colorText}
                    align={'left'}
                    transform={'none'}>
                    {val.packageType}
                  </CustomText>
                </View>

                <CustomText
                  variant={'h5'}
                  font={'light'}
                  gutterTop={5}
                  gutterBottom={10}
                  color={colorText}
                  align={'left'}
                  transform={'none'}>
                  {val.days}
                </CustomText>
                <View
                  style={{...styles.underLine, borderBottomColor: colorText}}
                />

                <CustomText
                  variant={'h5'}
                  font={'light'}
                  gutterTop={15}
                  gutterBottom={10}
                  color={colorText}
                  align={'left'}
                  transform={'none'}>
                  {val.trainer}
                </CustomText>
                <View
                  style={{...styles.underLine, borderBottomColor: colorText}}
                />

                <CustomText
                  variant={'h5'}
                  font={'light'}
                  gutterTop={15}
                  gutterBottom={10}
                  color={colorText}
                  align={'left'}
                  transform={'none'}>
                  {val.body}
                </CustomText>
                <View
                  style={{...styles.underLine, borderBottomColor: colorText}}
                />

                <CustomText
                  variant={'h5'}
                  font={'light'}
                  gutterTop={15}
                  gutterBottom={10}
                  color={colorText}
                  align={'left'}
                  transform={'none'}>
                  {val.hand}
                </CustomText>
                <View
                  style={{...styles.underLine, borderBottomColor: colorText}}
                />

                <CustomText
                  variant={'h5'}
                  font={'light'}
                  gutterTop={15}
                  gutterBottom={10}
                  color={colorText}
                  align={'left'}
                  transform={'none'}>
                  {val.fitness}
                </CustomText>
                <View
                  style={{...styles.underLine, borderBottomColor: colorText}}
                />
                <CustomButton
                  value="Signup Now"
                  bgColor={'black'}
                  width={'60%'}
                  size={'xmd'}
                  height={90}
                  color={'white'}
                  borderRadius={10}
                  gutterTop={40}
                  gutterBottom={30}
                  borderColor={'#000000'}
                  loaderColor={'black'}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default Package;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom:20
  },
  standardPackageLayout: {
    width: width * 0.7,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 90,
    backgroundColor: '#888888',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  starterPackageLayout: {
    width: width * 0.7,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
  },
  standardPackageHeading: {
    width: 140,
    height:140,
    borderRadius: 290,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888888',
    bottom: 70,
  },
  starterPackageHeading: {
    width: 140,
    height:140,
    borderRadius: 290,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    bottom: 70,
  },
  underLine: {
    borderBottomWidth: 1,
    width: '90%',
  },
});
