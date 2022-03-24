import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';
import {Post, Patch} from '@axios/AxiosInterceptorFunction';
import {updateUser} from '@store/user/userSlice';
import {getUserCards} from '@store/user/userSlice';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CustomText from '@components/common/CustomText';
import CustomButton from '@components/common/CustomButton';
import AddCardsModal from '@components/view/modal/AddCardsModal';
import Loader from '@components/common/Loader';
import Toast from '@components/utils/Toast';

const height = Dimensions.get('window').height;

function CardsScreen(props) {
  const {route, navigation} = props;
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const authToken = auth?.userToken;
  const getCardsURL = URL('users/payment-methods');
  const removeCardUrl = URL('users/detach-payment-methods');
  const purchasePackageUrl = URL('users/trainee/create-subscription');
  const Header = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };
  const headerProps = {
    isHeader: true,
    isSubHeader: true,
    // mainHeading: 'Cards',
    subHeading: 'Cards',
  };

  const [selected, setSelected] = useState(true);
  const [selectPmId, setSelectPmId] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setIsLoader] = useState(false);
  const planId = route.params.planId;
  const type = route.params.type;

  useEffect(() => {
    getCards();
  }, []);

  const deleteCard = async id => {
    setIsLoading(true);
    const data = {
      pmId: id,
    };
    const response = await Post(removeCardUrl, data);
    if (response !== undefined) {
      dispatch(getUserCards(response?.data));
      Toast.show({
        title: 'Sucess',
        message: 'Card Removed Successfully',
        type: 'success',
      });
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const getCards = async () => {
    setIsLoading(true);
    const response = await Get(getCardsURL, authToken);
    if (response !== undefined) {
      dispatch(getUserCards(response?.data));
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const selectCard = index => {
    setSelected(!selected);
    setSelectPmId(index);
  };

  const purchasePlan = async () => {
    setIsLoader(true);
    const data = {
      paymentMethodId: selectPmId,
      planId: planId,
      type: type,
    };
    const response = await Patch(purchasePackageUrl, data, Header);
    if (response !== undefined) {
      const updatedUser = response?.data?.data;
      dispatch(updateUser(updatedUser));
      Toast.show({
        title: 'Sucess',
        message:
          'Package subscribed. Now you can reserve classes and much more',
        type: 'success',
      });
      navigation.navigate('GroupPackages');
      setIsLoader(false);
    }
    setIsLoader(false);
  };

  const openModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <ScreenBoiler headerProps={headerProps} {...props}>
        <ScrollView
          nestedScrollEnabled={true}
          bounces={false}
          // contentContainerStyle={{paddingBottom: 180}}
          style={styles.container}>
          <View style={styles.mainLayout}>
            <View style={styles.addView}>
              <CustomText
                variant={'h4'}
                font={'light'}
                color={'white'}
                align={'left'}
                transform={'capitalize'}>
                Saved Cards
              </CustomText>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3B3C40',
                  padding: 10,
                  borderRadius: 120,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                }}
                onPress={openModal}>
                <Fontisto name="plus-a" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <View style={styles.errorLayout}>
                <Loader />
              </View>
            ) : isLoading === false && user?.userCards?.data.length === 0 ? (
              <View style={styles.errorLayout}>
                <CustomText
                  variant={'h5'}
                  font={'light'}
                  color={'#707070'}
                  align={'center'}
                  transform={'capitalize'}>
                  No Saved Cards
                </CustomText>
              </View>
            ) : (
              <View style={styles.cardsView}>
                <View>
                  {user?.userCards?.data?.map((item, index) => {
                    return (
                      <View style={styles.cardRow} key={index}>
                        <TouchableOpacity
                          style={
                            selectPmId == item.id
                              ? styles.selected
                              : styles.unselected
                          }
                          onPress={() => selectCard(item.id)}
                        />
                        <FontAwesome
                          name={
                            item?.card?.brand === 'visa'
                              ? 'cc-visa'
                              : item?.card?.brand === 'mastercard'
                              ? 'cc-mastercard'
                              : item?.card?.brand === 'discover'
                              ? 'cc-discover'
                              : item?.card?.brand === 'jcb'
                              ? 'cc-jcb'
                              : 'credit-card-alt'
                          }
                          size={20}
                        />
                        <View style={{flex: 1}}>
                          <CustomText
                            variant={'h5'}
                            font={'light'}
                            gutterTop={15}
                            gutterBottom={10}
                            color={'white'}
                            align={'left'}
                            numberOfLines={1}
                            ellipsis="tail"
                            style={{marginLeft: 20}}
                            transform={'none'}>
                            **** **** **** {item?.card?.last4}
                          </CustomText>
                        </View>
                        <TouchableOpacity
                          onPress={() => deleteCard(item.id)}
                          style={{padding: 10}}>
                          <FontAwesome5 name="trash-alt" size={20} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            <View>
              {selectPmId?.length > 0 && (
                <CustomButton
                  value={'Purchase'}
                  bgColor={'#707070'}
                  width={'65%'}
                  size={'lg'}
                  height={80}
                  loader={loader}
                  color={'white'}
                  borderRadius={100}
                  borderColor={'black'}
                  onPress={purchasePlan}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <AddCardsModal
          isVisibleModal={isModal}
          refreshList={() => getCards()}
        />
      </ScreenBoiler>
    </>
  );
}
export default CardsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  mainLayout: {
    display: 'flex',
    flexDirection: 'column',
    height: height * 0.8,
  },
  addView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardsView: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardRow: {
    backgroundColor: '#3B3C40',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  errorLayout: {
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'center',
  },
  unselected: {
    backgroundColor: '#0C0C0C',
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: 'white',
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 4,
  },
});
