import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {ProfileNavigationProps} from '../../../navigation/Profile/ProfileNavigator.types';
import {WEBCONST} from '../../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';
import {Textstyles} from '../menupages/contact';
import {oflineIcon, onlineIcon} from '../../../assets/status/statusIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EmployeePopup from './empoyees/empoyeePopUp';

const SingleEmployee = ({route}: ProfileNavigationProps) => {
  const {params} = route;
  const employee = params.employee;
  const {width} = useWindowDimensions();
  const orders = employee.orders;

  const [isActive, setIsActive] = useState(false);

  const changeIsActive = () => {
    // TODO: get active users from be
    setIsActive(!isActive);
  };
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const ShowEmployeeInfo = () => {
    setIsUserInfoVisible(!isUserInfoVisible);
  };

  const infoIcon = require('../../../assets/utilityIcons/info.png');
  return (
    <>
      <LoggedInBackground>
        {/* #region */}
        <View style={{width: '100%', flex: 1}}>
          <>
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
            <View
              style={[
                {
                  backgroundColor: '#E1F4FF',
                  borderRadius: 10,
                  alignItems: 'center',
                  width: '100%',
                  aspectRatio: 2,
                  overflow: 'hidden',
                },
              ]}>
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
                      width: width.valueOf() - 14,
                      height: '100%',
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
                      style={{width: '100%', maxWidth: 600}}
                      source={require('../../../assets/utilityIcons/user.png')}
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
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                      borderRadius: 5,
                    }}
                    source={require('../../../assets/googlemaps/profilePics/man.png')}
                  />
                </DropShadow>
              )}
            </View>
            {/* #endregion */}
          </>

          <View style={{padding: 10}}>
            <Text
              style={[
                Textstyles.text,
                Textstyles.title,
                {
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  marginVertical: 0,
                },
              ]}>
              {employee.worker.first_name} {employee.worker.last_name}
            </Text>
            <Text
              style={[
                Textstyles.text,
                {textTransform: 'capitalize', textAlign: 'center'},
              ]}>
              {employee.typeOfWork}
            </Text>
            <TouchableOpacity
              style={{position: 'absolute', top: 10, right: 30}}
              onPress={ShowEmployeeInfo}>
              <Image source={infoIcon} style={{width: 30, height: 30}} />
            </TouchableOpacity>
          </View>
          <Text>{JSON.stringify(orders)}</Text>
        </View>
      </LoggedInBackground>
      {isUserInfoVisible && (
        <EmployeePopup
          orderCount={orders.length}
          closePopup={() => setIsUserInfoVisible(false)}
          employee={employee}
        />
      )}
    </>
  );
};

export default SingleEmployee;

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
