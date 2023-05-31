import {
  Image,
  Linking,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';
import {WEBCONST} from '../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Alert, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../navigation/Profile/ProfileNavigator.types';
import {oflineIcon, onlineIcon} from '../../assets/status/statusIcons';

const SimpleEmployee = ({employee}: {employee: IWorkspaceEmployeeList}) => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<ProfileNavigation>();
  const callNumber = (phone: string) => {
    try {
      let phoneNumber = phone;
      if (Platform.OS !== 'android') {
        phoneNumber = `tel:${phone}`;
      } else {
        phoneNumber = `telprompt:${phone}`;
      }

      Linking.openURL(phoneNumber);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  const navigateToEmployee = (employee: IWorkspaceEmployeeList) => {
    navigation.navigate('SingleEmployee', {employee});
  };
  const [imagestDims, setImagestDims] = useState<{
    height: number;
    width: number;
    x: number;
    y: number;
  }>({height: 0, width: 0, x: 0, y: 0});

  const [isActive, setIsActive] = useState(false);
  const changeIsActive = () => {
    // TODO: get active users from be
    setIsActive(!isActive);
  };
  return (
    <DropShadow
      style={[
        styles.shadow,
        {
          width: width / 1.4,
          maxWidth: 600,
          marginHorizontal: 5,
          backgroundColor: 'rgba(0,0,0,.1)',
          marginBottom: 15,
          borderRadius: 5,
          shadowColor: '#00000015',
          shadowOffset: {
            width: -2,
            height: 4,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 2,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigateToEmployee(employee)}>
        <View
          onLayout={e => {
            setImagestDims(e.nativeEvent.layout);
          }}
          style={[
            {
              backgroundColor: '#E1F4FF',
              borderRadius: 5,
              alignItems: 'center',
              width: '100%',
              aspectRatio: 2,
            },
          ]}>
          {isActive ? (
            <View style={styles.statusIcon}>
              <TouchableOpacity activeOpacity={1} onPress={changeIsActive}>
                <Image source={onlineIcon} style={styles.statusIconImage} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.statusIcon}>
              <TouchableOpacity activeOpacity={1} onPress={changeIsActive}>
                <Image source={oflineIcon} style={styles.statusIconImage} />
              </TouchableOpacity>
            </View>
          )}
          {employee.worker.images && employee.worker.images[1] ? (
            <DropShadow
              style={{
                shadowColor: '#000000',
                shadowOffset: {
                  width: -2,
                  height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 2,
              }}>
              <Image
                style={{
                  width: imagestDims.width,
                  height: imagestDims.height,
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
                source={{
                  uri: `${WEBCONST().STORAGEURLNEW}${
                    employee.worker.images[1].path
                  }?${new Date().getTime()}`,
                }}
              />
            </DropShadow>
          ) : (
            <DropShadow
              style={{
                shadowColor: '#000000',
                shadowOffset: {
                  width: -2,
                  height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 2,
              }}>
              <DropShadow style={styles.imageBG}>
                <Image
                  style={{width: width / 1.4, maxWidth: 600}}
                  source={require('../../assets/utilityIcons/user.png')}
                />
              </DropShadow>
            </DropShadow>
          )}
          {employee.worker.images && employee.worker.images[0] ? (
            <DropShadow
              style={{
                position: 'absolute',
                top: 20,
                shadowColor: '#000000',
                shadowOffset: {
                  width: -2,
                  height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 2,
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 500,
                }}
                source={{
                  uri: `${WEBCONST().STORAGEURLNEW}${
                    employee.worker.images[0].path
                  }?${new Date().getTime()}`,
                }}
              />
            </DropShadow>
          ) : (
            <DropShadow
              style={{
                shadowColor: '#000000',
                shadowOffset: {
                  width: -2,
                  height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 2,
              }}>
              <Image
                style={{
                  width: imagestDims.width,
                  height: imagestDims.height,
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
                source={require('../../assets/googlemaps/profilePics/man.png')}
              />
            </DropShadow>
          )}
        </View>
        <Text
          style={{
            marginTop: 10,
            fontWeight: '600',
            textAlign: 'center',
            color: '#fff',
            textTransform: 'capitalize',
          }}>
          {employee.worker.first_name} {employee.worker.last_name}
        </Text>
        <View style={{alignSelf: 'center'}}>
          <View
            style={[
              {
                flexDirection: 'row',
                height: 60,
                alignItems: 'center',
                justifyContent: 'space-evenly',
              },
            ]}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '900',
                textTransform: 'capitalize',
              }}>
              Status:{'  '}
            </Text>

            <DropShadow
              style={{
                shadowColor: '#fff',
                shadowOffset: {
                  width: -2,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 5,
                elevation: 2,
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.151)',
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '900',
                    textTransform: 'capitalize',
                  }}>
                  {employee.workerStatus}
                </Text>
              </View>
            </DropShadow>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(80,80,80)',
            flex: 1,
            paddingVertical: 5,
          }}
          onPress={() => {
            if (employee.worker.phone_number === '000000000')
              callNumber('783835385');
            else callNumber(employee.worker.phone_number);
          }}>
          <Text style={{textAlign: 'center', color: '#fff', marginBottom: 10}}>
            Contact with employee directly
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default SimpleEmployee;

const styles = StyleSheet.create({
  imageBG: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
    padding: 5,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
  },
  statusIcon: {
    height: 30,
    position: 'absolute',
    zIndex: 100,
    top: 10,
    left: 10,
  },
  statusIconImage: {
    height: 25,
    width: 80,
    resizeMode: 'contain',
  },
});
