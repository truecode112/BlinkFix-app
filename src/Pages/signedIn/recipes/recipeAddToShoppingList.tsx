import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RecipeAddShoppingListScreenProps,
  RecipesHomePageScreenProp,
  RecipesPageScreenProp,
} from '../../../navigation/types';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import SingleIngredient from '../../../components/recipes/ingredients/singleIngredient';
import {RecipeStyles} from './Recipesadd';
import PillButton from '../../../components/recipes/PillButton';
import {IIngredient} from '../../../redux/recipes/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {instance} from '../../../redux/interceptors';
import {addShoppingListThunk} from '../../../redux/recipes/shoppingList/addShoppinglist.thunk';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {
  ProfileNavigation,
  ShoppingListAddScreenParam,
} from '../../../navigation/Profile/ProfileNavigator.types';
import {cleanUpshoppingList} from '../../../redux/recipes/shoppingList/shoppinList.slice';

const RecipeAddToShoppingList = () => {
  const propRecipes = useRoute<RecipeAddShoppingListScreenProps['route']>();
  const propProfile = useRoute<ShoppingListAddScreenParam['route']>();
  const isFromProfile = propProfile.params.from === 'Profile';

  const dispatch = useAppDispatch();
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  const navigationFromProfile = useNavigation<ProfileNavigation>();
  const route = isFromProfile ? propProfile : propRecipes;
  const {ingredientsList, tipIngredientsList, recipeId} = route.params;

  const [isTipIngredients, setIsTipIngredients] = useState<boolean>(true);
  const [shoppingList, setShoppingList] = useState<IIngredient[]>([]);
  const [tipShoppingList, setTipShoppingList] = useState<IIngredient[]>([]);

  const {succes, error} = useAppSelector(state => state.shoppingList);
  useEffect(() => {
    if (succes === true) {
      if (isFromProfile) {
        navigationFromProfile.dispatch(
          StackActions.replace('ShoppingListsFromProfile', {
            from: 'Profile',
          }),
        );
      } else {
        navigation.dispatch(StackActions.replace('Shopping Lists'));
      }
      dispatch(cleanUpshoppingList());
    }
  }, [succes]);

  useEffect(() => {
    if (error) {
      Alert.alert('there was a problem', JSON.stringify(error));
      dispatch(cleanUpshoppingList());
    }
  }, [error]);

  return (
    <LoggedInBackground>
      <Text style={RecipeStyles.TextTitle}>Main ingredients</Text>
      <View style={styles.ingContainer}>
        {ingredientsList?.map((ingredient, index) => (
          <SingleIngredient
            key={index}
            shoppingList={shoppingList}
            ingredient={ingredient}
            setShoppingList={setShoppingList}
          />
        ))}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[RecipeStyles.TextTitle, {flex: 1, textAlign: 'center'}]}>
          Tip ingredients
        </Text>
        <PillButton status={isTipIngredients} setStatus={setIsTipIngredients} />
      </View>
      <View style={{width: '100%', flex: 1}}>
        {isTipIngredients === true && (
          <View style={styles.ingContainer}>
            {tipIngredientsList?.map((ingredient, index) => (
              <SingleIngredient
                shoppingList={tipShoppingList}
                key={index}
                ingredient={ingredient}
                setShoppingList={setTipShoppingList}
              />
            ))}
          </View>
        )}
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <SubmitButton
          style={{backgroundColor: 'rgb(80,80,80)'}}
          title="Buy ingredients"
          onPress={() => {
            Alert.alert('go to order find shops');
            //TODO: ('go to order find shops');
          }}
        />
        <SubmitButton
          title="Submit new Shopping Lists"
          onPress={() => {
            dispatch(
              addShoppingListThunk({
                recipeIngredients: shoppingList,
                recipeId: recipeId,
                recipeTipIngredients: tipShoppingList,
              }),
            );
          }}
        />
      </View>
    </LoggedInBackground>
  );
};

export default RecipeAddToShoppingList;

const styles = StyleSheet.create({
  ingContainer: {marginVertical: 10, width: '100%'},
});
