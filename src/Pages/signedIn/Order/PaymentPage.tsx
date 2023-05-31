import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  IOrderNavigation,
  IPaymentPageStackProps,
} from '../../../navigation/order/types';
import {ScrollView} from 'react-native-gesture-handler';
import SingleOrderItem from '../../../components/Order/ShoppingCart/SingleOrderItem';
import SubmitButton from '../../../components/touchables/SubmitButton';
import OnOfButton from '../../../components/Order/ShoppingCart/OnOfButton';
import {instance} from '../../../redux/interceptors';
import {useStripe, ApplePayButton} from '@stripe/stripe-react-native';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {deleteShoppingListsByIndex} from '../../../redux/Order/shoppingCart.slice';
import {AddNewOrder} from '../../../redux/Order/Order/UserPlaceOrder.thunk';
import {IGetAddress} from '../../../redux/Profile/types';
import {addressType, initialAddress} from '../../../redux/Auth/AuthTypes';
import {fetchPaymentSheetParams} from '../../../utils/payment/fetchPaymentSheet';
import {
  addAddressToMyProfile,
  getMyProfile,
} from '../../../redux/Profile/core/profileCore.thunk';
import Spinner from 'react-native-spinkit';
import {Textstyles} from '../menupages/contact';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import AddressCreate from './addressCreate';
import {cleanUpMyProfileAddress} from '../../../redux/Profile/profileCore.slice';
import ScrollContainer from '../../../components/ScrollContainer';
import {getTokensKeychain} from '../../../utils/localStorage';
import {IRequestOrderItem} from '../../../redux/Order/Order/types';

