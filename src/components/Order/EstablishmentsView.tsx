import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {GetNerbayEstablishment} from '../../redux/Order/Establishments/getNerbayEstablishments.thunk';
import SingleEstablishmentComponent from './SingleEstablishmentComponent';
import {GeolocationResponse} from '@react-native-community/geolocation';
import {IEstablishment} from '../../redux/Profile/types';

const EstablishmentsView = ({
  isOpen,
  setIsOpen,
  coordinates,
  setCoordinates,
  type,
}: {
  coordinates: GeolocationResponse | null;
  isOpen: boolean;
  setIsOpen: (establishment?: IEstablishment) => void;
  setCoordinates: React.Dispatch<
    React.SetStateAction<GeolocationResponse | null>
  >;
  type: 'shop' | 'restaurant' | 'foodtruck' | 'localCook';
  establishments?: IEstablishment[];
}) => {
  const animationHeight = useSharedValue(10);
  const animationRotatey = useSharedValue(180);
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const {data, isLoading} = useAppSelector(
    state => state.findNerbayEstablishment,
  );

  const [establishmentList, setEstablishmentList] =
    useState<IEstablishment[]>();

  useEffect(() => {
    if (data) {
      setEstablishmentList(data);
    }
  }, [data]);

  const filters = useAppSelector(state => state.App.orderFilters);

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(animationHeight.value, {duration: 300}),
    };
  });
  useEffect(() => {
    animationHeight.value = isOpen ? 20 : height / 2;
    animationRotatey.value = isOpen ? 180 : 0;
  }, [isOpen]);
  const animationRotateyStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateX: withTiming(`${animationRotatey.value}deg`, {duration: 200})},
      ],
    };
  });

  useEffect(() => {
    if (filters) {
      if (filters.lang && filters.lat && coordinates) {
        setCoordinates({
          ...coordinates,
          timestamp: new Date().getTime(),
          coords: {
            ...coordinates.coords,
            latitude: parseFloat(filters.lat),
            longitude: parseFloat(filters.lang),
          },
        });
      }
      dispatch(GetNerbayEstablishment({...filters, type: type}));
    } else {
      dispatch(GetNerbayEstablishment({type: type}));
    }
  }, [filters]);

  return (
    <Animated.View style={[{}, animationStyle]}>
      <TouchableOpacity
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={() => {
          animationHeight.value = isOpen ? 20 : height / 2;
          animationRotatey.value = isOpen ? 180 : 0;
          setIsOpen();
        }}>
        <Animated.Image
          style={[
            {height: 15, resizeMode: 'contain', marginBottom: 10},
            animationRotateyStyle,
          ]}
          source={require('../../assets/utilityIcons/arrowDown.png')}
        />
      </TouchableOpacity>
      <ScrollView style={{flex: 1}}>
        {establishmentList &&
          establishmentList.map(establishment => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={establishment._id}
                onPress={() => {
                  setIsOpen(establishment);
                }}>
                <SingleEstablishmentComponent
                  coordinates={coordinates}
                  establishment={establishment}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </Animated.View>
  );
};

export default EstablishmentsView;

const styles = StyleSheet.create({});
