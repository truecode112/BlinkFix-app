import {GeolocationResponse} from '@react-native-community/geolocation';
import React from 'react';
import {Image, View} from 'react-native';
import {Marker} from 'react-native-maps';
import {WEBCONST} from '../../constants/webConstants';
import {IEstablishment, ILocation} from '../../redux/Profile/types';
import {ILatLong} from '../Profile/Sections/infoScetion/PositionLatLong';

const RenderMarker = ({
  YourCoordinates,
  image,
  location,
  establishment,
  setEstablishmentToDisplayInMenu,
}: {
  YourCoordinates?: GeolocationResponse | null;
  location?: ILocation;
  image?: string;
  establishment?: IEstablishment;
  setEstablishmentToDisplayInMenu?: React.Dispatch<
    React.SetStateAction<IEstablishment | null>
  >;
}) => {
  if (YourCoordinates) {
    return (
      <Marker
        coordinate={{
          latitude: YourCoordinates?.coords.latitude,
          longitude: YourCoordinates?.coords.longitude,
        }}>
        <View>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
            }}
            source={require('../../assets/utilityIcons/pointRed.png')}
          />
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              position: 'absolute',
              alignSelf: 'center',
              top: 4,
            }}
            source={
              image
                ? {
                    uri: image,
                  }
                : require('../../assets/BX.png')
            }
          />
        </View>
      </Marker>
    );
  } else if (location)
    return (
      <>
        {location && (
          <Marker
            onPress={() => {
              if (establishment && setEstablishmentToDisplayInMenu)
                setEstablishmentToDisplayInMenu(establishment);
            }}
            coordinate={{
              latitude: parseFloat(location.coordinates[1]),
              longitude: parseFloat(location.coordinates[0]),
            }}>
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/utilityIcons/pointGrey.png')}
              />
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  position: 'absolute',
                  alignSelf: 'center',
                  top: 4,
                }}
                source={
                  image
                    ? {
                        uri: image,
                      }
                    : require('../../assets/BX.png')
                }
              />
            </View>
          </Marker>
        )}
      </>
    );
  else return <View></View>;
};

export default RenderMarker;
