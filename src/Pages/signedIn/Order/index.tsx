import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MenuSquareCartContainerOrder from '../../../components/Order/menuContainer';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {MenuItemButton} from '../../../components/Order/MenuItemButton';
import {MenuOrderNavigation} from '../../../navigation/order/types';
import {setFiltersState} from '../../../redux/App/setup.slice';
import {cleanFindNerbayEstablishmentSlice} from '../../../redux/Order/Establishments/getNerbayEstablishments.slice';
import {Textstyles} from '../menupages/contact';

const OrderMenu = () => {
  const {cartItems} = useAppSelector(state => state.ShoppingCart);

  const navigation = useNavigation<MenuOrderNavigation>();
  const animationRotation = useSharedValue(0);
  const {width} = useWindowDimensions();
  const animationSide = useSharedValue(-width);
  const [isExtraButtonRotated, setIsExtraButtonRotated] = useState(false);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${animationRotation.value}deg`, {
            duration: 400,
          }),
        },
      ],
    };
  });
  const animationSideStyle = useAnimatedStyle(() => {
    return {
      right: withTiming(animationSide.value, {duration: 200}),
    };
  });
  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setFiltersState());
      dispatch(cleanFindNerbayEstablishmentSlice());
    }, []),
  );

  const extraMenuRef = useRef(null);

  return (
    <LoggedInBackground withIcons>
      <Animated.View
        ref={extraMenuRef}
        style={[
          {
            width: width,
            position: 'absolute',
            zIndex: 100,
            bottom: 0,
            height: '100%',
          },
          animationSideStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -width : 0;
            setIsExtraButtonRotated(!isExtraButtonRotated);
          }}
          activeOpacity={1}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            padding: 20,
            paddingLeft: width / 2,
            paddingRight: 0,
            paddingBottom: 60,
          }}>
          <MenuItemButton
            haveRedDot={cartItems && cartItems.length > 0 ? true : false}
            title="Shopping cart"
            onPress={() => {
              navigation.navigate('OrderPage', {screen: 'shoppingCart'});
              animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
              animationSide.value = isExtraButtonRotated ? -width : 0;
              setIsExtraButtonRotated(!isExtraButtonRotated);
            }}
          />
        </TouchableOpacity>
      </Animated.View>

      <View
        style={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: '5%',
        }}>
        <Text
          style={[
            Textstyles.text,
            {
              color: '#fff',
              fontSize: 30,
              marginHorizontal: 30,
              textAlign: 'left',
              fontWeight: '700',
            },
          ]}>
          Choose provider type
        </Text>
        <View style={[styles.main]}>
          <View style={styles.rowContainer}>
            <MenuSquareCartContainerOrder
              displayName="Restaurants"
              name="restaurants"
              image={require('../../../assets/utilityIcons/Order/restaurants.png')}
            />
            <MenuSquareCartContainerOrder
              displayName="Foodtrucks"
              name="foodTrucks"
              image={require('../../../assets/utilityIcons/Order/foodtruck.png')}
            />
          </View>
          <View style={styles.rowContainer}>
            <MenuSquareCartContainerOrder
              displayName="Local Cooks"
              name="localCooks"
              image={require('../../../assets/utilityIcons/Order/localcook.png')}
            />
            <MenuSquareCartContainerOrder
              displayName="Shops"
              name="shops"
              image={require('../../../assets/utilityIcons/Order/store.png')}
            />
          </View>
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default OrderMenu;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: '10%',
    alignSelf: 'center',
  },
  rowContainer: {flexDirection: 'row', flex: 1},
});
