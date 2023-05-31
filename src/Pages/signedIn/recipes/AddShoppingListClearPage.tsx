import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';

import {StringInput} from '../../../components/Profile/Sections/infoScetion/AllergiesSection';
import {Textstyles} from '../menupages/contact';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {addClearShoppingListThunk} from '../../../redux/recipes/shoppingList/addShoppinglist.thunk';
import {useNavigation} from '@react-navigation/native';
import {RecipesHomePageScreenProp} from '../../../navigation/types';
import {cleanUpshoppingListClear} from '../../../redux/recipes/shoppingList/addShoppingListClear.slice';

export interface IIngredientShoppingList {
  name: string;
  qtt: string;
  unit: string;
  index?: string;
}

const AddShoppingListClearPage = () => {
  const [ingredientsList, setIngredientsList] = useState<
    IIngredientShoppingList[]
  >([]);
  const [newIngredients, setNewIngredients] = useState<IIngredientShoppingList>(
    {
      name: '',
      qtt: '',
      unit: '',
    },
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRefName = useRef<TextInput>(null);
  const textInputRefUnit = useRef<TextInput>(null);
  const textInputRefqtt = useRef<TextInput>(null);
  useEffect(() => {
    setTimeout(() => {
      if (ingredientsList.length > 0) scrollViewRef.current?.scrollToEnd();
    }, 100);
  }, [ingredientsList]);

  const [scrollviewHegith, setScrollviewHegith] = useState(500);
  const {width, height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const SubmitNewShoppingList = () => {
    dispatch(addClearShoppingListThunk({ingredients: ingredientsList}));
    dispatch(cleanUpshoppingListClear());
    //
  };

  const {succes, error, isLoading} = useAppSelector(
    state => state.shoppingListClear,
  );
  const navigation = useNavigation<RecipesHomePageScreenProp>();
  useEffect(() => {
    if (error) {
      Alert.alert('Something went wrong', error);
    }
    if (!isLoading && !error && succes) {
      navigation.navigate('Shopping Lists');
      dispatch(cleanUpshoppingListClear());
    }
  }, [error, succes, isLoading]);
  return (
    <LoggedInBackground disabledScroll={false}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        extraScrollHeight={50}
        style={{
          marginBottom: 20,
          alignSelf: 'center',
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          {ingredientsList.length !== 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={[Textstyles.text, {textTransform: 'capitalize'}]}>
                name
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[Textstyles.text, {textTransform: 'capitalize'}]}>
                  {' '}
                  qtt{' '}
                </Text>
                <Text style={[Textstyles.text, {textTransform: 'capitalize'}]}>
                  {' '}
                  unit{' '}
                </Text>
              </View>
            </View>
          )}
          <ScrollView
            ref={scrollViewRef}
            style={{
              flexGrow: 1,
              maxHeight: scrollviewHegith,
              minHeight: height / 3.5,
            }}
            onLayout={e => {
              setScrollviewHegith(e.nativeEvent.layout.height);
            }}
            contentContainerStyle={{}}>
            <ScrollView
              horizontal
              scrollEnabled={false}
              contentContainerStyle={{height: '100%'}}>
              <SwipeListView
                scrollEnabled={false}
                style={{width: '100%', flex: 1}}
                contentContainerStyle={{height: '100%'}}
                data={ingredientsList}
                disableRightSwipe
                swipeRowStyle={{marginVertical: 5}}
                keyExtractor={rowData => {
                  return rowData.index
                    ? rowData.index
                    : `${rowData.name}${rowData.qtt}${rowData.unit}`;
                }}
                closeOnScroll
                renderItem={(data, rowMap) => (
                  <View
                    style={{
                      width: width - 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        maxHeight: 50,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 5,
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          width: '100%',
                        }}>
                        <Text
                          style={[
                            Textstyles.text,
                            {
                              textTransform: 'capitalize',
                              display: 'flex',
                              width: width / 1.7,
                            },
                          ]}>
                          {' '}
                          {data.item.name}{' '}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={[
                              Textstyles.text,
                              {
                                textTransform: 'capitalize',
                                textAlign: 'center',
                              },
                            ]}>
                            {' '}
                            {data.item.qtt}{' '}
                          </Text>
                          <Text
                            style={[
                              Textstyles.text,
                              {
                                textTransform: 'capitalize',
                                textAlign: 'center',
                              },
                            ]}>
                            {' '}
                            {data.item.unit}{' '}
                          </Text>
                        </View>
                      </View>
                      {/* Button delete
                     // 
                     // 
                    */}
                      <TouchableOpacity
                        onPress={() => {
                          const filteredData = ingredientsList.filter(
                            element => element.index !== data.item.index,
                          );
                          setIngredientsList(filteredData);
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 5,
                              backgroundColor: '#EA3651',
                              borderRadius: 5,
                              width: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 10,
                              maxHeight: 50,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 13,
                                textAlign: 'center',
                              }}>
                              Delete
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 180,
                    }}></View>
                )}
                leftOpenValue={80}
                rightOpenValue={-120}
              />
            </ScrollView>
          </ScrollView>
          <>
            <Text
              style={[
                Textstyles.text,
                Textstyles.title,
                {marginBottom: 0, marginTop: 10},
              ]}>
              Ingredient Name
            </Text>
            <StringInput
              ref={textInputRefName}
              type="noBottom"
              editable={false}
              onChange={text =>
                setNewIngredients({...newIngredients, name: text})
              }
              placeholder={'Ingredient Name'}
              value={newIngredients.name}
            />
            <Text
              style={[
                Textstyles.text,
                Textstyles.title,
                {marginBottom: 0, marginTop: 0},
              ]}>
              Ingredient Quantity
            </Text>
            <StringInput
              ref={textInputRefqtt}
              editable={false}
              onChange={text => {
                const sanitizedText = text.replace(',', '.');
                const regex = /^\d*\.?\d*$/;

                const test = new RegExp(regex);
                if (test.test(sanitizedText))
                  setNewIngredients({...newIngredients, qtt: sanitizedText});
              }}
              placeholder={'Ingredient Quantity'}
              value={newIngredients.qtt}
            />
            <Text
              style={[
                Textstyles.text,
                Textstyles.title,
                {marginBottom: 0, marginTop: 0},
              ]}>
              Ingredient Unit
            </Text>
            <StringInput
              ref={textInputRefUnit}
              editable={false}
              onChange={text =>
                setNewIngredients({...newIngredients, unit: text})
              }
              placeholder={'Ingredient Unit'}
              value={newIngredients.unit}
            />
            <SubmitButton
              title="Add item"
              onPress={async () => {
                if (newIngredients.name.length === 0) {
                  Alert.alert(
                    'Validation Error',
                    'Please enter a name of the ingredient and try again',
                    [
                      {
                        onPress: () => {
                          if (textInputRefName.current)
                            textInputRefName.current.focus();
                        },
                      },
                    ],
                  );
                  return;
                }

                if (newIngredients.unit.length === 0) {
                  Alert.alert(
                    'Validation Error',
                    'Please enter unit of the ingredient and try again',
                    [
                      {
                        onPress: () => {
                          if (textInputRefUnit.current)
                            textInputRefUnit.current.focus();
                        },
                      },
                    ],
                  );
                  return;
                }
                if (newIngredients.qtt.length === 0) {
                  Alert.alert(
                    'Validation Error',
                    'Please enter qtt of the ingredient and try again',
                    [
                      {
                        onPress: () => {
                          if (textInputRefqtt.current)
                            textInputRefqtt.current?.focus();
                        },
                      },
                    ],
                  );
                  textInputRefqtt.current?.focus();
                  return;
                }
                const newIngredientsArray = [
                  ...ingredientsList,
                  {...newIngredients, index: generateRandomId(10)},
                ];
                setIngredientsList(newIngredientsArray);
                setNewIngredients({
                  name: '',
                  qtt: '',
                  unit: '',
                });
              }}
            />
            <SubmitButton
              style={{marginVertical: 20}}
              onPress={SubmitNewShoppingList}
              title="Add new Shopping list"
            />
          </>
        </View>
      </KeyboardAwareScrollView>
    </LoggedInBackground>
  );
};

export default AddShoppingListClearPage;

function generateRandomId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const styles = StyleSheet.create({});
