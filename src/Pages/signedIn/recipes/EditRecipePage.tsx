import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import AddImage from '../../../components/image/addImage';
import {ImagePickerResponse} from 'react-native-image-picker';
import TextInputRecipe from '../../../components/TextInputs/TextInputRecipe';
import CuisineSearchbar from '../../../components/categorySelector/cuisineSearchbar';
import OnOfButton from '../../../components/recipes/OnOfButton';
import CategoryRecipesSelector from '../../../components/categorySelector';
import SpicenessSelector from '../../../components/TextInputs/SpicenessSelector';
import {ManualControllerEdit} from './ManualController';
import {IngredientControllerEdit} from './IngredientController';
import TagController from '../../../components/recipes/TagController';
import {cleanUpAddRecipe} from '../../../redux/recipes/addRecipe/addRecipe';
import {allCategoriesRecipe} from '../../../components/categorySelector/allCategories';
import AdvancementButton from '../../../components/recipes/AdvancementButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  RecipesHomePageScreenProp,
  RecipesToProfilePageScreenProp,
} from '../../../navigation/types';
import {
  isStringValid,
  isHoursValid,
} from '../../../redux/recipes/addRecipe/functions';
import PillButton from '../../../components/recipes/PillButton';
import {convertIRecipeToIEditRecipe} from '../../../redux/recipes/editRecipe/functions';
import {
  editRecipeThunk,
  IEditRecipe,
  IIngredientEdit,
  IManualEdit,
} from '../../../redux/recipes/editRecipe/editRecipe.thunk';
import {cleanUpRecipeEdit} from '../../../redux/recipes/editRecipe/editRecipe.slice';
import {addRecipeMainImageThunk} from '../../../redux/recipes/addRecipe/addRecipe.thunk';
import {createFormData} from '../../../utils/photos/handleFormdata';
import {
  ProfileEditRecipeNavigationProps,
  ProfileNavigation,
} from '../../../navigation/Profile/ProfileNavigator.types';
import {getAllRecipes} from '../../../redux/recipes/recipesThunks';

