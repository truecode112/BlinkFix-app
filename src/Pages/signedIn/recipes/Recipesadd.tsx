import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import AddImage from '../../../components/image/addImage';
import {ImagePickerResponse} from 'react-native-image-picker';
import TextInputRecipe from '../../../components/TextInputs/TextInputRecipe';
import CuisineSearchbar from '../../../components/categorySelector/cuisineSearchbar';
import OnOfButton from '../../../components/recipes/OnOfButton';
import CategoryRecipesSelector from '../../../components/categorySelector';
import SpicenessSelector from '../../../components/TextInputs/SpicenessSelector';
import {ManualController} from './ManualController';
import {IngredientController} from './IngredientController';
import TagController from '../../../components/recipes/TagController';
import {cleanUpAddRecipe} from '../../../redux/recipes/addRecipe/addRecipe';
import {
  addRecipeMainImageThunk,
  addRecipeThunk as addRecipe,
} from '../../../redux/recipes/addRecipe/addRecipe.thunk';
import {allCategoriesRecipe} from '../../../components/categorySelector/allCategories';
import AdvancementButton from '../../../components/recipes/AdvancementButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RecipesHomePageScreenProp} from '../../../navigation/types';
import {isStringValid} from '../../../redux/recipes/addRecipe/functions';
import PillButton from '../../../components/recipes/PillButton';
import {createFormData} from '../../../utils/photos/handleFormdata';
import {
  ProfileAddRecipeNavigationProps,
  ProfileNavigation,
  ProfileNavigationProps,
} from '../../../navigation/Profile/ProfileNavigator.types';
import {IRecipe} from '../../../redux/recipes/types';

