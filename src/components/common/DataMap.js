import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CustomText from '@components/common/CustomText';
import HistoryDetailsBox from '@components/common/HistoryDetailsBox';
import DetailsBox from './DetailsBox';
import {useSelector} from 'react-redux';

const height = Dimensions.get('window').height;

function DataMap(props) {
  const {data, label} = props;
  const user = useSelector(state => state.user);

  return (
    <View style={{paddingBottom: 70}}>
      {data && data?.length === 0 ? (
        <View style={styles.errorLayout}>
          <CustomText
            variant={'h5'}
            font={'light'}
            fontFamily={'Montserrat'}
            gutterTop={2}
            gutterBottom={0}
            color={'white'}
            align={'center'}
            transform={'none'}>
            No class present
          </CustomText>
        </View>
      ) : (
        data &&
        data?.length &&
        data?.map((item, index) => {
          const idPresent =
            item && item?.trainee?.some(x => x.includes(user?.user?._id));
          return (
            <>
              {label ? (
                <HistoryDetailsBox
                  label={label}
                  historyData={item}
                  key={index}
                  {...props}
                />
              ) : (
                <DetailsBox
                  classData={item}
                  key={index}
                  {...props}
                  idPresent={idPresent}
                />
              )}
            </>
          );
        })
      )}
    </View>
  );
}

export default DataMap;

const styles = StyleSheet.create({
  errorLayout: {
    height: height * 0.6,
    justifyContent: 'center',
  },
});