const EditRecipes = () => {
  const route = useRoute<ProfileEditRecipeNavigationProps['route']>();
  const dispatch = useAppDispatch();
  const navigationProfile = useNavigation<ProfileNavigation>();

  //@ts-ignore
  const recipe = route.params.recipeGet;

  const [recipeEdit, setRecipeEdit] = useState<IEditRecipe | null>(null);
  useEffect(() => {
    if (recipe) {
      const recipeToEdit = convertIRecipeToIEditRecipe(recipe);
      setRecipeEdit(recipeToEdit);
    }
  }, [recipe]);
  //#region state for manualList
  const [image, setImage] = useState<ImagePickerResponse | null>();
  const [selected, setSelected] = useState<
    0 | 8 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | null
  >(0);

  const [spiceness, setSpiceness] = useState<
    'normal' | 'extra hot' | 'Hot' | 'Mild'
  >('normal');

  const [advancement, setAdvancement] = useState<1 | 2 | 3 | 4 | 5 | null>(
    null,
  );

  //#region effects
  useEffect(() => {
    if (recipeEdit)
      setRecipeEdit({
        ...recipeEdit,
        advancement: advancement,
      });
  }, [advancement]);

  //
  useEffect(() => {
    if (recipeEdit && spiceness !== null)
      setRecipeEdit({
        ...recipeEdit,
        spiceness,
      });
  }, [spiceness]);

  useEffect(() => {
    const allDishesType = allCategoriesRecipe();
    const selectedType = allDishesType.find(
      element => element.index === selected,
    );
    if (recipeEdit && selectedType)
      setRecipeEdit({...recipeEdit, dishesType: selectedType.cagetoryName});
  }, [selected]);

  //#endregion

  const {succes, error, data} = useAppSelector(state => state.editRecipe);

  useEffect(() => {
    if (data && succes && !image)
      navigationProfile.navigate('SingleRecipeFromProfile', {
        recipe: data,
        from: 'Recipe',
      });

    if (data && succes && image)
      navigationProfile.navigate('SingleRecipeFromProfile', {
        recipe: data,
        from: 'Recipe',
      });
    dispatch(cleanUpRecipeEdit());
  }, [succes]);

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

  function SubmitEditRecipe() {
    return async () => {
      if (recipeEdit) {
        const validation = await validateRecipeAdd(recipeEdit);
        if (validation)
          dispatch(editRecipeThunk({data: recipeEdit, recipeId: recipe._id}));
        dispatch(cleanUpRecipeEdit());
        if (image && image.assets) {
          const data = createFormData(image.assets[0], 'recipeItem');
          dispatch(
            addRecipeMainImageThunk({image: data, recipeId: recipe._id}),
          );
        }
      }
    };
  }

  const [isTipsVisible, setIsTipsVisible] = useState<boolean>(false);

  return (
    <LoggedInBackground>
      <>
        <View
          style={{flex: 1, flexGrow: 1, width: '100%', alignItems: 'center'}}>
          <AddImage
            image={image}
            setImage={setImage}
            imageFromRecipe={recipe.image}
          />
        </View>
        <Text style={styles.TextSimple}>Title:</Text>
        <TextInputRecipe
          name="title"
          placeholder="Title"
          value={recipeEdit?.title}
          onChange={setRecipeEdit}
          state={recipeEdit}
        />
        <Text style={styles.TextSimple}>Description:</Text>
        <TextInputRecipe
          name="description"
          placeholder="Description"
          value={recipeEdit?.description}
          onChange={setRecipeEdit}
          state={recipeEdit}
        />
        <Text style={styles.TextSimple}>Advancement:</Text>
        <AdvancementButton
          selected={recipeEdit ? recipeEdit.advancement : null}
          setSelected={setAdvancement}
        />
        <Text style={styles.TextSimple}>Cuisine:</Text>
        <CuisineSearchbar
          setCuisineCode={(cuisineCode: string) => {
            if (recipeEdit) setRecipeEdit({...recipeEdit, cuisineCode});
          }}
          initialSelectedCuisine={recipeEdit ? recipeEdit.cuisineCode : 'dupa'}
        />
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <OnOfButton
            isOpen={recipeEdit?.isHalal}
            name="Halal"
            setIsOpen={() => {
              if (recipeEdit)
                setRecipeEdit({...recipeEdit, isHalal: !recipeEdit?.isHalal});
            }}
          />
          <OnOfButton
            isOpen={recipeEdit?.isVegan}
            name="Vegan"
            setIsOpen={() =>
              recipeEdit &&
              setRecipeEdit({...recipeEdit, isVegan: !recipeEdit?.isVegan})
            }
          />
          <OnOfButton
            isOpen={recipeEdit?.isKosher}
            name="Kosher"
            setIsOpen={() =>
              recipeEdit &&
              setRecipeEdit({...recipeEdit, isKosher: !recipeEdit?.isKosher})
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
          value={recipeEdit?.cookTime}
          onChange={setRecipeEdit}
          state={recipeEdit}
        />
        <Text style={styles.TextSimple}>Prep time (HH:MM):</Text>
        <TextInputRecipe
          name="prepTime"
          placeholder="Prep time (HH:MM)"
          value={recipeEdit?.prepTime}
          onChange={setRecipeEdit}
          state={recipeEdit}
        />
        <Text style={styles.TextSimple}>Serves:</Text>
        <TextInputRecipe
          name="serves"
          placeholder="Number of serves"
          value={recipeEdit?.serves.toString()}
          onChange={setRecipeEdit}
          state={recipeEdit}
        />
      </>
      {recipeEdit?.ingredientsList &&
        recipeEdit?.ingredientsList.length > 0 && (
          <Text style={styles.TextTitle}>Ingredients</Text>
        )}

      <IngredientControllerEdit
        ingredientsList={recipeEdit ? recipeEdit.ingredientsList : null}
        setIngredientsList={props =>
          recipeEdit && setRecipeEdit({...recipeEdit, ingredientsList: props})
        }
      />

      {recipeEdit?.manualList.length !== 0 && (
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
        <ManualControllerEdit
          manualList={recipeEdit ? recipeEdit.manualList : null}
          setManualList={(value: IManualEdit[]) => {
            if (recipeEdit) setRecipeEdit({...recipeEdit, manualList: value});
          }}
        />
      </View>

      {recipeEdit?.tags.length !== 0 && (
        <Text style={styles.TextTitle}>Tags</Text>
      )}
      <Text style={styles.TextSimple}>Add Tag</Text>
      <TagController
        tags={recipeEdit?.tags}
        setTags={(data: string[]) => {
          if (recipeEdit) setRecipeEdit({...recipeEdit, tags: data});
        }}
      />
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
            value={recipeEdit?.tipTitle}
            onChange={setRecipeEdit}
            state={recipeEdit}
          />
          <Text style={styles.TextSimple}>Desciption for tips:</Text>

          <TextInputRecipe
            name="tipDescription"
            placeholder="description for the tip"
            value={recipeEdit?.tipDescription}
            onChange={setRecipeEdit}
            state={recipeEdit}
          />

          {recipeEdit?.tipIngredientsList &&
            recipeEdit?.tipIngredientsList.length > 0 && (
              <Text style={styles.TextTitle}>Ingredients for tips</Text>
            )}
          <IngredientControllerEdit
            ingredientsList={recipeEdit?.tipIngredientsList}
            setIngredientsList={props =>
              recipeEdit &&
              setRecipeEdit({...recipeEdit, tipIngredientsList: props})
            }
          />
          {recipeEdit?.tipManualList.length !== 0 && (
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
            <ManualControllerEdit
              manualList={recipeEdit ? recipeEdit.tipManualList : null}
              setManualList={(value: IManualEdit[]) => {
                if (recipeEdit)
                  setRecipeEdit({...recipeEdit, tipManualList: value});
              }}
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
          onPress={SubmitEditRecipe()}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Edit Recipe</Text>
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
export default EditRecipes;

const validateRecipeAdd = async (recipe: IEditRecipe): Promise<boolean> => {
  try {
    if (!isStringValid(recipe.title, 'title')) {
      return false;
    }
    if (!isStringValid(recipe.description, 'description')) {
      return false;
    }
    if (!isStringValid(recipe.cuisineCode, 'cuisine')) {
      return false;
    }
    if (!isHoursValid(recipe.cookTime, 'Cook Time')) {
      return false;
    }
    if (!isHoursValid(recipe.prepTime, 'Prep Time')) {
      return false;
    }
    if (!isStringValid(recipe.serves, 'Serves')) {
      return false;
    }
    if (!checkList(recipe.ingredientsList, 'Ingredient List')) {
      return false;
    }
    if (!checkList(recipe.manualList, 'Manual List')) {
      return false;
    }
    if (recipe.tipTitle) {
      if (!checkList(recipe.tipIngredientsList, 'Tip Ingredient List')) {
        return false;
      }
      if (!checkList(recipe.tipManualList, 'Tip Manual List')) {
        return false;
      }
    }
  } catch (error) {
    {
      return false;
    }
  }
  return true;
};
const checkList = (
  ingredientsList: IIngredientEdit[] | IManualEdit[] | string[],
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
