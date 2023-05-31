import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {
  RecipesHomePageScreenProp,
  RecipesToProfilePageScreenProp,
} from '../../../navigation/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '../../../redux/hooks';
import {IRecipe} from '../../../redux/recipes/types';
import {WEBCONST} from '../../../constants/webConstants';
import {ShadowStyle} from '../../../components/backgrounds/menuSquareCartContainerRecipes';
import {
  ProfileNavigation,
  ProfileSingleRecipeNavigationProps,
} from '../../../navigation/Profile/ProfileNavigator.types';
import {cleanUpshoppingList} from '../../../redux/recipes/shoppingList/shoppinList.slice';

const SingleRecipe = () => {
  const dispatch = useAppDispatch();
  const prop1 = useRoute<RecipesToProfilePageScreenProp['route']>();
  const prop2 = useRoute<ProfileSingleRecipeNavigationProps['route']>();
  const fromProfile = prop2.params.from === 'Profile';
  const route = fromProfile ? prop2 : prop1;

  //@ts-ignore
  const recipeParam = route.params.recipe
    ? //@ts-ignore
      route.params.recipe
    : //@ts-ignore
      route.params.recipeGet;
  const [recipe, SetRecipe] = useState<IRecipe | null>(null);
  useEffect(() => {
    SetRecipe(recipeParam);
  }, [recipeParam]);
  let ingNumber = 0;
  let ingNumberTips = 0;
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  const navigationFromProfile = useNavigation<ProfileNavigation>();

  return (
    <LoggedInBackground>
      <View style={{flexGrow: 1, width: '100%', paddingHorizontal: 10}}>
        <View
          style={{
            width: '100%',
            aspectRatio: 1.5,
            backgroundColor: 'rgba(80,80,80,.2)',
            borderRadius: 15,
          }}>
          {recipe && recipe.image && (
            <Image
              style={[ShadowStyle.underImage, {width: '100%', height: '100%'}]}
              source={{
                uri: `${WEBCONST().STORAGEURLNEW}${
                  recipe.image.path
                }?${new Date().getTime()}`,
              }}
            />
          )}
        </View>
        <View style={styles.MenuList}>
          <Text style={styles.RecipeTitle}>{recipe?.title}</Text>
          <Text style={styles.clasicText}>{recipe?.description}</Text>
          <View>
            <Text style={styles.RecipeSubTitle}>Ingredients:</Text>
            {recipe?.ingredients.map(ingredient => {
              ingNumber++;
              return (
                <Text
                  key={ingredient._id}
                  style={styles.clasicTextSide}
                  ellipsizeMode={'middle'}>
                  {ingNumber}. {ingredient.qtt} {ingredient.unit}{' '}
                  {ingredient.name}
                </Text>
              );
            })}
          </View>
          {recipe && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (fromProfile)
                    navigationFromProfile.navigate(
                      'AddShoppingListFromProfile',
                      {
                        recipeId: recipe?._id,
                        ingredientsList: recipe?.ingredients,
                        tipIngredientsList: recipe?.tipIngredients,
                        from: 'Profile',
                      },
                    );
                  else
                    navigation.navigate('Add Shopping Lists', {
                      recipeId: recipe?._id,
                      ingredientsList: recipe?.ingredients,
                      tipIngredientsList: recipe?.tipIngredients,
                      from: 'Recipe',
                    });
                  dispatch(cleanUpshoppingList());
                }}>
                <Text style={{color: 'white', fontWeight: '800'}}>
                  Buy Ingredients
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            <Text style={styles.RecipeSubTitle}>Manual:</Text>
            {recipe?.manual.map(manual => {
              ingNumber++;
              return (
                <Text
                  key={manual._id}
                  style={styles.clasicTextSide}
                  ellipsizeMode={'middle'}>
                  {manual.stepNumber}. {manual.description}
                </Text>
              );
            })}
          </View>
        </View>
        {recipe?.tipDescription !== '' && recipe?.tipTitle !== '' && (
          <View style={styles.MenuList}>
            <Text style={styles.RecipeTitle}>Tips:</Text>
            <Text style={styles.RecipeSubTitle}>{recipe?.tipTitle}</Text>
            <Text style={styles.clasicText}>{recipe?.tipDescription}</Text>
            <View>
              <Text style={styles.RecipeSubTitle}>Ingredients:</Text>
              {recipe?.tipIngredients.map(ingredient => {
                ingNumberTips++;
                return (
                  <Text
                    key={ingredient._id}
                    style={styles.clasicTextSide}
                    ellipsizeMode={'middle'}>
                    {ingNumberTips}. {ingredient.qtt} {ingredient.unit}{' '}
                    {ingredient.name}
                  </Text>
                );
              })}
            </View>
            {recipe && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    if (fromProfile)
                      navigationFromProfile.navigate(
                        'AddShoppingListFromProfile',
                        {
                          recipeId: recipe?._id,
                          ingredientsList: recipe?.ingredients,
                          tipIngredientsList: recipe?.tipIngredients,
                          from: 'Profile',
                        },
                      );
                    else
                      navigation.navigate('Add Shopping Lists', {
                        recipeId: recipe?._id,
                        ingredientsList: recipe?.ingredients,
                        tipIngredientsList: recipe?.tipIngredients,
                        from: 'Recipe',
                      });
                  }}>
                  <Text style={{color: 'white', fontWeight: '800'}}>
                    Buy Ingredients
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View>
              <Text style={styles.RecipeSubTitle}>Manual:</Text>
              {recipe?.tipManual.map(manual => {
                ingNumber++;
                return (
                  <Text
                    key={manual._id}
                    style={styles.clasicTextSide}
                    ellipsizeMode={'middle'}>
                    {manual.stepNumber}. {manual.description}
                  </Text>
                );
              })}
            </View>
          </View>
        )}
        <View style={styles.MenuList}>
          <Text style={styles.RecipeSubTitle}>
            Different recipes from {recipe?.owner?.name}:
          </Text>
          {/* <View>//TODO: implement recipes from author</View> */}
        </View>
        <View style={styles.MenuList}>
          <Text style={styles.RecipeSubTitle}>Tags</Text>
          {recipe?.tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                navigation.navigate('Find Recipes', {
                  recipesTag: tag,
                });
              }}>
              <Text style={styles.clasicTextTagSide}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LoggedInBackground>
  );
};

const styles = StyleSheet.create({
  RecipeTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginVertical: 10,
  },
  clasicText: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  clasicTextSide: {
    width: '100%',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    marginBottom: 5,
    ellipsizeMode: 'end',
  },
  clasicTextTagSide: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    marginBottom: 5,
    ellipsizeMode: 'end',
  },
  RecipeSubTitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
    marginVertical: 20,
  },
  button: {
    width: '50%',
    backgroundColor: '#EA3651',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  MenuList: {
    flex: 1,
    width: '100%',
    marginBottom: 50,
  },
});

export default SingleRecipe;
