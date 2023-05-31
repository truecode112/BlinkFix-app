import {Image, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabDefaultOptions} from '../../options/stackDefaultOptions';
import BuddyProgram from '../../Pages/signedIn/ComingSoon';
import RecipesNavigation from '../recipes/recipesNavigation';
import {HomePageProp, HomeTabParamList} from '../types';
import Tabbar from '../../components/background/Tabbar';
import {HomepageHomeMenuNavigationContainer} from '../order/initialOrderNavigation';
import {ProfileNavigationContainer} from '../Profile/ProfileRootNavigator';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/hooks';
import {getMyProfile} from '../../redux/Profile/core/profileCore.thunk';

const BottomTabNavigator = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyProfile());
  }, []);
  const Tab = createBottomTabNavigator<HomeTabParamList>();
  return (
    <Tab.Navigator
      screenOptions={TabDefaultOptions}
      tabBar={props => <Tabbar {...props} />}
      backBehavior={'history'}
      initialRouteName="Order">
      <Tab.Screen
        name="Order"
        component={HomepageHomeMenuNavigationContainer}
        options={{
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/order.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesNavigation}
        options={{
          lazy: false,
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/recipe.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ComingSoon"
        component={BuddyProgram}
        options={{
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/buddy.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigationContainer}
        options={{
          tabBarIconStyle: {backgroundColor: 'red'},
          tabBarActiveBackgroundColor: 'rgba(80,80,80,1)',
          tabBarIcon: () => (
            <View>
              <Image
                source={require('../../assets/mainIcons/profile.png')}
                style={{height: 25, aspectRatio: 1}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
