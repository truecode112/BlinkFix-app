import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  getShoppinglists,
  IShoppingList,
} from '../../../redux/recipes/shoppingList/getShoppinglists.thunk';
import GetSingleShoppingList from '../../../components/recipes/ShoppingList/GetSingleShoppingList';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ISingleShoppingListEditNavigation} from '../../../navigation/types';
import {IRecipe} from '../../../redux/recipes/types';
import {deleteShoppingListThunk} from '../../../redux/recipes/shoppingList/deleteShoppingList.thunk';
import Spinner from 'react-native-spinkit';
import DropShadow from 'react-native-drop-shadow';

const RecipesShoppinglists = () => {
  const dispatch = useAppDispatch();
  const getShoppingListState = useAppSelector(state => state.shoppingList);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getShoppinglists());
    }, []),
  );
  const [listState, setListState] = useState<
    | {
        shoppingList: IShoppingList;
        recipe?: IRecipe | undefined;
      }[]
    | null
    | undefined
  >([]);

  const {height} = useWindowDimensions();
  useEffect(() => {
    if (getShoppingListState.data?.length !== 0) {
      setListState(getShoppingListState.data);
    }
  }, [getShoppingListState]);
  const navigation = useNavigation<ISingleShoppingListEditNavigation>();

  return (
    <LoggedInBackground
      stickyButton={() => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('AddShoppingListClear');
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../../../assets/utilityIcons/addIcon.png')}
            />
          </TouchableOpacity>
        );
      }}>
      {getShoppingListState.isLoading === true && (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner
            color="#ea3651"
            type="Circle"
            style={{width: 100, aspectRatio: 1}}
          />
        </View>
      )}
      <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
        <ScrollView
          horizontal={true}
          style={{
            width: '100%',
            maxHeight: height - 200,
          }}
          contentContainerStyle={{
            width: '100%',
          }}
          scrollEnabled={false}>
          <SwipeListView
            style={{width: '100%', flex: 1}}
            disableRightSwipe
            keyExtractor={rowData => {
              return rowData.shoppingList._id.toString();
            }}
            data={listState}
            closeOnScroll
            renderItem={(data, rowMap) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SingleShoppingListEdit', {
                    list: data.item.shoppingList,
                    recipe: data.item.recipe,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <GetSingleShoppingList
                    List={data.item.shoppingList}
                    recipe={data.item.recipe}
                    index={data.item.shoppingList?._id.slice(-8)}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      rowMap[data.item.shoppingList._id].closeRow();
                      dispatch(
                        deleteShoppingListThunk(data.item.shoppingList._id),
                      );
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                          backgroundColor: '#EA3651',
                          borderRadius: 5,
                        }}>
                        <Text style={{color: '#fff', fontSize: 13}}>
                          Delete
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  width: 80,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </ScrollView>
      </View>
    </LoggedInBackground>
  );
};

const styles = StyleSheet.create({
  MenuSquareCartContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 2,
    borderRadius: 10,
  },
});

export default RecipesShoppinglists;
