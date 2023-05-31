import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropShadow from 'react-native-drop-shadow';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY_PLACES} from '../../../enviroments';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setFiltersState} from '../../redux/App/setup.slice';

const AddressSelector = ({
  addressState,
  setAddressState,
  coordinates,
  setCoordinates,
  openMap,
}: {
  addressState?: string;
  setAddressState?: React.Dispatch<React.SetStateAction<string>>;
  coordinates: GeolocationResponse | null;
  setCoordinates: React.Dispatch<
    React.SetStateAction<GeolocationResponse | null>
  >;
  openMap?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.App.orderFilters);

  useEffect(() => {}, [filters]);

  useEffect(() => {
    if (coordinates) {
      setAddressState &&
        setAddressState(
          `${coordinates.coords.latitude}  ${coordinates.coords.longitude}`,
        );
    }
  }, [coordinates, filters]);
  return (
    <DropShadow
      style={{
        shadowColor: 'rgba(0, 0, 0,0.4)',
        shadowOffset: {
          width: -2,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
        borderRadius: 5,
        inset: 12,
        backgroundColor: '#00000015',
        marginVertical: 10,
      }}>
      <ScrollView
        horizontal
        scrollEnabled={false}
        style={{width: '100%'}}
        contentContainerStyle={{width: '100%'}}>
        <GooglePlacesAutocomplete
          renderLeftButton={() => (
            <TouchableOpacity
              onPress={() => {
                Geolocation.getCurrentPosition(info => {
                  setCoordinates(info);
                  if (filters) {
                    dispatch(
                      setFiltersState({
                        ...filters,
                        lat: info.coords.latitude.toString(),
                        lang: info.coords.longitude.toString(),
                      }),
                    );
                  } else {
                    dispatch(
                      setFiltersState({
                        lat: info.coords.latitude.toString(),
                        lang: info.coords.longitude.toString(),
                      }),
                    );
                  }
                });
                openMap && openMap();
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#00000065',
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/utilityIcons/pin.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          )}
          styles={{
            textInputContainer: {
              backgroundColor: 'transparent',
              height: 50,
              borderRadius: 10,
              overflow: 'hidden',
            },
            textInput: {
              color: '#d7d7d7',
              fontSize: 16,
              height: '100%',
              backgroundColor: 'transparent',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          placeholder="Search"
          fetchDetails={true}
          numberOfLines={10}
          onPress={(data, details = null) => {
            const position = details?.geometry.location;
            if (position)
              setCoordinates({
                timestamp: new Date().valueOf(),
                coords: {
                  latitude: position?.lat,
                  longitude: position?.lng,
                  altitude: null,
                  altitudeAccuracy: null,
                  heading: null,
                  speed: null,
                  accuracy: 1,
                },
              });
          }}
          query={{
            key: GOOGLE_API_KEY_PLACES,
            language: 'en',
          }}
          renderRightButton={() => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#00000065',
                height: '100%',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/utilityIcons/Order/enter.png')}
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </DropShadow>
  );
};

export default AddressSelector;

const styles = StyleSheet.create({});
