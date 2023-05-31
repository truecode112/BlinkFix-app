import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AddressSelector from '../../../components/Order/AddressSelector';
import {GeolocationResponse} from '@react-native-community/geolocation';
import Spinner from 'react-native-spinkit';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import EstablishmentsView from '../../../components/Order/EstablishmentsView';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MenuItemButton} from '../../../components/Order/MenuItemButton';
import {WEBCONST} from '../../../constants/webConstants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getMyProfile} from '../../../redux/Profile/core/profileCore.thunk';
import RenderMarker from '../../../components/Order/RenderMarker';
import {GetNerbayEstablishment} from '../../../redux/Order/Establishments/getNerbayEstablishments.thunk';
import {IEstablishment} from '../../../redux/Profile/types';
import FastCheckoutEstablishment from '../../../components/Order/FastCheckoutEstablishment';
import {MenuOrderNavigation} from '../../../navigation/order/types';

Geolocation.setRNConfiguration({skipPermissionRequests: false});

export interface coordinatesType {
  coords: {
    accuracy?: number;
    altitude?: number;
    altitudeAccuracy?: number;
    heading?: number;
    latitude: number;
    longitude: number;
    speed?: number;
  };
  mocked?: boolean;
  timestamp?: number;
}

const Restaurants = () => {
  const {cartItems} = useAppSelector(state => state.ShoppingCart);
  const navigation = useNavigation<MenuOrderNavigation>();

  const dispatch = useAppDispatch();
  const animationRotation = useSharedValue(0);
  const {width} = useWindowDimensions();
  const animationSide = useSharedValue(-200);
  const animationRestaurantPanelSide = useSharedValue(-width);
  const [isExtraButtonRotated, setIsExtraButtonRotated] = useState(false);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: withTiming(`${animationRotation.value}deg`, {duration: 400})},
      ],
    };
  });
  const animationSideStyle = useAnimatedStyle(() => {
    return {
      right: withTiming(animationSide.value, {duration: 200}),
    };
  });

  const RestaurantPanelStyle = useAnimatedStyle(() => {
    return {
      right: withTiming(animationRestaurantPanelSide.value, {duration: 200}),
    };
  });
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyProfile());
    }, []),
  );

  const [restaurantToDisplayInMenu, setRestaurantToDisplayInMenu] =
    useState<IEstablishment | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userInfo = useAppSelector(state => state.profile.data);
  const [addressState, setAddressState] = useState<string>('');
  const [coordinates, setCoordinates] = useState<GeolocationResponse | null>({
    coords: {
      latitude: 50.0433682,
      longitude: 19.8822381,
      accuracy: 1,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: new Date().valueOf(),
  });

  const ref = useRef(null);

  useEffect(() => {
    if (!restaurantToDisplayInMenu) {
      animationRestaurantPanelSide.value = -width;
    } else {
      if (ref.current)
        //@ts-ignore
        ref.current.animateToRegion(
          {
            longitude: restaurantToDisplayInMenu.location?.coordinates[0],
            latitude: restaurantToDisplayInMenu.location?.coordinates[1],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000,
        );
      animationRestaurantPanelSide.value = 0;
    }
  }, [restaurantToDisplayInMenu]);
  const {height} = useWindowDimensions();

  const [isMapRedy, setIsMapRedy] = useState<boolean>(false);

  useEffect(() => {
    if (ref)
      //@ts-ignore
      ref.current.animateToRegion(
        {
          longitude: coordinates?.coords.longitude,
          latitude: coordinates?.coords.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
  }, [coordinates]);

  const extraMenuRef = useRef(null);
  const {data} = useAppSelector(state => state.findNerbayEstablishment);
  const filters = useAppSelector(state => state.App.orderFilters);

  useFocusEffect(
    React.useCallback(() => {
      if (!filters)
        dispatch(GetNerbayEstablishment({type: 'localCook', isHalal: false}));
    }, []),
  );

  return (
    <LoggedInBackground
      disabledScroll
      stickyButton={() => (
        <TouchableOpacity
          onPress={() => {
            animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -200 : 0;
            setIsExtraButtonRotated(!isExtraButtonRotated);
            setRestaurantToDisplayInMenu(null);
          }}
          style={{
            height: '100%',
            backgroundColor: '#4d4d4d',
            padding: 2,
            justifyContent: 'center',
          }}>
          {cartItems && cartItems.length > 0 && (
            <View
              style={{
                backgroundColor: '#EA3651',
                width: 10,
                height: 10,
                borderRadius: 10,
                top: 10,
                right: 5,
                position: 'absolute',
              }}></View>
          )}
          <Animated.Image
            style={[{alignSelf: 'center', margin: 2}, animationStyle]}
            source={require('../../../assets/utilityIcons/3dots.png')}
          />
        </TouchableOpacity>
      )}>
      {/* SIDEMENU */}
      <Animated.View
        ref={extraMenuRef}
        style={[
          {
            width: 200,
            position: 'absolute',
            zIndex: 100,
            bottom: 60,
          },
          animationSideStyle,
        ]}>
        <MenuItemButton
          title="Extra filters"
          onPress={() => {
            animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -200 : 0;
            setIsExtraButtonRotated(!isExtraButtonRotated);
            navigation.navigate('OrderPage', {screen: 'filterEstablishment'});
          }}
        />
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
      </Animated.View>

      {/* M */}
      <Animated.View
        ref={extraMenuRef}
        style={[
          {
            marginTop: 5,
            width: '100%',
            position: 'absolute',
            flex: 1,
            zIndex: 102,
            bottom: 0,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          },
          RestaurantPanelStyle,
        ]}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setRestaurantToDisplayInMenu(null)}></TouchableOpacity>
        <View style={{height: '70%'}}>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={require('../../../assets/background.png')}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 10,
            }}
            activeOpacity={1}
            onPress={() => {
              setRestaurantToDisplayInMenu(null);
            }}>
            <Image
              style={{width: 30, height: 30, alignSelf: 'flex-end'}}
              source={require('../../../assets/utilityIcons/close.png')}
            />
          </TouchableOpacity>
          {restaurantToDisplayInMenu && (
            <FastCheckoutEstablishment
              establishment={restaurantToDisplayInMenu}
            />
          )}
        </View>
      </Animated.View>
      <ScrollView
        style={{
          width: '100%',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
        }}
        horizontal
        scrollEnabled={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            flexGrow: 1,
            flex: 1,
            minHeight: height - 200,
          }}>
          <AddressSelector
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            addressState={addressState}
            setAddressState={setAddressState}
            openMap={() => setIsOpen(true)}
          />
          <>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: isMapRedy ? 'none' : 'flex',
                bottom: 0,
              }}>
              <Spinner
                isVisible={!isMapRedy}
                size={100}
                type={'ThreeBounce'}
                color={'#EA3651'}
              />
            </View>
          </>
          <MapView
            onResponderMove={() => setIsOpen(true)}
            ref={ref}
            provider={PROVIDER_GOOGLE}
            onMarkerPress={e => {
              setIsOpen(false);
              //@ts-ignore
              ref.current.animateToRegion(
                {
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitude: e.nativeEvent.coordinate.latitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                },
                1000,
              );
            }}
            onPress={val => {
              if (val.nativeEvent.action !== 'marker-press') {
                setIsOpen(true);
                const {latitude, longitude} = val.nativeEvent.coordinate;
                if (coordinates)
                  setCoordinates({
                    ...coordinates,
                    coords: {...coordinates.coords, latitude, longitude},
                  });
                else {
                  setCoordinates({
                    timestamp: new Date().valueOf(),
                    coords: {
                      latitude,
                      longitude,
                      altitude: null,
                      altitudeAccuracy: null,
                      heading: null,
                      speed: null,
                      accuracy: 1,
                    },
                  });
                }
              }
            }}
            onMapLoaded={() => {
              setIsMapRedy(true);
            }}
            style={{
              width: '100%',
              marginTop: 10,
              marginBottom: 5,
              opacity: isMapRedy ? 1 : 0,
              borderRadius: 10,
              flex: 1,
            }}
            initialRegion={{
              latitude: coordinates ? coordinates.coords.latitude : 0,

              longitude: coordinates ? coordinates.coords.longitude : 0,
              latitudeDelta: 0.1,
              longitudeDelta: 0.0421,
            }}>
            {data?.map(establishment => {
              return (
                <RenderMarker
                  setEstablishmentToDisplayInMenu={setRestaurantToDisplayInMenu}
                  establishment={establishment}
                  key={establishment._id}
                  location={establishment.location}
                  image={`${WEBCONST().STORAGEURLNEW}${
                    establishment.owner?.images?.profileImage?.path
                  }`}
                />
              );
            })}
            <RenderMarker
              YourCoordinates={coordinates}
              image={`${WEBCONST().STORAGEURLNEW}${
                userInfo?.images?.profileImage?.path
              }`}
            />
          </MapView>

          <EstablishmentsView
            type="localCook"
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            isOpen={isOpen}
            setIsOpen={(establishment?: IEstablishment) => {
                            setIsOpen(!isOpen);

            }}
          />
        </View>
      </ScrollView>
    </LoggedInBackground>
  );
};

export default Restaurants;

const styles = StyleSheet.create({});
