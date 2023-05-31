import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getMyRecipes} from '../../../redux/recipes/myRecipes/myRecipes.thunk';
import RecipesLists from '../../../components/recipes/recipesLists';
import {instance} from '../../../redux/interceptors';
import CategoryRecipesSelector from '../../../components/categorySelector';
import {
  allCategoriesRecipe,
  category,
} from '../../../components/categorySelector/allCategories';
import {IRecipe} from '../../../redux/recipes/types';
import Spinner from 'react-native-spinkit';
import {getAllRecipes} from '../../../redux/recipes/recipesThunks';

const Recipesmy = () => {
  const {data, isLoading} = useAppSelector(state => state.myRecipes);
  const [recipes, setRecipes] = useState<IRecipe[]>();
  useEffect(() => {
    if (data) setRecipes(data);
  }, [data]);
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(null);
  const [dishesType, setDishesType] = useState<category>();

  useEffect(() => {
    const allDishesType = allCategoriesRecipe();
    const selectedType = allDishesType.find(
      element => element.index === selected,
    );

    if (selectedType) setDishesType(selectedType);
    if (selected === null) {
      dispatch(getMyRecipes());
    }
  }, [selected]);

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getMyRecipes({category: dishesType?.cagetoryName}));
  }, [dishesType]);

  return (
    <LoggedInBackground>
      {/* //TODO: implement best recipes */}
      <CategoryRecipesSelector
        selected={selected}
        setSelected={setSelected}
        categoriesProp={allCategoriesRecipe()}
      />
      <View style={{flex: 1}}>
        {isLoading ? (
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
        ) : (
          <View style={{maxHeight: 450}}>
            <RecipesLists recipes={recipes} title={'My recipes'} />
          </View>
        )}
      </View>
    </LoggedInBackground>
  );
};

export default Recipesmy;
