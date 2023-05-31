import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import RecipesLists from '../../../components/recipes/recipesLists';
import {FindScreenProps} from '../../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  getAllRecipes,
  getAllRecipesByCategory,
  getAllRecipesByTag,
} from '../../../redux/recipes/recipesThunks';
import {useFocusEffect} from '@react-navigation/native';
import {instance} from '../../../redux/interceptors';
import CategoryRecipesSelector from '../../../components/categorySelector';
import {allCategoriesRecipe} from '../../../components/categorySelector/allCategories';
import Spinner from 'react-native-spinkit';
import CuisineSearchbar from '../../../components/categorySelector/cuisineSearchbar';
import addRecipe from '../../../redux/recipes/addRecipe/addRecipe';

const RecipesFind = ({route}: FindScreenProps) => {
  const tag = route.params?.recipesTag;
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(null);
  const [cuisine, setCuisine] = useState<string | null>(null);
  const [cuisineCode, setCuisineCode] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const allCateg = allCategoriesRecipe();
  const {data, isLoading} = useAppSelector(state => state.recipes);

  useEffect(() => {
    const selecetedCategory = allCateg.find(c => c.index === selected);
    setCategory(selecetedCategory ? selecetedCategory.cagetoryName : null);
  }, [selected]);

  useEffect(() => {
    if (cuisine || category) {
      dispatch(getAllRecipes({cuisine, category}));
    }
  }, [cuisineCode, category]);

  useFocusEffect(
    React.useCallback(() => {
      if (selected === null && !cuisine) {
        dispatch(getAllRecipes());
      }
    }, [selected, cuisine]),
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cuisine) dispatch(getAllRecipes({cuisine, category: category}));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [cuisine, category]);

  const allRecipes = useAppSelector(state => state.recipes.data);
  return (
    <LoggedInBackground>
      <CuisineSearchbar setCuisineCode={setCuisineCode} />
      <CategoryRecipesSelector
        selected={selected}
        setSelected={setSelected}
        categoriesProp={allCategoriesRecipe()}
      />
      {!isLoading ? (
        <>
          {tag && (
            <View style={{height: 400}}>
              <RecipesLists tag={tag} recipes={allRecipes} />
            </View>
          )}
          <View style={{height: 400}}>
            <RecipesLists recipes={allRecipes} />
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner
            // style={styles.spinner}
            isVisible={isLoading}
            size={100}
            type={'ThreeBounce'}
            color={'#EA3651'}
          />
        </View>
      )}
    </LoggedInBackground>
  );
};

export default RecipesFind;
