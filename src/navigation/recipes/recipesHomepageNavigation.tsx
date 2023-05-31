import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import EditRecipes from '../../Pages/signedIn/recipes/EditRecipePage';
import RecipeAddToShoppingList from '../../Pages/signedIn/recipes/recipeAddToShoppingList';
import Recipesadd from '../../Pages/signedIn/recipes/Recipesadd';
import RecipesFind from '../../Pages/signedIn/recipes/Recipesfind';
import RecipesShoppinglists from '../../Pages/signedIn/recipes/ShoppingList';
import Recipesmy from '../../Pages/signedIn/recipes/Recipesmy';
import SingleRecipe from '../../Pages/signedIn/recipes/SingleRecipe';
import SingleShoppingListEdit from '../../Pages/signedIn/recipes/SingleShoppingListEdit';
import ISingleShoppingListEdit from '../../Pages/signedIn/recipes/SingleShoppingListEdit';
import {RecipesHomeStackParamList} from '../types';
import AddShoppingListClearPage from '../../Pages/signedIn/recipes/AddShoppingListClearPage';

const RecipesHomeNavigation = () => {
  const Stack = createNativeStackNavigator<RecipesHomeStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="Find Recipes">
      <Stack.Screen name="Find Recipes" component={RecipesFind} />
      <Stack.Screen name="Edit Recipe" component={EditRecipes} />
      <Stack.Screen name="Single Recipe" component={SingleRecipe} />
      <Stack.Screen name="My Recipes" component={Recipesmy} />
      <Stack.Screen name="Add Recipes" component={Recipesadd} />
      <Stack.Screen name="Shopping Lists" component={RecipesShoppinglists} />
      <Stack.Screen
        name="AddShoppingListClear"
        component={AddShoppingListClearPage}
      />

      <Stack.Screen
        name="Add Shopping Lists"
        component={RecipeAddToShoppingList}
      />
      <Stack.Screen
        name="SingleShoppingListEdit"
        component={SingleShoppingListEdit}
      />
    </Stack.Navigator>
  );
};

export default RecipesHomeNavigation;