//#region initial
export interface IIngredientList {
  _id?: string | null;
  qtt?: string;
  unit: string;
  name: string;
}
export interface IManualList {
  _id?: string | null;
  stepNumber?: string;
  description?: string;
  imageUrl?: ImagePickerResponse;
  index?: string | null;
}
export interface IRecipeAdd {
  title: string;
  description: string;
  cuisineCode: string | null;
  isKosher: boolean;
  isVegan: boolean;
  isHalal: boolean;
  dishesType: string;
  spiceness: 'extra hot' | 'Hot' | 'Mild' | 'normal';
  ingredientsList: IIngredientList[];
  isEstablishment: boolean;
  advancement: 1 | 2 | 3 | 4 | 5 | null;
  prepTime: string;
  cookTime: string;
  serves: string;
  manualList: IManualList[];
  tipTitle: string;
  tipDescription: string;
  tipIngredientsList: IIngredientList[];
  tipManualList: IManualList[];
  tags: string[];
}
const initialState: IRecipeAdd = {
  title: 'test from pc',
  description: 'tes2',
  cuisineCode: 'pl',
  isKosher: false,
  isVegan: false,
  isHalal: false,
  dishesType: 'Bakeries',
  spiceness: 'normal',
  isEstablishment: false,
  advancement: 1,
  prepTime: '01:30',
  cookTime: '02:00',
  serves: '12',
  ingredientsList: [
    {
      name: 'a',
      unit: 'b',
      qtt: '12',
    },
    {
      name: 'b',
      unit: 'c',
      qtt: '1',
    },
    {
      name: 'b',
      unit: 'c',
      qtt: '11',
    },
  ],
  manualList: [
    {
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, nobis?',
      stepNumber: '1',
    },
    {
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, nobis?',
      stepNumber: '2',
    },
    {
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, nobis?',
      stepNumber: '3',
    },
  ],
  tipTitle: '',
  tipDescription: '',
  tipIngredientsList: [],
  tipManualList: [],
  tags: [],
};
//#endregion
const Recipesadd = () => {
  //
  const route = useRoute<ProfileAddRecipeNavigationProps['route']>();
  const from = route.params?.from;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  const navigationProfile = useNavigation<ProfileNavigation>();

  const allRecipes = useAppSelector(state => state.recipes.data);

  const [recipeAdd, setRecipeAdd] = useState<IRecipeAdd>(initialState);
  //#region state for manualList
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(0);
  const [cuisineCode, setCuisineCode] = useState<string | null>(null);
  const [isEstablishment, setIsEstablishment] = useState<boolean>(false);
  const [spiceness, setSpiceness] = useState<
    'normal' | 'extra hot' | 'Hot' | 'Mild'
  >('normal');
  const [advancement, setAdvancement] = useState<1 | 2 | 3 | 4 | 5 | null>(
    initialState.advancement,
  );
  const [manualList, setManualList] = useState<IManualList[]>(
    initialState.manualList,
  );
  const [ingredientsList, setIngredientsList] = useState<IIngredientList[]>(
    initialState.ingredientsList,
  );
  const [tipManualList, setTipManualList] = useState<IManualList[]>(
    initialState.tipManualList,
  );
  const [tipIngredientsList, setTipIngredientsList] = useState<
    IIngredientList[]
  >(initialState.tipIngredientsList);
  const [tags, setTags] = useState<string[]>([]);

  //#endregion

  //#region effects
  useEffect(() => {
    setRecipeAdd({
      ...recipeAdd,
      advancement,
    });
  }, [advancement]);
  useEffect(() => {
    setRecipeAdd({
      ...recipeAdd,
      spiceness,
    });
  }, [spiceness]);

  useEffect(() => {
    if (cuisineCode) setRecipeAdd({...recipeAdd, cuisineCode: cuisineCode});
  }, [cuisineCode]);

  useEffect(() => {
    setRecipeAdd({
      ...recipeAdd,
      manualList: manualList,
      ingredientsList,
      tipManualList,
      tipIngredientsList,
      tags,
    });
  }, [manualList, ingredientsList, tipManualList, tipIngredientsList, tags]);
  useEffect(() => {
    const allDishesType = allCategoriesRecipe();
    const selectedType = allDishesType.find(
      element => element.index === selected,
    );
    if (selectedType)
      setRecipeAdd({...recipeAdd, dishesType: selectedType.cagetoryName});
  }, [selected]);

  useEffect(() => {
    setRecipeAdd({...recipeAdd, isEstablishment});
  }, [isEstablishment]);

  const [newRecipe, setNewRecipe] = useState<IRecipe | null>(null);
  useEffect(() => {
    const recipefilter = allRecipes?.filter(
      state => state._id === lastRecipeAdded,
    )[0];
    if (recipefilter) setNewRecipe(recipefilter);
  }, [allRecipes]);
  //#endregion

  const {succes, error, lastRecipeAdded} = useAppSelector(
    state => state.addRecipe,
  );
  useEffect(() => {
    if (error)
      Alert.alert('Problem with validation', JSON.stringify(error), [
        {
          text: 'ok',
          onPress: () => {
            dispatch(cleanUpAddRecipe());
          },
        },
      ]);
  }, [error]);

  useEffect(() => {
    if (succes === true && !image) {
      dispatch(cleanUpAddRecipe());
    }
    if (succes === true && image && lastRecipeAdded) {
      if (image.assets && image.assets[0] && image.assets[0].fileName) {
        const data = createFormData(image.assets[0], 'recipeItem');
        dispatch(
          addRecipeMainImageThunk({recipeId: lastRecipeAdded, image: data}),
        );
        if (from === 'Profile' && newRecipe && newRecipe.image) {
          if (newRecipe)
            navigationProfile.navigate('SingleRecipeFromProfile', {
              recipe: newRecipe,
              from: 'Profile',
            });
        }
      } else navigation.navigate('My Recipes');
      dispatch(cleanUpAddRecipe());
    }
    if (succes === true && lastRecipeAdded) {
      if (allRecipes) {
        const recipe = allRecipes.filter(
          recipe => recipe._id === lastRecipeAdded,
        )[0];
        if (recipe) {
          if (from === 'Profile') {
            if (newRecipe)
              navigationProfile.navigate('SingleRecipeFromProfile', {
                recipe: newRecipe,
                from: 'Profile',
              });
          } else navigation.navigate('My Recipes');
          dispatch(cleanUpAddRecipe());
        }
      }
    }
  }, [succes, lastRecipeAdded, image, newRecipe]);

  const [isTipsVisible, setIsTipsVisible] = useState<boolean>(false);
  const profileRole = useAppSelector(state => state.profile.data?.userRole);

  return (
    <LoggedInBackground>
      <View style={{flex: 1, flexGrow: 1, width: '100%', alignItems: 'center'}}>
        <AddImage image={image} setImage={setImage} />
        {/* is establishment */}
        {/* //TODO: if in profile not establishment dont allowa as establishment */}
        {/* TODO: in version 2 corporation profile  */}
        {/* {(profileRole === 'Student' ||
          profileRole === 'Restaurant' ||
          profileRole === 'Food trucks' ||
          profileRole === 'Local Cook' ||
          profileRole === 'Shop') && (
          <View
            style={{flexDirection: 'row', width: '100%', marginVertical: 10}}>
            <OnOfButton
              isOpen={isEstablishment}
              name="Establishment"
              setIsOpen={() => setIsEstablishment(true)}
            />
            <OnOfButton
              isOpen={!isEstablishment}
              name="User"
              setIsOpen={() => setIsEstablishment(false)}
            />
          </View>
        )} */}
        <Text style={styles.TextSimple}>Title:</Text>
        <TextInputRecipe
          name="title"
          placeholder="Title"
          value={recipeAdd?.title}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Description:</Text>
        <TextInputRecipe
          name="description"
          placeholder="Description"
          value={recipeAdd?.description}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Advancement:</Text>
        <AdvancementButton
          selected={advancement}
          setSelected={setAdvancement}
        />
        <Text style={styles.TextSimple}>Cuisine:</Text>
        <CuisineSearchbar setCuisineCode={setCuisineCode} />
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <OnOfButton
            isOpen={recipeAdd?.isHalal}
            name="Halal"
            setIsOpen={() =>
              setRecipeAdd({...recipeAdd, isHalal: !recipeAdd.isHalal})
            }
          />
          <OnOfButton
            isOpen={recipeAdd?.isVegan}
            name="Vegan"
            setIsOpen={() =>
              setRecipeAdd({...recipeAdd, isVegan: !recipeAdd.isVegan})
            }
          />
          <OnOfButton
            isOpen={recipeAdd?.isKosher}
            name="Kosher"
            setIsOpen={() =>
              setRecipeAdd({...recipeAdd, isKosher: !recipeAdd.isKosher})
            }
          />
        </View>
        <Text style={styles.TextSimple}>Dishes type:</Text>
        <CategoryRecipesSelector
          selected={selected}
          setSelected={setSelected}
          categoriesProp={allCategoriesRecipe()}
        />
        <Text style={styles.TextSimple}>Spiceness:</Text>
        <SpicenessSelector setSpiceness={setSpiceness} />
        <Text style={styles.TextSimple}>Cook time (HH:MM):</Text>
        <TextInputRecipe
          name="cookTime"
          placeholder="Cook time (HH:MM)"
          value={recipeAdd?.cookTime}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Prep time (HH:MM):</Text>
        <TextInputRecipe
          name="prepTime"
          placeholder="Prep time (HH:MM)"
          value={recipeAdd?.prepTime}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        <Text style={styles.TextSimple}>Serves:</Text>
        <TextInputRecipe
          name="serves"
          placeholder="Number of serves"
          value={recipeAdd?.serves}
          onChange={setRecipeAdd}
          state={recipeAdd}
        />
        {ingredientsList.length > 0 && (
          <Text style={styles.TextTitle}>Ingredients</Text>
        )}
        <IngredientController
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
        />
        {recipeAdd.manualList.length !== 0 && (
          <Text style={styles.TextTitle}>Manual</Text>
        )}

        <Text style={styles.TextSimple}>Add recipe step:</Text>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            width: '100%',
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
          }}>
          <ManualController
            manualList={manualList}
            setManualList={setManualList}
          />
        </View>

        {recipeAdd.tags.length !== 0 && (
          <Text style={styles.TextTitle}>Tags</Text>
        )}
        <Text style={styles.TextSimple}>Add Tag</Text>
        <TagController tags={tags} setTags={setTags} />
        <View
          style={{
            width: '100%',
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.TextTitle}>Do you want to add extra steps</Text>
          <PillButton status={isTipsVisible} setStatus={setIsTipsVisible} />
        </View>
      </View>
      {isTipsVisible && (
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={styles.TextTitle}> Exta steps for better taste</Text>
          <Text style={styles.TextSimple}>Title for tips:</Text>

          <TextInputRecipe
            name="tipTitle"
            placeholder="Title for the tip"
            value={recipeAdd?.tipTitle}
            onChange={setRecipeAdd}
            state={recipeAdd}
          />
          <Text style={styles.TextSimple}>Desciption for tips:</Text>

          <TextInputRecipe
            name="tipDescription"
            placeholder="description for the tip"
            value={recipeAdd?.tipDescription}
            onChange={setRecipeAdd}
            state={recipeAdd}
          />

          {tipIngredientsList.length > 0 && (
            <Text style={styles.TextTitle}>Ingredients for tips</Text>
          )}
          <IngredientController
            ingredientsList={tipIngredientsList}
            setIngredientsList={setTipIngredientsList}
          />
          {recipeAdd.tipManualList.length !== 0 && (
            <Text style={styles.TextTitle}>Manual for tips</Text>
          )}

          <Text style={styles.TextSimple2}>Add tip step:</Text>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.15)',
              width: '100%',
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
            }}>
            <ManualController
              manualList={tipManualList}
              setManualList={setTipManualList}
            />
          </View>
        </View>
      )}
      <View style={{marginVertical: 20}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#EA3651',
            padding: 20,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={async () => {
            const validation = await validateRecipeAdd(recipeAdd);
            if (!validation) dispatch(addRecipe(recipeAdd));
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            Submit new Recipe
          </Text>
        </TouchableOpacity>
      </View>
    </LoggedInBackground>
  );
};

const styles = StyleSheet.create({
  TextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'white',
  },
  insideButtonSelector: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'red',
  },
  TextSimple: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'white',
    textAlign: 'left',
  },
  TextSimple2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'white',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
});
export {styles as RecipeStyles};
export default Recipesadd;

