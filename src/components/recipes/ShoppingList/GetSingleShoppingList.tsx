import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IRecipe, ShoppingListItemGet} from '../../../redux/recipes/types';
import {RecipesHomePageScreenProp} from '../../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {RecipeStyles} from '../../../Pages/signedIn/recipes/Recipesadd';
import {WEBCONST} from '../../../constants/webConstants';
import {IShoppingList} from '../../../redux/recipes/shoppingList/getShoppinglists.thunk';

const GetSingleShoppingList = ({
  List,
  recipe,
  index,
}: {
  List: IShoppingList;
  recipe?: IRecipe;
  index?: string;
}) => {
  const dateYear = List.createdAt;
  const createdDate = new Date(dateYear);

  return (
    <View style={styles.listContainer}>
      <View style={styles.pseudoImage}>
        {recipe?.image && (
          <Image
            style={{height: '100%', width: '100%'}}
            source={{
              uri: `${WEBCONST().STORAGEURLNEW}${
                recipe.image?.path
              }?${new Date().getTime()}`,
            }}
          />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={RecipeStyles.TextSimple2}>
          {recipe ? recipe.title : 'Shopping list #' + index}
        </Text>
        <Text style={RecipeStyles.TextSimple2}>{recipe?.description}</Text>
      </View>
      <View style={{height: '100%'}}>
        <Text style={[RecipeStyles.TextSimple2, {fontSize: 10}]}>
          {createdDate.toLocaleDateString()}
        </Text>
        <Text style={[RecipeStyles.TextSimple2, {fontSize: 10}]}>
          {createdDate.toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};

export default GetSingleShoppingList;

const styles = StyleSheet.create({
  pseudoImage: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: '#cac',
    borderRadius: 5,
  },
  listContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    height: 80,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 3,
  },
});
