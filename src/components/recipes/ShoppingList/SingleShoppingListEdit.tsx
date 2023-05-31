import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ShoppingListItem} from '../../../redux/recipes/types';
import OnOfDot from '../ingredients/OnOfDot';
import {RecipeStyles} from '../../../Pages/signedIn/recipes/Recipesadd';
import {IIngredientShoppingList} from '../../../redux/recipes/shoppingList/getShoppinglists.thunk';

const SingleIngredientListEdit = ({
  ingredient,
  ingList,
  setIngList,
}: {
  ingredient: IIngredientShoppingList;
  setIngList: React.Dispatch<React.SetStateAction<IIngredientShoppingList[]>>;
  ingList: IIngredientShoppingList[];
}) => {
  const [isDone, setIsDone] = useState<boolean>(ingredient.isDone);
  useEffect(() => {
    const editedList = ingList?.map(item => {
      if (item._id === ingredient._id) {
        return {...item, isDone: isDone};
      } else return item;
    });
    setIngList(editedList);
  }, [isDone]);
  return (
    <View style={styles.ingredientContainer}>
      <OnOfDot isSelected={isDone} setIsSelected={setIsDone} />
      <View style={styles.ingredientContentContainer}>
        <Text style={RecipeStyles.TextSimple2}>{ingredient.name}</Text>
        <Text style={RecipeStyles.TextSimple2}>
          {ingredient.qtt} {ingredient.unit}
        </Text>
      </View>
    </View>
  );
};

export default SingleIngredientListEdit;

const styles = StyleSheet.create({
  ingredientContentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: 50,
  },
});
