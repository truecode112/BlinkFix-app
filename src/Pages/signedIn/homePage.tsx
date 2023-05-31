import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {useAppDispatch} from '../../redux/hooks';
import BottomTabNavigator from '../../navigation/Home/bottomTabNavigator';
import {useFocusEffect} from '@react-navigation/native';

const HomePage = () => {
  return <BottomTabNavigator />;
};

export default HomePage;

const styles = StyleSheet.create({});
