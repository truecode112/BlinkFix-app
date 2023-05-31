import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RecipesLists from '../recipes/recipesLists';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import {useFocusEffect} from '@react-navigation/native';
import {GetLikedRecipes} from '../../redux/counters/favourites/Favourites.thunk';
import Spinner from 'react-native-spinkit';

const FavouriteRecipes = () => {
  const {data, isLoading} = useAppSelector(state => state.MyFavouritesRecipes);
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setLoadingState(false);
      }, 1500);
    }
  }, [isLoading]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetLikedRecipes());
    }, []),
  );

  return (
    <>
      {loadingState ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner color="#EA3651" type="Circle" />
        </View>
      ) : (
        <View style={{minHeight: height / 2}}>
          {data && data?.length !== 0 ? (
            <>
              <RecipesLists recipes={data} title=" " from="favorites" />
            </>
          ) : (
            <Text style={[Textstyles.text, Textstyles.title]}>
              Your favourite recipes will be there
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default FavouriteRecipes;

const styles = StyleSheet.create({});
