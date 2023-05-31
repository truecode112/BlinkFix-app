import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {ICartItemItem} from '../../../../../../redux/Order/shoppingCart.slice';
import {IEstablishment} from '../../../../../../redux/Profile/types';
import {WEBCONST} from '../../../../../../constants/webConstants';
import {Textstyles} from '../../../../menupages/contact';
import SingleOrderItem from '../../../../../../components/Order/ShoppingCart/SingleOrderItem';
import {current} from '@reduxjs/toolkit';

const SingleOrderItemInWaiterCart = ({
  item,
}: {
  item: {
    orderWhere: string;
    orderItems: ICartItemItem;
    establishment: IEstablishment;
  };
}) => {
  const {orderItems} = item;
  const itemsIngredients = orderItems.item.dishIngredients;
  const changes = orderItems.changes;
  const mappedChanges = changes.map(item => {
    const ingredient = itemsIngredients.find(
      ingredient => ingredient._id === item.ingredientId,
    );
    return {...ingredient, qtt: item.qtt};
  });

  const totalPrice = mappedChanges.reduce((prev, current) => {
    const currentPrice = current.pricePerIngredient
      ? current.pricePerIngredient
      : 0;
    const qtt = current.qtt;
    const newPrive = prev + currentPrice;
    return newPrive * parseFloat(qtt);
  }, 0);
  const BXicon = require('../../../../../../assets/BX.png');
  const width = useWindowDimensions().width;
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.itemImage}
          source={
            orderItems.item.image
              ? {
                  uri: `${WEBCONST().STORAGEURLNEW}${
                    orderItems.item.image?.path
                  }`,
                }
              : BXicon
          }
        />
        <View
          style={[
            {
              marginRight: 15,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            },
          ]}>
          <Text style={[Textstyles.text]}>{orderItems.item.dishName}</Text>
          <Text style={[Textstyles.text]}>{orderItems.item.price}</Text>
        </View>
      </View>
      <View>
        {orderItems.changes.length !== 0 &&
          mappedChanges.map(change => {
            const totalChangePrice =
              (change.pricePerIngredient ? change.pricePerIngredient : 0) *
              parseFloat(change.qtt);
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: width - 80,
                  marginLeft: 40,
                }}>
                <Text style={[Textstyles.text]}>{change.qtt} </Text>
                <Text style={[Textstyles.text]}>{change.name} </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[
                    Textstyles.text,
                    {
                      maxWidth: width - 150,
                      flex: 1,
                    },
                  ]}>
                  ................................................................................................................................................................................................................
                </Text>
                <Text style={[Textstyles.text]}>{totalChangePrice}</Text>
              </View>
            );
          })}
      </View>
      {changes.length !== 0 && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
            paddingVertical: 10,
          }}>
          <Text style={[Textstyles.text, {marginRight: 15}]}>
            <Text> Total price:</Text>
            <Text style={[Textstyles.text]}>
              {totalPrice + orderItems.item.price}
            </Text>
          </Text>
        </View>
      )}
    </>
  );
};

export default SingleOrderItemInWaiterCart;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 80,
    backgroundColor: '#00000015',
  },
});