const deliveryImage = require('../../../assets/utilityIcons/isDelivery.png');
const pickupImage = require('../../../assets/utilityIcons/isTakeAway.png');

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const atoken = useAppSelector(state => state.login.data?.access_token);
  const addressFromDb = useAppSelector(state => state.profile.data?.address);
  const {message} = useAppSelector(state => state.profile);
  const {params} = useRoute<IPaymentPageStackProps>();
  const orderItems = params.items;
  const orderWhere = params.orderWhere;
  const totalItems = params.total;
  const navigation = useNavigation<IOrderNavigation>();
  let currency = '';

  const orderitemsids = orderItems?.map(item => {
    return item.index;
  });
  const totalCosts = orderItems?.reduce((accumulator, currentValue) => {
    currency = currentValue.item.currency;
    return accumulator + parseFloat(currentValue.item.price);
  }, 0);
  const [isSplitCosts, setIsSplitCosts] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<IGetAddress | null>(
    null,
  );
  useEffect(() => {
    if (addressFromDb) {
      const firstofTheList = addressFromDb[0];
      setSelectedAddress(firstofTheList);
    }
  }, [addressFromDb]);
  useEffect(() => {
    if (!addressFromDb) {
      dispatch(getMyProfile());
    }
    if (addressFromDb && message === 'Succesfully added new address') {
      setIsAddressOpen(false);
      setNewAddress(initialAddress);
      dispatch(cleanUpMyProfileAddress());
      setTimeout(() => {
        const firstofTheList = addressFromDb[addressFromDb.length - 1];
        setSelectedAddress(firstofTheList);
      }, 100);
    }
  }, [addressFromDb, message]);

  //#region
  const {
    initPaymentSheet,
    presentPaymentSheet,
    isApplePaySupported,
    presentApplePay,
  } = useStripe();

  const [totalPriceArray, setTotalPriceArray] = useState<
    {
      totalAmount: number;
      itemId: string;
    }[]
  >([]);

  const [isLoadingSheet, setisLoadingSheet] = useState(false);

  const initializePaymentSheet = async () => {
    setisLoadingSheet(true);
    if (atoken) {
      const {paymentIntent, ephemeralKey, customer} =
        await fetchPaymentSheetParams({
          totalItems: totalItems,
          atoken: atoken,
          orderWhere: orderWhere,
        });
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Blink fix.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: false,
      });

      if (!error) {
        setisLoadingSheet(false);
      } else {
        Alert.alert('Payment error', error.message);
        setisLoadingSheet(false);
      }
    }
  };

  const openPaymentSheet = async () => {
    // see belocw
    if (selectedAddress) {
      const {error} = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
        // @ts-ignore
        const fixedOrderItems: IRequestOrderItem[] = orderItems.map(
          orderitem => {
            return {
              itemId: orderitem.item,
              changes: orderitem.changes,
            };
          },
        );

        dispatch(
          AddNewOrder({
            orderItems: fixedOrderItems,
            orderWhere,
            address: isPickup === true ? null : selectedAddress,
            isPickup: isPickup,
          }),
        );
        dispatch(deleteShoppingListsByIndex(orderitemsids));
        navigation.goBack();
      }
    } else {
      Alert.alert('Validation error', 'Missing address details');
    }
  };

  useEffect(() => {
    if (totalItems && initialAddress) initializePaymentSheet();
  }, [totalItems]);

  const pay = async () => {
    if (!isApplePaySupported) return;
    // ...
    const {error} = await presentApplePay({
      cartItems: orderItems?.map(item => {
        return {
          label: ` ${item.item.dishName}`,
          amount: totalCosts.toFixed(2),
          paymentType: 'Immediate',
        };
      }),
      country: 'US',
      currency: 'GBP',
    });
    if (error) {
      // handle error
    }
    // ...
  };

  //#endregion

  // #region animation for address
  const height = useSharedValue(0);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {duration: 200}),
    };
  });

  const [newAddress, setNewAddress] = useState<addressType>(initialAddress);
  useEffect(() => {
    if (isAddressOpen) {
      height.value = 400;
    } else {
      height.value = 0;
    }
  }, [isAddressOpen]);

  const [isPickup, setIsPickup] = useState(false);
  useEffect(() => {}, [isPickup]);

  // #endregion
  return (
    <LoggedInBackground withoutBottom>
      {isLoadingSheet ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner color="#ea3651" type="Circle" />
        </View>
      ) : (
        <View style={{height: '100%'}}>
          <Text style={[Textstyles.text, Textstyles.title]}>
            Your products:
          </Text>
          <ScrollView
            style={{width: '100%'}}
            keyboardShouldPersistTaps={'always'}>
            {orderItems?.map((item, index) => {
              return (
                <SingleOrderItem
                  index={index}
                  item={item}
                  key={item.index}
                  setTotalPrice={setTotalPriceArray}
                  totalPrice={totalPriceArray}
                />
              );
            })}
            <>
              <SubmitButton
                onPress={() => {
                  navigation.navigate('shoppingCart');
                }}
                title={'Edit Order'}
                style={{paddingVertical: 8, marginTop: 10}}
              />
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginVertical: 20,
                  marginHorizontal: 30,
                }}>
                <Text style={[TextStyles.defaultText, {fontSize: 16}]}>
                  Total cost: {currency} {totalItems.toFixed(2)}
                </Text>
                <Text style={[TextStyles.defaultText, {fontSize: 16}]}>
                  Tax included: {currency} {(totalItems * 0.23).toFixed(2)}
                </Text>
              </View>
            </>
            <IsPickupButtons isPickup={isPickup} setIsPickup={setIsPickup} />

            {!isPickup && (
              <>
                {addressFromDb && (
                  <>
                    <Text style={[Textstyles.text, Textstyles.title]}>
                      You can choose one of your saved addresses or type one by
                      hand.
                    </Text>
                    <ScrollContainer>
                      <ScrollView
                        style={{height: 300}}
                        contentContainerStyle={{width: '100%'}}>
                        {addressFromDb?.map(singleAddress => (
                          <TouchableOpacity
                            style={{
                              marginVertical: 2,
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                              backgroundColor:
                                selectedAddress?._id === singleAddress._id
                                  ? '#00000015'
                                  : '#ffffff15',
                              borderRadius: 5,
                            }}
                            key={singleAddress._id}
                            onPress={() => {
                              setSelectedAddress(singleAddress);
                            }}>
                            <Text style={{color: '#fff'}}>
                              {singleAddress.city} {singleAddress.street}{' '}
                              {singleAddress.buildingnumber}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </ScrollContainer>
                  </>
                )}
                <SubmitButton
                  style={{marginVertical: 10}}
                  title="Type address by hand"
                  onPress={() => {
                    setIsAddressOpen(!isAddressOpen);
                  }}
                />
              </>
            )}

            <Animated.View
              style={[
                {
                  width: '100%',
                  zIndex: 999,
                  top: 0,
                  bottom: 0,
                  height: height.value,
                },
                animatedStyles,
              ]}>
              <AddressCreate
                address={newAddress}
                setAddress={setNewAddress}
                onPress={() => {
                  dispatch(addAddressToMyProfile(newAddress));
                }}
              />
            </Animated.View>
            <View style={{flexDirection: 'row', padding: 30}}>
              <OnOfButton
                isOpen={isSplitCosts}
                onPress={() => {
                  if (isSplitCosts) {
                    setIsSplitCosts(!isSplitCosts);
                  } else {
                    setIsSplitCosts(isSplitCosts);
                  }
                }}>
                <Image
                  style={{width: '100%', height: '100%', aspectRatio: 1}}
                  source={require('../../../assets/utilityIcons/payment.png')}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'Handlee-Regular',
                    marginTop: 10,
                  }}>
                  Pay now
                </Text>
              </OnOfButton>
              <OnOfButton
                isOpen={!isSplitCosts}
                onPress={() => {
                  if (!isSplitCosts) {
                    setIsSplitCosts(!isSplitCosts);
                  } else {
                    setIsSplitCosts(!isSplitCosts);
                  }
                }}>
                <Image
                  style={{width: '100%', height: '100%', aspectRatio: 1}}
                  source={require('../../../assets/utilityIcons/payTogether.png')}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'Handlee-Regular',
                    marginTop: 10,
                  }}>
                  Split costs
                </Text>
              </OnOfButton>
            </View>
            {!isSplitCosts && (
              <>
                {isApplePaySupported && (
                  <ApplePayButton
                    onPress={pay}
                    type="plain"
                    buttonStyle="black"
                    borderRadius={4}
                    style={{
                      width: '100%',
                      height: 50,
                    }}
                  />
                )}
                <SubmitButton
                  onPress={openPaymentSheet}
                  title={'Pay with card'}
                  style={{width: '100%', alignItems: 'center', marginTop: 10}}
                />
              </>
            )}
            {isSplitCosts && <></>}
          </ScrollView>
        </View>
      )}
    </LoggedInBackground>
  );
};

export default PaymentPage;

export const TextStyles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Handlee-Regular',
    color: '#fff',
    fontSize: 18,
  },
});
function IsPickupButtons({
  isPickup,
  setIsPickup,
}: {
  isPickup: boolean;
  setIsPickup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 50}}>
      <View
        style={{
          flex: 1,
          backgroundColor: isPickup ? '#00000015' : '#00000055',
          height: 120,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsPickup(false);
          }}>
          <Image source={deliveryImage} style={{width: 100, height: 100}} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: !isPickup ? '#00000015' : '#00000035',
          height: 120,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsPickup(true);
          }}>
          <Image source={pickupImage} style={{width: 100, height: 100}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
