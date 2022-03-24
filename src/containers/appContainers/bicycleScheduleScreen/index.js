import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import BiCycleDetailsBox from '@components/common/BiCycleDetailsBox';

const height = Dimensions.get('window').height;

function BiCycleScheduleScreen(props) {
  const [month, setMonth] = useState();
  const [loader, setLoader] = useState(false);

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

  const selectedDate = data => {
    setLoader(true);
    let month = moment(data).format('MMMM');
    setMonth(month);
    setLoader(false);
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
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator color={'#888888'} size="large" />
            </View>
          ) : (
            <BiCycleDetailsBox {...props} />
          )}
        </ScrollView>
      </View>
    </ScreenBoiler>
  );
}
export default BiCycleScheduleScreen;
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
  scheduleLayout: {
    backgroundColor: '#242424',
    height: height * 0.8,
  },
});
