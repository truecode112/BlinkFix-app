import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputRecipe from '../../../components/TextInputs/TextInputRecipe';
import {IIngredientList} from './Recipesadd';
import DelleteDot from '../../../components/Icons/delleteDot';
import uuid from 'react-native-uuid';
import {IIngredientEdit} from '../../../redux/recipes/editRecipe/editRecipe.thunk';
import OutsidePressHandler from 'react-native-outside-press';

export const IngredientControllerEdit = ({
  ingredientsList,
  setIngredientsList,
}: {
  ingredientsList: IIngredientEdit[] | null | undefined;
  setIngredientsList: (props: IIngredientEdit[]) => void;
}) => {
  const [ingredient, setIngredient] = useState<IIngredientEdit>();

  useEffect(() => {
    ingredientsList?.map(item => {
      item.index = uuid.v4().toString();
      return item;
    });
  }, [ingredientsList]);

  const setupingredientsList = async () => {
    if (ingredient) {
      if (
        ingredient.name === '' ||
        ingredient.unit === '' ||
        ingredient.qtt === ''
      ) {
        Alert.alert('you have to provide ingredient information');
      } else {
        if (ingredientsList)
          setIngredientsList([...ingredientsList, ingredient]);
      }
    } else if (ingredient === undefined)
      Alert.alert('you have to provide ingredient information');
    setIngredient({name: '', unit: '', qtt: ''});
  };

  const [isIngredientunitVisible, setIsIngredientunitVisible] =
    useState<boolean>(false);

  return (
    <View style={{width: '100%'}}>
      {ingredientsList !== undefined && (
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginVertical: 8,
              color: 'white',
              textAlign: 'center',
              textTransform: 'capitalize',
            }}>
            Recipe ingredients
          </Text>
          {ingredientsList?.map((ingredient, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(0,0,0,.15)',
                  marginVertical: 3,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', marginVertical: 4}}>
                  {ingredient.qtt} {ingredient.unit}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    marginVertical: 4,
                    marginHorizontal: 20,
                    flexWrap: 'wrap',
                  }}>
                  {ingredient.name}
                </Text>
                <DelleteDot
                  onPress={() => {
                    const filteredIngredients = ingredientsList.filter(
                      item => ingredient.index !== item.index,
                    );
                    setIngredientsList(filteredIngredients);
                  }}
                />
              </View>
            );
          })}
        </View>
      )}
      <View>
        <Text
          style={{
            color: '#fff',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Add ingredients
        </Text>
        <TextInputRecipe
          placeholder="qtt"
          value={ingredient?.qtt?.toString()}
          onChange={setIngredient}
          name={'qtt'}
          state={ingredient}
        />
        <RenderIngredientUnitList
          ingredient={ingredient}
          isIngredientunitVisible={isIngredientunitVisible}
          setIsIngredientunitVisible={setIsIngredientunitVisible}
          setIngredient={setIngredient}
          unitList={unitList}
        />
        <TextInputRecipe
          placeholder="Name"
          value={ingredient?.name}
          onChange={setIngredient}
          name={'name'}
          state={ingredient}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={setupingredientsList}
            style={{
              backgroundColor: '#EA3651',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}>Add ingredient</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const unitList = [
  {id: 0, unit: 'gram'},
  {id: 1, unit: 'kilogram'},
  {id: 2, unit: 'milliliter'},
  {id: 3, unit: 'liter'},
  {id: 4, unit: 'piece'},
];
export const IngredientController = ({
  ingredientsList,
  setIngredientsList,
}: {
  ingredientsList: IIngredientList[];
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredientList[]>>;
}) => {
  const [ingredient, setIngredient] = useState<IIngredientList>();

  const setupingredientsList = async () => {
    if (ingredient) {
      if (
        ingredient.name === '' ||
        ingredient.unit === '' ||
        ingredient.qtt === ''
      ) {
        Alert.alert('you have to provide ingredient information');
      } else {
        setIngredientsList([...ingredientsList, ingredient]);
      }
    } else if (ingredient === undefined)
      Alert.alert('you have to provide ingredient information');
    setIngredient({name: '', unit: '', qtt: '', _id: null});
  };
  const [isIngredientunitVisible, setIsIngredientunitVisible] =
    useState<boolean>(false);

  return (
    <View style={{width: '100%'}}>
      {ingredientsList !== undefined && (
        <View>
          {ingredientsList?.map((ingredient, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(0,0,0,.15)',
                  marginVertical: 3,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', marginVertical: 4}}>
                  {ingredient.qtt} {ingredient.unit}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    marginVertical: 4,
                    marginHorizontal: 20,
                    flexWrap: 'wrap',
                  }}>
                  {ingredient.name}
                </Text>
                <DelleteDot
                  onPress={() => {
                    const filteredIngredients = ingredientsList.filter(
                      item => ingredient._id !== item._id,
                    );
                    setIngredientsList(filteredIngredients);
                  }}
                />
              </View>
            );
          })}
        </View>
      )}
      <View>
        <Text
          style={{
            color: '#fff',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Add ingredients
        </Text>
        <TextInputRecipe
          placeholder="qtt"
          value={ingredient?.qtt?.toString()}
          onChange={setIngredient}
          name={'qtt'}
          state={ingredient}
        />
        <RenderIngredientUnitList
          ingredient={ingredient}
          isIngredientunitVisible={isIngredientunitVisible}
          setIsIngredientunitVisible={setIsIngredientunitVisible}
          setIngredient={setIngredient}
          unitList={unitList}
        />

        {/* <TextInputRecipe
          placeholder="Unit"
          value={ingredient?.unit}
          onChange={setIngredient}
          name={'unit'}
          state={ingredient}
        /> */}
        <TextInputRecipe
          placeholder="Name"
          value={ingredient?.name}
          onChange={setIngredient}
          name={'name'}
          state={ingredient}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={setupingredientsList}
            style={{
              backgroundColor: '#EA3651',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}>Add ingredient</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export function RenderIngredientUnitList({
  setIsIngredientunitVisible,
  isIngredientunitVisible,
  ingredient,
  unitList,
  setIngredient,
}: {
  setIsIngredientunitVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isIngredientunitVisible: boolean;
  ingredient: IIngredientList | IIngredientEdit | undefined;
  unitList: {id: number; unit: string}[];
  setIngredient:
    | React.Dispatch<React.SetStateAction<IIngredientList | undefined>>
    | React.Dispatch<React.SetStateAction<IIngredientEdit | undefined>>;
}) {
  return (
    <OutsidePressHandler
      disabled={false}
      onOutsidePress={() => {
        setIsIngredientunitVisible(false);
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setIsIngredientunitVisible(!isIngredientunitVisible);
        }}>
        <View
          style={{
            borderRadius: 5,
            justifyContent: 'center',
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: '#00000025',
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                paddingHorizontal: 20,
                color: !ingredient?.unit ? '#00000035' : '#fff',
                overflow: 'hidden',
              }}>
              {!ingredient?.unit ? 'select unit' : ingredient.unit}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: !isIngredientunitVisible ? 0 : undefined,
              overflow: 'hidden',
            }}>
            {unitList.map(ingred => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    // @ts-ignore
                    setIngredient({
                      ...ingredient,
                      name: ingredient?.name ? ingredient?.name : '',
                      unit: ingred.unit,
                    });
                    setIsIngredientunitVisible(false);
                  }}
                  key={ingred.id}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: !ingredient?.unit ? '#00000035' : '#fff',
                      width: '100%',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 5,
                      backgroundColor: '#00000005',
                      overflow: 'hidden',
                      textAlign: 'justify',
                    }}>
                    {ingred.unit}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </OutsidePressHandler>
  );
}
