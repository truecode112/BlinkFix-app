import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MenuSquareCartContainerReceipes from '../../../components/backgrounds/menuSquareCartContainerRecipes';
import {Textstyles} from '../menupages/contact';

const HugeMenuRecipes = () => {
  return (
    <LoggedInBackground>
      <Text
        style={[
          Textstyles.text,
          {
            color: '#fff',
            fontSize: 30,
            marginHorizontal: 30,
            textAlign: 'left',
          },
        ]}>
        We <Text style={{color: '#EA3651'}}>fix</Text> you up in a
        <Text style={{color: '#474641'}}> blink</Text> of an eye.
      </Text>
      <View style={styles.main}>
        <View style={styles.rowContainer}>
          <MenuSquareCartContainerReceipes
            name="Find Recipes"
            image={require('../../../static/icons/menuRecipes/find.png')}
          />
          <MenuSquareCartContainerReceipes
            name="Add Recipes"
            image={require('../../../static/icons/menuRecipes/add.png')}
          />
        </View>
        <View style={styles.rowContainer}>
          <MenuSquareCartContainerReceipes
            name="My Recipes"
            image={require('../../../static/icons/menuRecipes/my.png')}
          />
          <MenuSquareCartContainerReceipes
            name="Shopping Lists"
            image={require('../../../static/icons/menuRecipes/lists.png')}
          />
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default HugeMenuRecipes;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rowContainer: {flexDirection: 'row', flex: 1},
});
