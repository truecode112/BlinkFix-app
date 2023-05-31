import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useAppDispatch} from '../../redux/hooks';
import {setLastNavigationDirection} from '../../redux/App/setup.slice';

const Tabbar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const dipsatch = useAppDispatch();

  return (
    <View style={styles.TabContainer}>
      {state.routes?.map((route, index, arr) => {
        const {options} = descriptors[route.key];
        const key = route.key;
        const Icon = descriptors[key].options.tabBarIcon;
        const routeName = state.routeNames[index];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            dipsatch(setLastNavigationDirection(key));
            navigation.navigate(routeName);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              backgroundColor: isFocused ? 'rgba(0,0,0,.35)' : 'transparent',
              height: '100%',
              aspectRatio: 1,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
            }}>
            {Icon && <IconRender name={routeName} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  TabContainer: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 5,
    marginHorizontal: 5,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});

const IconRender = ({name}: {name: string}) => {
  switch (name) {
    case 'Order':
      return (
        <Image
          style={{height: '100%', aspectRatio: 1}}
          source={require('../../assets/mainIcons/order.png')}
        />
      );
    case 'Recipes':
      return (
        <Image
          style={{height: '100%', aspectRatio: 1}}
          source={require('../../assets/mainIcons/recipe.png')}
        />
      );
    case 'ComingSoon':
      return (
        <Image
          style={{height: '100%', aspectRatio: 1}}
          source={require('../../assets/mainIcons/buddy.png')}
        />
      );
    case 'Profile':
      return (
        <Image
          style={{height: '100%', aspectRatio: 1}}
          source={require('../../assets/mainIcons/profile.png')}
        />
      );

    default:
      return (
        <Image
          style={{height: '100%', aspectRatio: 1}}
          source={require('../../assets/mainIcons/profile.png')}
        />
      );
  }
};
