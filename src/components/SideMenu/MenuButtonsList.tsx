import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import MenuButtonItem from './MenuButtonItem';
import {SharedValue} from 'react-native-reanimated';
import {useAppDispatch} from '../../redux/hooks';
import {logout} from '../../utils/localStorage';
import {cleanUpLogin, setAuthState} from '../../redux/Auth/loginReducer';
import {useNavigation} from '@react-navigation/native';
import {HomePageScreenProp} from '../../navigation/types';

const MenuButtonsList = ({
  isMenuOpen,
  setIsMenuOpen,
  numberOfCartItems,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  offset: SharedValue<number>;
  numberOfCartItems: number;
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomePageScreenProp>();
  useEffect(() => {}, [isMenuOpen]);
  const menuItems: {
    title: string;
    onPress: () => void;
    icon: ImageSourcePropType;
  }[] = [
    {
      title: 'Profile',
      onPress: () => {
        setIsMenuOpen(!isMenuOpen);
        navigation.navigate('Profile');
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/profile.png'),
    },
    {
      title: 'Notifications',
      onPress: () => {
        console.log('Pressed Notifications');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/notification.png'),
    },
    {
      title: 'Wallet',
      onPress: () => {
        setIsMenuOpen(!isMenuOpen);
        navigation.navigate('wallet');
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/wallet.png'),
    },
    {
      title: 'Cart',
      onPress: () => {
        navigation.navigate('Cart');

        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/cart.png'),
    },
    {
      title: 'Favourites',
      onPress: () => {
        navigation.navigate('favourites');
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/favourites.png'),
    },
    {
      title: 'Language',
      onPress: () => {
        setIsMenuOpen(!isMenuOpen);
        navigation.navigate('LanguageSelection');
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/language.png'),
    },
    {
      title: 'Contact',
      onPress: () => {
        setIsMenuOpen(!isMenuOpen);
        navigation.navigate('contact');
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/contact.png'),
    },
    {
      title: 'FAQ',
      onPress: () => {
        setIsMenuOpen(!isMenuOpen);
        navigation.navigate('FAQ');
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/faq.png'),
    },
    {
      title: 'Logout',
      onPress: () => {
        logout();
        dispatch(cleanUpLogin());
        dispatch(setAuthState(false));
        setIsMenuOpen(!isMenuOpen);
      },
      icon: require('../../assets/utilityIcons/menuIcons/itemIcons/logout.png'),
    },
  ];

  return (
    <>
      {menuItems?.map((menuItem, index) =>
        menuItem.title === 'Cart' && numberOfCartItems !== 0 ? (
          <View key={index} style={{position: 'relative'}}>
            <MenuButtonItem
              isMenuOpen={isMenuOpen}
              name={menuItem.title}
              onPress={menuItem.onPress}
              icon={menuItem.icon}
              offset={(index * 10) / 7}
            />
            <View
              style={{
                position: 'absolute',
                width: 20,
                borderRadius: 20,
                height: 20,
                top: 15,
                right: 20,
                backgroundColor: '#ea3651',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '900', fontSize: 12}}>
                {numberOfCartItems}
              </Text>
            </View>
          </View>
        ) : (
          <MenuButtonItem
            isMenuOpen={isMenuOpen}
            key={index}
            name={menuItem.title}
            onPress={menuItem.onPress}
            icon={menuItem.icon}
            offset={(index * 10) / 7}
          />
        ),
      )}
    </>
  );
};

export default MenuButtonsList;

const styles = StyleSheet.create({});
