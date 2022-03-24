import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {URL} from '@config/apiUrl';
import {getUserAllClasses} from '@store/user/userSlice';
import {popularClass} from '@store/classes/classesSlice';
import {Get} from '@axios/AxiosInterceptorFunction';
import CustomText from '@components/common/CustomText';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import TimeCard from '@components/common/TimeCard';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const slideShow = [
  {
    id: '1',
    image: require('../../../assets/Images/swipeImage.png'),
    text: 'Individual',
    desc: 'Lorem ipsum dolor sit amet, \n consectetur adipiscing elit, sed do ',
    screen: 'GroupPackages',
  },
  {
    id: '2',
    image: require('../../../assets/Images/swipeImage.png'),
    text: 'Group',
    desc: 'Lorem ipsum dolor sit amet,  \n consectetur adipiscing elit, sed do ',
    screen: 'GroupPackages',
  },
  {
    id: '3',
    image: require('../../../assets/Images/swipeImage.png'),
    text: 'Wellness',
    desc: 'Lorem ipsum dolor sit amet,  \n consectetur adipiscing elit, sed do ',
    screen: 'GroupPackages',
  },
];

export default function App(props) {
  const {navigation} = props;
  const disptach = useDispatch();
  const user = useSelector(state => state.user);
  const classes = useSelector(state => state.classes);
  const auth = useSelector(state => state.auth);
  const authToken = auth?.token;

  const [indexItem, setIndexItem] = useState();
  const [loading, setLoading] = useState(false);

  const popularApi = URL('timeTable/trainee/popular-classes');

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  useEffect(() => {
    getPopularClasses();
    fetchUserClasses();
  }, []);

  const viewAll = () => {
    navigation.navigate('Categories');
  };

  const getPopularClasses = async () => {
    setLoading(true);
    const response = await Get(popularApi);
    let popularData = response?.data?.data?.timetable;
    if (response !== undefined) {
      await disptach(popularClass(popularData));
    }
    setLoading(false);
  };

  const fetchUserClasses = async () => {
    const url = URL(`timeTable/trainee/class?status=all`);
    const response = await Get(url, authToken);
    if (response !== undefined) {
      await disptach(getUserAllClasses(response?.data));
    }
  };

  const navigate = page => {
    navigation.navigate(page);
  };

  const generateGreetings = () => {
    var currentHour = moment().format('HH');
    if (currentHour >= 3 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 15) {
      return 'Good Afternoon';
    } else if (currentHour >= 15 && currentHour < 20) {
      return 'Good Evening';
    } else if (currentHour >= 20 && currentHour < 3) {
      return 'Good Night';
    } else {
      return 'Hello';
    }
  };

  let greetingText = generateGreetings();
  // console.log("SLICED ARRAY",classes?.popularClasses?.slice(0,3))

  const _renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <TimeCard item={item} {...props} />
      </View>
    );
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView style={{...styles.container, ...styles.mainLayout}}>
        <CustomText
          variant={'body2'}
          font={'bold'}
          gutterTop={15}
          color={'#888888'}
          align={'left'}
          transform={'capitalize'}>
          {greetingText}
        </CustomText>
        <CustomText
          variant={'h4'}
          font={'bold'}
          gutterTop={10}
          color={'#FFFFFF'}
          align={'left'}
          transform={'capitalize'}>
          {user?.user?.displayName}
        </CustomText>

        <View style={styles.headingLayout}>
          <CustomText
            variant={'body1'}
            font={'bold'}
            color={'#FFFFFF'}
            align={'left'}
            transform={'capitalize'}>
            Popular
          </CustomText>

          <TouchableOpacity>
            <CustomText
              variant={'body4'}
              font={'bold'}
              fontFamily={'Montserrat'}
              color={'#888888'}
              align={'left'}
              style={{padding: 5}}
              transform={'capitalize'}>
              View All
            </CustomText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}>
          {loading ? (
            <ActivityIndicator color="#888888" />
          ) : loading === false && classes?.popularClasses?.length === 0 ? (
            <CustomText
              variant={'body2'}
              font={'italic'}
              color={'white'}
              align={'left'}
              transform={'capitalize'}>
              No data found
            </CustomText>
          ) : (
            <Carousel
              layout={'default'}
              data={classes?.popularClasses}
              sliderWidth={370}
              itemWidth={200}
              firstItem={1}
              renderItem={_renderItem}
              removeClippedSubviews={false}
              onSnapToItem={index => setIndexItem(index)}
            />
          )}
        </View>

        <View style={styles.headingLayout}>
          <CustomText
            variant={'body1'}
            font={'bold'}
            color={'white'}
            align={'left'}
            transform={'capitalize'}>
            Categories
          </CustomText>

          <TouchableOpacity onPress={viewAll}>
            <CustomText
              variant={'body4'}
              font={'bold'}
              fontFamily={'Montserrat'}
              color={'#888888'}
              align={'left'}
              style={{padding: 5}}
              transform={'capitalize'}>
              View All
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={{height: 200, width: '100%'}}>
          <Swiper
            showsButtons={true}
            loop={true}
            showsPagination={false}
            autoplay={false}
            nextButton={
              <Entypo name="triangle-right" color={'white'} size={30} />
            }
            prevButton={
              <Entypo name="triangle-left" color={'white'} size={30} />
            }>
            {slideShow.map((item, index) => (
              <TouchableOpacity
                style={styles.swiperView}
                key={index}
                onPress={() => navigate(item?.screen)}>
                <ImageBackground
                  source={item.image}
                  resizeMode="cover"
                  imageStyle={{borderRadius: 20}}
                  style={styles.swipeImage}>
                  <View style={styles.backgroundImageLayout}>
                    <CustomText
                      variant={'body2'}
                      font={'bold'}
                      gutterTop={10}
                      color={'white'}
                      align={'left'}
                      transform={'capitalize'}>
                      {item.text}
                    </CustomText>
                    <CustomText
                      variant={'body5'}
                      font={'bold'}
                      gutterTop={4}
                      color={'white'}
                      align={'left'}
                      transform={'capitalize'}>
                      {item.desc}
                    </CustomText>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  mainLayout: {
    paddingHorizontal: 10,
  },
  headingLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  swiperView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: 200,
  },
  backgroundImageLayout: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    width: '101%',
    borderRadius: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  swipeImage: {
    width: width * 0.65,
    height: height * 0.17,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
