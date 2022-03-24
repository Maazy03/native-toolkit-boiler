import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Cards from '@components/common/Cards';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';

function IndividualPackages(props) {
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
        style={{height: 920}}
        bounces={false}>
        <View style={styles.container}>
          <Cards
            price={'$80'}
            Overview={'Overview'}
            occuring={'Re-occuring'}
            Unlimited={'Unlimited'}
          />
          <Cards
            price={'$80'}
            Overview={'Overview'}
            occuring={'Re-occuring'}
            Unlimited={'Unlimited'}
          />
          <Cards
            price={'$80'}
            Overview={'Overview'}
            occuring={'Re-occuring'}
            Unlimited={'Unlimited'}
          />
          <Cards
            price={'$80'}
            Overview={'Overview'}
            occuring={'Re-occuring'}
            Unlimited={'Unlimited'}
          />
          <Cards
            price={'$80'}
            Overview={'Overview'}
            occuring={'Re-occuring'}
            Unlimited={'Unlimited'}
          />
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default IndividualPackages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
});
