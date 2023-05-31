import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IIngredient} from '../../../redux/recipes/types';
import OnOfDot from './OnOfDot';
import {RecipeStyles} from '../../../Pages/signedIn/recipes/Recipesadd';
import TextInputWithNumberInc from './TextInputWithNumberInc';

const SingleIngredient = ({
  ingredient,
  setShoppingList,
  shoppingList,
}: {
  ingredient: IIngredient;
  setShoppingList: React.Dispatch<React.SetStateAction<IIngredient[]>>;
  shoppingList: IIngredient[];
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [qtt, setQtt] = useState<number>(ingredient.qtt);
  const [unit, setUnit] = useState<string>(ingredient.unit);
  useEffect(() => {
    if (isSelected) {
      setShoppingList([
        ...shoppingList,
        {
          _id: ingredient._id,
          qtt,
          unit,
          name: ingredient.name,
          isIngredientEditable: true,
          isIngredientVisible: true,
          pricePerIngredient: 0,
        },
      ]);
    }
    if (isSelected === false) {
      const filteredShoppingList = shoppingList.filter(
        shl => shl._id !== ingredient._id,
      );
      setShoppingList(filteredShoppingList);
    }
  }, [isSelected, isSelected, qtt, unit]);

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.05)',
        margin: 2,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
      }}>
      <OnOfDot isSelected={isSelected} setIsSelected={setIsSelected} />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <Text style={RecipeStyles.TextSimple}>{ingredient.name}</Text>
      </View>
      <TextInputWithNumberInc qtt={qtt} setQtt={setQtt} />
      <TextInput
        onChangeText={text => setUnit(text)}
        value={unit}
        style={{
          color: '#fff',
          paddingHorizontal: 5,
          borderBottomColor: '#fff',
          borderBottomWidth: 1,
          marginHorizontal: 5,
          textAlign: 'center',
        }}></TextInput>
    </View>
  );
};

export default SingleIngredient;

const styles = StyleSheet.create({});
