import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import { getClasses, getSingleClass,saveDate} from '@store/classes/classesSlice';
import DataMap from '@components/common/DataMap';

const height = Dimensions.get('window').height;

function BookClasses(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const classes = useSelector(state => state.classes);
  const authToken = auth?.userToken;
  const [month, setMonth] = useState();
  const [isLoading, setIsLoading] = useState(false);

  var check = moment(new Date());
  var monthT = check.format('MMMM');
  let subHeadingText = !month ? monthT : month;

  const headerProps = {
    isHeader: false,
    isSubHeader: true,
    mainHeading: 'Schedule',
    subHeading: subHeadingText,
    isRightIcon: true,
  };

  useEffect(() => {
    fetchDataFirstTime();
  }, []);

  const selectedDate = async data => {
    setIsLoading(true);
    let month = moment(data).format('MMMM');
    setMonth(month);
    let date = moment(data).format('M-DD-YYYY');
    const dataAction = {
      date,
      authToken: authToken,
    };
    await dispatch(getSingleClass(dataAction));
    await dispatch(saveDate(date));
    setIsLoading(false);
  };

  const fetchDataFirstTime = async () => {
    setIsLoading(true);
    let date = moment(new Date()).format('M-DD-YYYY');
    const url = URL(`timeTable/trainee/single?date=${date}`);
    const response = await Get(url, authToken);
    if (response !== undefined) {
      dispatch(getClasses(response?.data?.data));
    }
    setIsLoading(false);
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={{...styles.container, ...styles.mainLayout}}>
        <View style={{width: '100%'}}>
          <CalendarStrip
            style={styles.calendarStrip}
            scrollable={true}
            onDateSelected={selectedDate}
            showMonth={false}
            minDate={moment().subtract(0, 'days')}
            useIsoWeekday={false}
            selectedDate={new Date()}
            iconContainer={{display: 'none'}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            highlightDateNumberStyle={{color: 'white'}}
            highlightDateNameStyle={{color: 'white'}}
            daySelectionAnimation={{
              type: 'background',
              duration: 200,
              highlightColor: '#888888',
            }}
          />
        </View>
        <ScrollView style={styles.scheduleLayout}>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator color={'#888888'} size="large" />
            </View>
          ) : (
            <DataMap data={classes?.classesData?.timetable} {...props} />
          )}
        </ScrollView>
      </View>
    </ScreenBoiler>
  );
}
export default BookClasses;
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
  calendarStrip: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  loader: {
    justifyContent: 'center',
    height: height * 0.6,
  },
  errorLayout: {
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'center',
  },
  scheduleLayout: {
    backgroundColor: '#242424',
    height: height * 0.8,
  },
});
