import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import DropShadow from 'react-native-drop-shadow';
import {ShadowStyle} from '../../../components/backgrounds/menuSquareCartContainerRecipes';
import {Textstyles} from '../menupages/contact';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch} from '../../../redux/hooks';
import {GetLikedRecipes} from '../../../redux/counters/favourites/Favourites.thunk';
import FavouriteRecipes from '../../../components/favourites/recipes';
import Favouritedishes from '../../../components/favourites/dishes';
import FavouriteProviders from '../../../components/favourites/restaurants';
import {getAllRecipes} from '../../../redux/recipes/recipesThunks';
import {getLikedMenuItems} from '../../../redux/counters/favourites/Order/menuItems/getLikedMenuItems.thunk';
import {GetNerbayEstablishment} from '../../../redux/Order/Establishments/getNerbayEstablishments.thunk';

const FavouritesPage = () => {
  const [selected, setSelected] = useState(0);
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllRecipes());
      dispatch(GetLikedRecipes());
      dispatch(getLikedMenuItems());
    }, []),
  );

  useEffect(() => {
    if (selected === 2) {
      dispatch(getLikedMenuItems());
      dispatch(GetNerbayEstablishment());
    }
  }, [selected]);

  const arr = [
    {index: 0, name: 'Recipes'},
    {index: 1, name: 'Providers'},
    {index: 2, name: 'Dishes'},
  ];
  return (
    <LoggedInBackground withoutBottom>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 10,
        }}>
        {arr?.map((item, index) => {
          return (
            <DropShadow style={[ShadowStyle.underImage]} key={index}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor:
                    selected === index ? '#ffffff09' : 'transparent',
                  borderRadius: 5,
                }}
                onPress={() => setSelected(item.index)}>
                <Text style={[Textstyles.text, {fontSize: 15}]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </DropShadow>
          );
        })}
      </View>
      <View style={{width: '100%', flex: 1}}>
        {selected === 0 && <FavouriteRecipes />}
        {selected === 1 && <FavouriteProviders />}
        {selected === 2 && <Favouritedishes />}
      </View>
    </LoggedInBackground>
  );
};

export default FavouritesPage;
