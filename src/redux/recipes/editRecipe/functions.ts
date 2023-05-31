import {ICuisine, IRecipe} from './../types';
import {Alert} from 'react-native';
import {cleanUpRecipeEdit} from './editRecipe.slice';
import {IEditRecipe} from './editRecipe.thunk';

export const checkStringNull = (
  string: string | null | undefined,
  title?: string,
): boolean => {
  if (string === undefined) {
    return true;
  }
  if (string === '') {
    Alert.alert(
      'Validation',
      `${title} is to short. Try to use longer text instead`,
      [{onPress: () => cleanUpRecipeEdit()}],
    );
    return false;
  }

  if (title === 'Cook Time' || title === 'Prep Time') {
    if (string) {
      const regex = new RegExp('^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$');
      const stringValid = regex.test(string);
      if (!stringValid) {
        Alert.alert(
          'Validation',
          `${title} not match the pattern HH:MM in 24h system`,
          [{onPress: () => cleanUpRecipeEdit()}],
        );
        return false;
      }
    } else return false;
  }

  return true;
};

export const checktIfCategoryIsChoosen = (category: string | null): boolean => {
  if (category === null) return false;
  return false;
};

export const convertIRecipeToIEditRecipe = (recipe: IRecipe): IEditRecipe => {
  //
  const cuisineCode = convertCuisineCode(recipe.cuisine);
  return {
    title: recipe.title,
    image: recipe.image,
    description: recipe.description,
    cuisineCode: cuisineCode,
    isKosher: recipe.isKosher,
    isVegan: recipe.isVegan,
    isHalal: recipe.isHalal,
    dishesType: recipe.dishesType,
    spiceness: recipe.spiceness,
    // TODO: fix it
    ingredientsList: recipe.ingredients?.map(singredient => {
      return {
        name: singredient.name,
        qtt: singredient.qtt,
        unit: singredient.unit,
      };
    }),
    advancement: recipe.advancement,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    serves: recipe.serves,
    manualList: recipe.manual.map(item => {
      return {
        description: item.description,
        stepNumber: item.stepNumber,
      };
    }),
    tipTitle: recipe.tipTitle,
    tipDescription: recipe.tipDescription,
    tipIngredientsList: recipe.tipIngredients.map(singredient => {
      return {
        name: singredient.name,
        qtt: singredient.qtt,
        unit: singredient.unit,
      };
    }),
    tipManualList: recipe.tipManual.map(item => {
      return {
        description: item.description,
        stepNumber: item.stepNumber,
      };
    }),
    tags: recipe.tags,
  };
};
export function convertCuisineCode(cuisine: ICuisine) {
  return cuisine.name;
}
