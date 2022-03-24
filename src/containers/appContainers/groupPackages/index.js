import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';
import {allPlans} from '@store/plans/planSlice';
import Cards from '@components/common/Cards';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Loader from '@components/common/Loader';
import CustomText from '@components/common/CustomText';

function GroupPackages(props) {
  const headerProps = {
    isHeader: true,
    isSubHeader: true,
    mainHeading: 'Pricing',
    subHeading: 'Packages',
  };
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const authToken = auth?.token;
  const plansURL = URL('users/plans?mobile=true');
  const [isLoading, setIsLoading] = useState(false);
  const [plansData, setPlansData] = useState([]);
  const dispatch = useDispatch();
  const onPlansData = async () => {
    setIsLoading(true);
    const response = await Get(plansURL, authToken);
    if (response !== undefined) {
      dispatch(allPlans(response?.data?.data));
      setPlansData(response?.data?.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    onPlansData();
  }, []);

  return (
    <>
      <ScreenBoiler headerProps={headerProps} {...props}>
        {isLoading ? (
          <Loader />
        ) : (
          <ScrollView nestedScrollEnabled={true} bounces={false}>
            <View style={styles.container}>
              {plansData?.map((item, index) => {
                const subPresent = item._id === user?.user?.group?.product;
                return (
                  <View key={index}>
                    {plansData ? (
                      <Cards data={item} {...props} isSubscribed={subPresent} />
                    ) : (
                      <CustomText color={'white'} align={'center'}>
                        Data Not Available
                      </CustomText>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </ScreenBoiler>
    </>
  );
}
export default GroupPackages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
});