const validateRecipeAdd = async (recipe: IRecipeAdd): Promise<boolean> => {
  try {
    if (!isStringValid(recipe.title, 'title')) return false;
    if (!isStringValid(recipe.description, 'description')) return false;
    if (!isStringValid(recipe.cuisineCode, 'cuisine')) return false;
    if (!isStringValid(recipe.cookTime, 'Cook Time')) return false;
    if (!isStringValid(recipe.prepTime, 'Prep Time')) return false;
    if (!isStringValid(recipe.serves, 'Serves')) return false;
    if (checkList(recipe.ingredientsList, 'Ingredient List')) return false;
    if (!checkList(recipe.manualList, 'Manual List')) return false;
    if (recipe.tipTitle) {
      if (!checkList(recipe.tipIngredientsList, 'Tip Ingredient List'))
        return false;
      if (!checkList(recipe.tipManualList, 'Tip Manual List')) return false;
    }
  } catch (error) {
    return false;
  }
  return true;
};
const checkList = (
  ingredientsList: IIngredientList[] | IManualList[] | string[],
  title: string,
): boolean => {
  if (ingredientsList.length === 0) {
    Alert.alert(
      'Validation',
      `${title} to short.\n You have to provide at least one ingredient`,
      [{onPress: () => cleanUpAddRecipe()}],
    );
    return false;
  }
  return true;
};
