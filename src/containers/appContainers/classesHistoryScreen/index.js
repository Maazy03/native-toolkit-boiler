import React, {useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';
import {classesHistory, refreshList} from '@store/user/userSlice';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CustomText from '@components/common/CustomText';
import DataMap from '@components/common/DataMap';

const height = Dimensions.get('window').height;

function ClassesHistoryScreen(props) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const headerProps = {
    isHeader: false,
    isSubHeader: true,
    mainHeading: 'Schedule',
    subHeading: 'History',
    isRightIcon: false,
  };
  const filteryObject = [
    {name: 'UpComing', id: 0, status: 'upcoming'},
    {name: 'Attended', id: 1, status: 'attended'},
    {name: 'Cancelled', id: 2, status: 'cancel'},
  ];

  useEffect(() => {
    fetchDataFirstTime();
    dispatch(refreshList(false));
  }, [isFocused, user?.refList]);

  const authToken = auth?.token;
  const [isLoading, setIsLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const fetchDataFirstTime = async () => {
    setIsLoading(true);
    const url = URL(`timeTable/trainee/class?status=upcoming`);
    const response = await Get(url, authToken);
    if (response !== undefined) {
      const dataObj = {
        ...response?.data,
        flag: 'upcoming',
      };
      dispatch(classesHistory(dataObj));
    }
    setIsLoading(false);
  };

  const fetchData = async data => {
    setTabIndex(data?.id);
    setIsLoading(true);
    if (data?.id === 0) {
      const url = URL(`timeTable/trainee/class`);
      const response = await Get(url, authToken);
      if (response !== undefined) {
        const dataObj = {
          ...response?.data,
          flag: data.status,
        };
        dispatch(classesHistory(dataObj));
      }
    } else {
      const url = URL(`timeTable/trainee/class?status=${data.status}`);
      const response = await Get(url, authToken);
      if (response !== undefined) {
        const dataObj = {
          ...response?.data,
          flag: data.status,
        };
        dispatch(classesHistory(dataObj));
      }
    }
    setIsLoading(false);
  };

  let historyData;

  if (tabIndex === 0) {
    historyData = user?.classUpcomingHistory?.data;
  } else if (tabIndex === 1) {
    historyData = user?.classAttendedHistory?.data;
  } else {
    historyData = user?.classCancelledHistory?.data;
  }

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={{...styles.container, ...styles.mainLayout}}>
        <View style={styles.tabBar}>
          {filteryObject?.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => fetchData(item)}>
                <View
                  style={{
                    ...styles.textBox,
                    backgroundColor:
                      tabIndex === item?.id ? '#28292D' : 'black',
                  }}>
                  <CustomText
                    variant={'body4'}
                    font={'light'}
                    gutterTop={1}
                    color={'white'}
                    align={'center'}
                    style={{padding: 10}}
                    transform={'none'}>
                    {item?.name}
                  </CustomText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView
          style={styles.scheduleLayout}
          contentContainerStyle={{paddingBottom: 20}}>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator color={'#888888'} size="large" />
            </View>
          ) : (
            <>
              {tabIndex === 0 ? (
                <DataMap data={historyData} label={'upcoming'} />
              ) : tabIndex === 1 ? (
                <DataMap data={historyData} label={'attended'} />
              ) : tabIndex === 2 ? (
                <DataMap data={historyData} label={'cancelled'} />
              ) : null}
            </>
          )}
        </ScrollView>
      </View>
    </ScreenBoiler>
  );
}
export default ClassesHistoryScreen;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mainLayout: {
    paddingHorizontal: 10,
  },
  loader: {
    justifyContent: 'center',
    height: height * 0.6,
  },
  scheduleLayout: {
    backgroundColor: '#242424',
    height: height * 0.8,
  },
  tabBar: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 10,
  },
  textBox: {
    borderRadius: 100,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
