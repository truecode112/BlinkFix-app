import {StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ICartItemItem,
  IShoppingCart,
} from '../../../redux/Order/shoppingCart.slice';
import CartItem from './CartItem';
import {useAppSelector} from '../../../redux/hooks';
import {uniqueId} from 'lodash';

const ShoppingListSingleItem = ({
  item,
  selectedItems,
  setSelectedItems,
}: {
  item: IShoppingCart;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItems: string[];
}) => {
  const {cartItems} = useAppSelector(state => state.ShoppingCart);

  const [cartItemsState, setCartItemsState] = useState<
    {title: string; data: ICartItemItem[]; shoppingCart: IShoppingCart}[]
  >([]);

  useEffect(() => {
    if (cartItems) {
      const newCartItems = cartItems.map(item => {
        return {
          title: item.establishment.name,
          data: item.orderItems,
          shoppingCart: item,
        };
      });

      setCartItemsState(newCartItems);
    }
  }, [cartItems]);
  return (
    <View key={item.orderWhere} style={{width: '100%'}}>
      {item.orderItems?.map((orderItem, id) => {
        return (
          <CartItem
            shoppingCartItems={cartItemsState[id].shoppingCart}
            key={uniqueId()}
            item={orderItem}
            id={orderItem.index}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            specificItemId={id}
          />
        );
      })}
    </View>
  );
};

export default ShoppingListSingleItem;

const styles = StyleSheet.create({});
