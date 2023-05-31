import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IEstablishment} from '../../redux/Profile/types';
import {GeolocationResponse} from '@react-native-community/geolocation';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import DropShadow from 'react-native-drop-shadow';
import {WEBCONST} from '../../constants/webConstants';
import {CounterLikeEstablishment} from '../../redux/counters/favourites/likeEstablishment.thunk';
import {useNavigation} from '@react-navigation/native';
import {ISingleEstablishmentNavigationProps} from '../../navigation/order/types';

const SingleEstablishmentComponent = ({
  establishment,
  coordinates,
  noCheckout,
}: {
  establishment: IEstablishment;
  coordinates?: GeolocationResponse | null;
  noCheckout?: boolean;
}) => {
  const [dist, setDist] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const distanceNumber = distance(
      coordinates?.coords.latitude,
      coordinates?.coords.longitude,
      establishment.location?.coordinates[1],
      establishment.location?.coordinates[0],
      'K',
    );
    setDist(distanceNumber);
  }, [coordinates]);

  const {openHours, cuisine, counter} = establishment;

  //#region  counter
  const userId = useAppSelector(state => state.profile.data?._id);

  const [isLiked, setIsLiked] = useState<boolean>();

  useEffect(() => {
    const singleCounter = counter;
    if (userId) {
      const isLikedFetch = singleCounter?.whoLike?.includes(userId);
      setIsLiked(isLikedFetch);
    } else setIsLiked(false);
  }, [counter]);
  //#endregion
  //#region  cuisine
  const [cusineArr, setCuisineArr] = useState<
    {code: string; flagUrl?: string}[] | null
  >(null);

  useEffect(() => {
    const cuisineCodes =
      cuisine && cuisine.map
        ? cuisine?.map(cuis => (cuis.code === 'en' ? 'gb' : cuis.code))
        : [cuisine];
    // @ts-ignore
    const formated: {
      code: string;
      flagUrl: string;
    }[] = cuisineCodes?.map(code => ({
      code: code,
      flagUrl: `https://flagcdn.com/16x12/${code}.png`,
    }));
    setCuisineArr(formated);
  }, [cuisine]);
  //#endregion
  //#region  open hours
  const [openHoursString, setOpenHoursString] = useState<string | null>(null);

  useEffect(() => {
    const dateToday = myDayToday();
    const filteredDate = openHours?.filter(day => day.day === dateToday)[0];
    setOpenHoursString(
      `${filteredDate?.hours.open} - ${filteredDate?.hours.close}`,
    );
  }, [openHours]);
  //#endregion

  const navigation = useNavigation<ISingleEstablishmentNavigationProps>();

  return (
    <View
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.1)',
        height: 200,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 5,
      }}>
      {/* Establishment background */}
      <DropShadow
        style={{
          flex: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <Image
          style={{
            height: '70%',
            resizeMode: 'cover',
            borderRadius: 15,
            backgroundColor: 'rgba(0,0,0,.03)',
          }}
          source={{
            uri: `${WEBCONST().STORAGEURLNEW}/${
              // @ts-ignore
              establishment.owner?.images?.backgroundImage?.path
            }?${new Date().getTime()}`,
          }}
        />
      </DropShadow>
      {/* Establishment icons */}
      {noCheckout && (
        <View
          style={{
            alignSelf: 'flex-end',
            width: '60%',
            position: 'absolute',
            bottom: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Handlee-Regular',
              textTransform: 'capitalize',
              color: '#fff',
            }}>
            {establishment.name}
          </Text>
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          flex: 1,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        {/* share like */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            padding: 10,
          }}>
          <TouchableOpacity
            style={[styles.iconImage, {borderRadius: 50}]}
            onPress={() => {
              dispatch(CounterLikeEstablishment(establishment._id));
              setIsLiked(!isLiked);
            }}>
            {!isLiked ? (
              <Image
                style={{width: 16, height: 16}}
                source={require('../../assets/utilityIcons/notliked.png')}
              />
            ) : (
              <Image
                style={{width: 16, height: 16}}
                source={require('../../assets/utilityIcons/liked.png')}
              />
            )}
          </TouchableOpacity>

          <View style={[styles.iconImage, {borderRadius: 50}]}>
            <Image
              style={{width: 16, height: 16}}
              source={require('../../assets/utilityIcons/share.png')}
            />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', padding: 10}}>
          <View style={{flexDirection: 'row'}}>
            {establishment.isHalal && (
              <View style={styles.iconImage}>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../assets/utilityIcons/isHalal.png')}
                />
              </View>
            )}
            {establishment.isVegan && (
              <View style={styles.iconImage}>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../assets/utilityIcons/isVegan.png')}
                />
              </View>
            )}
            {establishment.isKosher && (
              <View style={styles.iconImage}>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../assets/utilityIcons/isKosher.png')}
                />
              </View>
            )}
            {establishment?.delivery?.isDelivery && (
              <View style={styles.iconImage}>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../assets/utilityIcons/isDelivery.png')}
                />
              </View>
            )}

            {establishment?.delivery?.isPickup && (
              <View style={styles.iconImage}>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../assets/utilityIcons/isTakeAway.png')}
                />
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            {cusineArr?.map((cuisine, index) => {
              return (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 4,
                    padding: 5,
                    backgroundColor: 'rgba(0,0,0,.3)',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,.4)',
                  }}>
                  <Image
                    style={{width: 16, height: 12}}
                    source={{uri: cuisine.flagUrl}}
                  />
                </View>
              );
            })}
          </View>
          {openHoursString && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 4,
                padding: 5,
                backgroundColor: 'rgba(0,0,0,.3)',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,.4)',
              }}>
              <Text style={{color: '#fff'}}>{openHoursString}</Text>
            </View>
          )}
        </View>
      </View>
      <DropShadow
        style={{
          width: '60%',
          height: '50%',
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          left: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <View
          style={{
            width: !noCheckout ? '100%' : '45%',
            flex: 1,
            backgroundColor: '#838383ad',
            zIndex: 1,
            bottom: 10,
            left: 10,
            padding: 5,
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <Image
            style={{
              height: '100%',
              aspectRatio: 1,
              resizeMode: 'cover',
              borderRadius: 5,
              backgroundColor: 'rgba(80,80,80,.25)',
            }}
            source={{
              uri: `${WEBCONST().STORAGEURLNEW}${
                // @ts-ignore
                establishment.owner?.images?.profileImage?.path
              }`,
            }}
          />
          {!noCheckout && (
            <View
              style={{flex: 1, marginLeft: 4, justifyContent: 'space-around'}}>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 13,
                    textTransform: 'capitalize',
                    fontWeight: '900',
                    fontFamily: 'Damion',
                    color: '#FFF',
                  }}>
                  {establishment.name}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    textTransform: 'capitalize',
                    fontWeight: '900',
                    fontFamily: 'Damion',
                    color: '#FFF',
                  }}>
                  Around {dist.toFixed(2)}km from you.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleRestaurantPage', {establishment})
                }
                style={{
                  paddingVertical: 5,
                  backgroundColor: '#EA3651',
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'Handlee-Regular',
                  }}>
                  Visit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </DropShadow>
    </View>
  );
};

export default SingleEstablishmentComponent;

const styles = StyleSheet.create({
  iconImage: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,.3)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.4)',
  },
});

export function distance(
  lat1: number | undefined,
  lon1: number | undefined,
  lat2: string | undefined,
  lon2: string | undefined,
  unit: 'K' | 'M' | 'N',
) {
  if (lat1 && lon1 && lat2 && lon2) {
    const lat = parseFloat(lat2);
    const long = parseFloat(lon2);
    if (lat1 == lat && lon1 == long) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat) / 180;
      var theta = lon1 - long;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  } else return NaN;
}

function myDayToday() {
  var a = new Date();
  var weekdays = new Array(7);
  weekdays[0] = 'sunday';
  weekdays[1] = 'monday';
  weekdays[2] = 'tuesday';
  weekdays[3] = 'wednesday';
  weekdays[4] = 'thursday';
  weekdays[5] = 'friday';
  weekdays[6] = 'saturday';
  var r = weekdays[a.getDay()];
  return r;
}
