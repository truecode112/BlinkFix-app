import {
  KeyboardAvoidingView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import ProfileByRole from './ProfileByRole';
import {getMyProfile} from '../../../redux/Profile/core/profileCore.thunk';
import {GetEstablishment} from '../../../redux/Order/order.thunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Profile = () => {
  const {data} = useAppSelector(state => state.profile);

  const dispatch = useAppDispatch();
  const userRole = data?.userRole;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyProfile());
    }, []),
  );
  const [selected, setSelected] = useState<0 | 1 | 2 | 3 | 4>(0);
  const {width} = useWindowDimensions();
  return (
    <LoggedInBackground>
      <ProfileByRole
        role={userRole}
        selected={selected}
        setSelected={setSelected}
      />
      <View style={{height: 100}}></View>
    </LoggedInBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({});
