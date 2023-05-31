import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SimpleSection from './SimpleSection';
import {IEstablishment} from '../../../../redux/Profile/types';
import TextInputProfile from '../../../TextInputs/TextInputCuisine';
import SubmitButton from '../../../touchables/SubmitButton';
import Geolocation from '@react-native-community/geolocation';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {EditEstablishmentPosition} from '../../../../redux/Order/MyEstablishment/editEsablishment.thunk';
import {getLocationByAddress} from '../../../../redux/Order/Establishments/getLocationByAddress.slice';
import {TextInputPlainText} from '../../../../Pages/signedIn/menupages/establishment/createEstablishment';
import {getMyProfile} from '../../../../redux/Profile/core/profileCore.thunk';
import {GetEstablishment} from '../../../../redux/Order/order.thunk';
import {cleanGetLocationSlice} from '../../../../redux/Order/Establishments/getLocationByAddress.thunk';
import {Textstyles} from '../../../../Pages/signedIn/menupages/contact';

export interface ILatLong {
  lat: string;
  long: string;
}

const PositionLatLong = ({info}: {info: IEstablishment}) => {
  const {data, succes} = useAppSelector(state => state.establishment);
  const location = useAppSelector(state => state.LocationByAddress.data);

  const dispatch = useAppDispatch();

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const [latlong, setLatlong] = useState<ILatLong>({
    lat: '',
    long: '',
  });

  useEffect(() => {
    if (!succes) {
      dispatch(GetEstablishment());
      dispatch(getMyProfile());
    }
    if (data && data[0].location) {
      setLatlong({
        lat: data[0].location?.coordinates[1].toString(),
        long: data[0].location?.coordinates[0].toString(),
      });
    }
  }, [data]);

  useEffect(() => {
    if (location && location.lat && location.lng) {
      setLatlong({
        lat: location?.lat.toString(),
        long: location?.lng.toString(),
      });
    }
  }, [location]);

  return (
    <SimpleSection
      title={'Location of ' + info.name}
      isEditModeEnabled={isEditModeEnabled}
      Button={() =>
        isEditModeEnabled ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
              }}>
              <Image
                source={require('../../../../assets/utilityIcons/add.png')}
                style={{width: 20, height: 20, transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../../../assets/utilityIcons/edit.png')}
              />
            </TouchableOpacity>
          </>
        )
      }>
      {isEditModeEnabled && (
        <View>
          <Text style={[Textstyles.text]}>Latitude</Text>
          <TextInputPlainText
            value={latlong.lat.toString()}
            placeholder="Latitude ( number like latitude like 0.00000 )"
            onChange={text => setLatlong({...latlong, lat: text})}
          />
          <Text style={[Textstyles.text]}>Longitude</Text>

          <TextInputPlainText
            value={latlong.long.toString()}
            placeholder="Latitude ( number like latitude like 0.00000 )"
            onChange={text => setLatlong({...latlong, long: text})}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <SubmitButton
              style={{backgroundColor: '#4d4d4d'}}
              title="Get From Address"
              onPress={() => {
                const addressString =
                  info.address.country +
                  ' ' +
                  info.address.city +
                  ' ' +
                  info.address.street +
                  ' ' +
                  info.address.buildingnumber +
                  ' ' +
                  info.address.postcode +
                  ' ' +
                  info.address.state;
                const replecedAddress = addressString.replace('/', ' ');
                dispatch(getLocationByAddress(replecedAddress));
                // here
              }}
            />
            <SubmitButton
              title="Submit"
              onPress={() => {
                if (validateLatLong(latlong)) {
                  if (latlong.lat && latlong.long) {
                    dispatch(
                      EditEstablishmentPosition([latlong.long, latlong.lat]),
                    );
                  }
                } else {
                  Alert.alert(
                    'Validation error',
                    'latitude or longitude is not valid',
                  );
                }
              }}
            />
          </View>
        </View>
        //TODO: check spelling
      )}
      {info?.location?.coordinates && !isEditModeEnabled && (
        <>
          <Text style={[Textstyles.text]}>Latitude</Text>
          <TextInputProfile
            disabled
            value={latlong.lat.toString()}
            name="lat"
            placeholder="Latitude ( number like latitude like 0.00000 )"
            state={latlong}
            onChange={setLatlong}
          />
          <Text style={[Textstyles.text]}>Longitude</Text>
          <TextInputProfile
            disabled
            value={latlong.long.toString()}
            name="long"
            placeholder="Longitude ( number like Longitude like 0.00000 )"
            state={latlong}
            onChange={setLatlong}
          />
        </>
      )}
      {!isEditModeEnabled &&
        info &&
        info?.location?.coordinates === undefined && (
          <Text style={{color: '#fff'}}>
            You haven't set geolocation position to Your establishment yet
          </Text>
        )}
    </SimpleSection>
  );
};

export default PositionLatLong;

const styles = StyleSheet.create({});

const validateLatLong = ({lat, long}: ILatLong): boolean => {
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(long);

  const validateLat = isLatitude(latNum);
  const validateLng = isLongitude(lngNum);
  return validateLat && validateLng;
};

function isLatitude(lat: number) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng: number) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}
