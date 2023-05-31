import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';
import {RecipesPageScreenProp} from '../../navigation/types';

const MenuSquareCartContainerReceipes = (props: {
  name: 'Find Recipes' | 'My Recipes' | 'Add Recipes' | 'Shopping Lists';
  image: any;
}) => {
  const navigation = useNavigation<RecipesPageScreenProp>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        try {
          //@ts-ignore
          navigation.navigate('Recipes Home', {screen: props.name});
        } catch (error) {
          console.error(error);
        }
      }}>
      <DropShadow style={styles.MenuSquareCartContainer}>
        <Image
          source={props.image}
          style={{width: 60, height: 60, resizeMode: 'cover'}}
        />
        <Text style={{color: '#fff', fontFamily: 'Handlee-Regular'}}>
          {props.name}
        </Text>
      </DropShadow>
    </TouchableOpacity>
  );
};

export default MenuSquareCartContainerReceipes;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    aspectRatio: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.11)',
    borderRadius: 10,
  },
  MenuSquareCartContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 2,
    borderRadius: 10,
  },
});

export const ShadowStyle = StyleSheet.create({
  underImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.56,
    shadowRadius: 6.68,

    elevation: 11,
  },
});
