import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import ProfileContentStudent from '../../../components/Profile/StudentContent';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const StudentProfile = () => {
  const state = useAppSelector(state => state.profile.data);
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
      }}>
      <ProfileContentStudent profileInfo={state} />
    </View>
  );
};

export default StudentProfile;

const styles = StyleSheet.create({
  animatedContainer: {
    width: '100%',
    height: SCREEN_HEIGHT - 150,
    left: 0,
  },
});
