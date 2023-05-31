import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import Profile from '../../Pages/signedIn/Profile/Profile';
import SingleEmployee from '../../Pages/signedIn/Profile/SingleEmployee';
import {ProfileParamList} from './ProfileNavigator.types';
import ProfileNavigationAddMenuItems from '../../Pages/signedIn/Profile/AddMenuItem';
import ProfileNavigationEditMenuItemsPage from '../../Pages/signedIn/Profile/EditMenuItem';
import EditRecipes from '../../Pages/signedIn/recipes/EditRecipePage';
import Recipesadd from '../../Pages/signedIn/recipes/Recipesadd';
import SingleRecipe from '../../Pages/signedIn/recipes/SingleRecipe';
import RecipeAddToShoppingList from '../../Pages/signedIn/recipes/recipeAddToShoppingList';
import RecipesShoppinglists from '../../Pages/signedIn/recipes/ShoppingList';
import Singleinvoice from '../../Pages/signedIn/Profile/singleinvoice';
import CreateEstablishment from '../../Pages/signedIn/menupages/establishment/createEstablishment';
import AddAllergenToMenuItem from '../../Pages/signedIn/Profile/AddAllergenToMenuItem/AddAllergenToMenuItem.component';
import Workspace from '../../Pages/signedIn/Profile/jobs/Workspace/Workspace.component';
import WaiterInitialPage from '../../Pages/signedIn/Profile/jobs/JobsContainers/WaiterSection/WaiterInitialPage';
import WaiterMenu from '../../Pages/signedIn/Profile/jobs/JobsContainers/WaiterSection/WaiterMenu';
import WaiterSection from '../../Pages/signedIn/Profile/jobs/JobsContainers/WaiterSection/WaiterSection.component';
import WaiterInfoSection from '../../Pages/signedIn/Profile/jobs/JobsContainers/WaiterSection/WaiterInfoSection';
import ModalAddMenuItem from '../../Pages/signedIn/Order/ModalAddMenuItem';
import WaiterOrderCart from '../../Pages/signedIn/Profile/jobs/JobsContainers/WaiterSection/WaiterOrderCart';
import ChefsActiveOrders from '../../Pages/signedIn/Profile/jobs/JobsContainers/ChefSection/ChefsActiveOrders';

export const ProfileNavigationContainer = () => {
  const Stack = createNativeStackNavigator<ProfileParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="ProfileHome">
      <Stack.Screen name="ProfileHome" component={Profile} />
      <Stack.Screen name="SingleEmployee" component={SingleEmployee} />
      <Stack.Screen name="Workspace" component={Workspace} />
      <Stack.Screen name="WaiterListOfOrders" component={WaiterOrderCart} />
      <Stack.Screen name="WorkspaceWaiterMenu" component={WaiterSection} />
      <Stack.Screen
        name="WaiterMenuItemAddModal"
        component={ModalAddMenuItem}
      />
      <Stack.Screen name="WorkspaceInfo" component={WaiterInfoSection} />
      <Stack.Screen name="ChefsActiveOrders" component={ChefsActiveOrders} />
      <Stack.Screen
        name="AddMenuItem"
        component={ProfileNavigationAddMenuItems}
      />
      <Stack.Screen
        name="EditMenuItem"
        component={ProfileNavigationEditMenuItemsPage}
      />
      <Stack.Screen name="AddRecipeFromProfile" component={Recipesadd} />
      <Stack.Screen name="EditRecipeFromProfile" component={EditRecipes} />
      <Stack.Screen name="SingleRecipeFromProfile" component={SingleRecipe} />
      <Stack.Screen
        name="AddShoppingListFromProfile"
        component={RecipeAddToShoppingList}
      />
      <Stack.Screen
        name="ShoppingListsFromProfile"
        component={RecipesShoppinglists}
      />
      <Stack.Screen name="SingleInvoiceFromProfile" component={Singleinvoice} />
      <Stack.Screen
        name="createestablishment"
        component={CreateEstablishment}
      />
      <Stack.Screen name="AddAllergens" component={AddAllergenToMenuItem} />
    </Stack.Navigator>
  );
};
