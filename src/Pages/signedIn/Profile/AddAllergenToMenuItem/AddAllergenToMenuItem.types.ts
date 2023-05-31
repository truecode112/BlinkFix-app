import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProfileParamList} from '../../../../navigation/Profile/ProfileNavigator.types';
import {StackScreenProps} from '@react-navigation/stack';

export type ProfileAddRecipeNavigationProps = StackScreenProps<
  ProfileParamList,
  'AddAllergens'
>;

export interface IAddAllergenToMenuItemProps {}
