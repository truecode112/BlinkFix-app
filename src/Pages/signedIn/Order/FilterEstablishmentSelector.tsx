import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {FilterInterface} from '../../../redux/Order/Establishments/getNerbayEstablishments.thunk';
import DropShadow from 'react-native-drop-shadow';
import {ShadowStyle} from '../../../components/backgrounds/menuSquareCartContainerRecipes';
import CuisineSearchbar from '../../../components/categorySelector/cuisineSearchbar';
import {GeolocationResponse} from '@react-native-community/geolocation';
import AddressSelector from '../../../components/Order/AddressSelector';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useDispatch} from 'react-redux';
import {setFiltersState} from '../../../redux/App/setup.slice';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../redux/hooks';

type Props = {};

const FilterEstablishment = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const filtersState = useAppSelector(state => state.App.orderFilters);
  const [filters, setFilters] = useState<FilterInterface>(
    filtersState
      ? {
          ...filtersState,
          distance: filtersState.distance ? filtersState.distance : '5',
        }
      : {},
  );
  const [addressState, setAddressState] = useState<string>('');

  const [coordinates, setCoordinates] = useState<GeolocationResponse | null>({
    coords: {
      latitude: filtersState?.lat ? parseFloat(filtersState.lat) : 0,
      longitude: filtersState?.lang ? parseFloat(filtersState.lang) : 0,
      accuracy: 1,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: new Date().valueOf(),
  });

  useEffect(() => {
    const newFilters = filters;
    if (coordinates) {
      setFilters({
        ...filters,
        lat: coordinates.coords.latitude.toString(),
        lang: coordinates.coords.longitude.toString(),
      });
    } else {
      delete newFilters.lat;
      delete newFilters.lang;
      setFilters(newFilters);
    }
  }, [coordinates]);

  return (
    <LoggedInBackground>
      <View style={{width: '100%', flex: 1}}>
        <Text style={styles.inputLabel}>Cuisine:</Text>
        <CuisineSearchbar
          setCuisineCode={(cuisineCode: string) => {
            setFilters({...filters, cuisine: cuisineCode});
          }}
        />
        <Text style={styles.inputLabel}>Address:</Text>
        <AddressSelector
          addressState={addressState}
          setAddressState={setAddressState}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
        {coordinates &&
          coordinates.coords.latitude !== 0 &&
          coordinates.coords.longitude !== 0 && (
            <View>
              <Text style={styles.inputLabel}>Latitude / Longitude:</Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setCoordinates(null);
                }}>
                <DropShadow
                  style={[
                    ShadowStyle.underImage,
                    {borderRadius: 5, overflow: 'hidden'},
                  ]}>
                  <Text
                    style={[
                      styles.inputStyle,
                      {borderRadius: 10, overflow: 'hidden'},
                    ]}>
                    {coordinates?.coords.latitude} /{' '}
                    {coordinates?.coords.longitude}
                  </Text>
                </DropShadow>
              </TouchableOpacity>
            </View>
          )}
        <View>
          <Text
            style={[styles.inputLabel, {borderRadius: 10, overflow: 'hidden'}]}>
            Distance:
          </Text>
          <DropShadow
            style={[
              ShadowStyle.underImage,
              {borderRadius: 5, overflow: 'hidden'},
            ]}>
            <TextInput
              onChangeText={text => setFilters({...filters, distance: text})}
              style={styles.inputStyle}
              value={filters.distance ? filters.distance : ''}
              placeholder={'Distance'}
            />
          </DropShadow>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              setFilters({...filters, isHalal: !filters.isHalal});
            }}
            style={[
              styles.onOfButton,
              {
                backgroundColor:
                  filters.isHalal === true ? '#00000015' : '#00000055',
              },
            ]}>
            <View>
              <Text style={{color: '#fff', fontFamily: 'Handlee-Regular'}}>
                Is Halal
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilters({...filters, isVegan: !filters.isVegan});
            }}
            style={[
              styles.onOfButton,
              {
                backgroundColor:
                  filters.isVegan === true ? '#00000015' : '#00000055',
              },
            ]}>
            <View>
              <Text style={{color: '#fff', fontFamily: 'Handlee-Regular'}}>
                Is Vegan
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilters({...filters, isKosher: !filters.isKosher});
            }}
            style={[
              styles.onOfButton,
              {
                backgroundColor:
                  filters.isKosher === true ? '#00000015' : '#00000055',
              },
            ]}>
            <View>
              <Text style={{color: '#fff', fontFamily: 'Handlee-Regular'}}>
                Is Kosher
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <SubmitButton
            title="Reset"
            onPress={() => {
              dispatch(setFiltersState());
              setFilters({});
              setCoordinates(null);
            }}
            style={{backgroundColor: '#4d4d4d'}}
          />
          <SubmitButton
            title="Submit Changes"
            onPress={() => {
              dispatch(setFiltersState(filters));
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default FilterEstablishment;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00000015',
    marginVertical: 10,
    fontSize: 18,
    fontFamily: 'Handlee-Regular',
    color: '#fff',
    borderRadius: 10,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Handlee-Regular',
  },
  onOfButton: {
    marginHorizontal: 5,
    marginVertical: 10,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 15,
  },
});
