import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import MenuSquareCartContainer from '../../../components/backgrounds/menuSquareCartContainer';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HomePageProp} from '../../../navigation/types';
import {Textstyles} from '../menupages/contact';
import {language} from '../../../utils/languagePacks/selectLanguage';
import {getLocalStorageLanguage} from '../../../utils/localStorage';
import {useAppSelector} from '../../../redux/hooks';
import recipes from '../../../redux/recipes';

const HugeMenu = () => {
  const test = useNavigation<HomePageProp['navigation']>();
  return (
    <LoggedInBackground notGoingBack withIcons>
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          paddingTop: '5%',
        }}>
        <Text
          style={[
            Textstyles.text,
            {
              color: '#fff',
              fontSize: 30,
              marginHorizontal: 30,
              textAlign: 'left',
              fontFamily: 'Handlee-Regular',
            },
          ]}>
          We <Text style={{color: '#EA3651'}}>fix</Text> you up in a
          <Text style={{color: '#474641'}}> blink</Text> of an eye.
        </Text>
        <View style={styles.main}>
          <View style={styles.rowContainer}>
            <MenuSquareCartContainer
              name={'Orders'}
              image={require('../../../static/icons/Order.png')}
            />
            <MenuSquareCartContainer
              name={'Recipes'}
              image={require('../../../static/icons/Recipes.png')}
            />
          </View>
          <View style={styles.rowContainer}>
            <MenuSquareCartContainer
              name={'ComingSoon'}
              image={require('../../../static/icons/Comingsoon.png')}
            />
            <MenuSquareCartContainer
              name={'Profile'}
              image={require('../../../static/icons/profile.png')}
            />
          </View>
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default HugeMenu;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'center',
  },
  rowContainer: {flexDirection: 'row', flex: 1},
});
