import {
  Alert,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ICartItemItem,
  IShoppingCart,
} from '../../../redux/Order/shoppingCart.slice';
import DropShadow from 'react-native-drop-shadow';
import {ShadowStyle} from '../../backgrounds/menuSquareCartContainerRecipes';
import {WEBCONST} from '../../../constants/webConstants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getTextDifference} from './SingleOrderItem';

const CartItem = (props: {
  item: ICartItemItem;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  id: string;
  specificItemId?: number;
  shoppingCartItems: IShoppingCart;
}) => {
  const {changes, item, itemId} = props.item;
  const ids = changes?.flatMap(item => item.ingredientId);
  const changedIngredients = item.dishIngredients.filter(itemInShoppingCart => {
    if (itemInShoppingCart.isIngredientVisible)
      return ids?.indexOf(itemInShoppingCart._id) !== -1;
  });

  const [totalIngredient, setTotalIngredient] = useState(0);

  const {width} = useWindowDimensions();

  const totalOfAllIngredients = changes
    .map(change => {
      const ingerdient = item.dishIngredients.filter(
        ing => ing._id === change.ingredientId,
      )[0];

      const difference = parseFloat(change.qtt) - ingerdient.qtt;
      const totalPerIngredient =
        ingerdient.pricePerIngredient * (difference > 0 ? difference : 0);
      return totalPerIngredient;
    })
    .reduce((prev, sum) => prev + sum, 0);

  useEffect(() => {
    setTotalIngredient(parseFloat(item.price) + totalOfAllIngredients);
  }, [item]);

  const SelectCartItem = () => {
    if (props.specificItemId || props.specificItemId === 0) {
      const clickedItem =
        props.shoppingCartItems.orderItems[props.specificItemId];
      if (props.selectedItems?.includes(props.specificItemId.toString())) {
        props.setSelectedItems(
          props.selectedItems.filter(
            item => item !== props.specificItemId?.toString(),
          ),
        );
      } else
        props.setSelectedItems([
          ...props.selectedItems,
          props.specificItemId.toString(),
        ]);
    }
  };
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#ffffff22',
        borderBottomWidth: 1,
        borderTopColor: '#ffffff22',
        borderTopWidth: 1,
      }}>
      <View style={{flexDirection: 'row', height: 100, alignItems: 'center'}}>
        <TouchableOpacity onPress={SelectCartItem}>
          <View
            style={{
              borderWidth: 1,
              width: 20,
              height: 20,
              borderRadius: 5,
              borderColor: '#fff',
              marginRight: 10,
              backgroundColor: '#ffffff15',
            }}>
            {props.selectedItems.includes(
              props.specificItemId === 0 || props.specificItemId
                ? props.specificItemId.toString()
                : '',
            ) && <Text style={{color: '#fff', textAlign: 'center'}}>✓</Text>}
          </View>
        </TouchableOpacity>
        <DropShadow
          style={[
            ShadowStyle.underImage,
            {
              paddingVertical: 10,
            },
          ]}>
          <Image
            style={{
              width: 50,
              height: '50%',
              aspectRatio: 1,
              borderRadius: 50,
              marginRight: 10,
            }}
            source={
              item.image
                ? {
                    uri: `${WEBCONST().STORAGEURLNEW}${item.image?.path}`,
                  }
                : require('../../../assets/BX.png')
            }
          />
        </DropShadow>
        <View
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',

            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,

            height: '100%',
          }}>
          <Text
            style={{
              fontFamily: 'Handlee-Regular',
              textAlign: 'center',
              fontSize: 18,
              color: '#fff',
              marginBottom: 10,
              width: 'auto',
            }}>
            {item.dishName}
          </Text>
          <Text
            style={{
              fontFamily: 'Handlee-Regular',
              textAlign: 'center',
              fontSize: 18,
              color: '#fff',
              marginBottom: 10,
              width: 'auto',
            }}>
            {item.currency} {item.price}
          </Text>
        </View>
      </View>

      {changedIngredients.length !== 0 && (
        <>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Handlee-Regular',
              maxWidth: width - 50,
              fontSize: 14,
              color: '#fff',
            }}>
            ingredients:
          </Text>

          {changedIngredients &&
            changedIngredients.length !== 0 &&
            changedIngredients?.map((ingredientEdited, index) => {
              const ingredientFromChanges = changes.filter(
                item => item.ingredientId === ingredientEdited._id,
              )[0];
              const difference =
                (ingredientFromChanges.qtt
                  ? parseFloat(ingredientFromChanges.qtt)
                  : 1.0) - (ingredientEdited.qtt ? ingredientEdited.qtt : 1);
              const totalPerIngredient =
                ingredientEdited.pricePerIngredient *
                (difference > 0 ? difference : 0);
              return (
                <>
                  <Text
                    style={{
                      fontFamily: 'Handlee-Regular',
                      maxWidth: width - 50,
                      fontSize: 14,
                      color: '#4d4d4d',
                    }}
                    key={ingredientEdited._id}>
                    {getTextDifference(
                      difference,
                      ingredientEdited.unit,
                      ingredientEdited.name,
                    )}
                  </Text>
                </>
              );
            })}
        </>
      )}
      <Text style={styles.text}>
        Sum: {totalIngredient} {item.currency}
      </Text>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'right',
    marginVertical: 10,
    fontSize: 20,
    fontFamily: 'Handlee-Regular',
  },
});
