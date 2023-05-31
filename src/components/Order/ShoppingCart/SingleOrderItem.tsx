import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ICartItemItem} from '../../../redux/Order/shoppingCart.slice';
import {TextStyles} from '../../../Pages/signedIn/Order/PaymentPage';

const SingleOrderItem = ({
  item,
  index,
  setTotalPrice,
  totalPrice,
}: {
  item: ICartItemItem;
  index: number;
  setTotalPrice: React.Dispatch<
    React.SetStateAction<
      {
        totalAmount: number;
        itemId: string;
      }[]
    >
  >;
  totalPrice: {
    totalAmount: number;
    itemId: string;
  }[];
}) => {
  const [sumPerMenuItem, setSumPerMenuItem] = useState(0);
  useEffect(() => {
    const singleItem = item.item;
    setSumPerMenuItem(sum => sum + parseFloat(singleItem.price));
  }, [item.item]);

  useEffect(() => {
    item.changes?.length !== 0 &&
      item.changes?.forEach((change, index) => {
        const singleIngredient = item.item.dishIngredients.filter(
          ingredient => ingredient._id === change.ingredientId,
        )[0];
        const ingredientFromChanges = item.changes.filter(
          item => item.ingredientId === singleIngredient._id,
        )[0];
        const difference =
          parseFloat(ingredientFromChanges.qtt) - singleIngredient.qtt;
        const totalPerIngredient =
          singleIngredient.pricePerIngredient *
          (difference > 0 ? difference : 0);
        setSumPerMenuItem(sum => sum + totalPerIngredient);
      });
  }, []);

  useEffect(() => {
    const check = totalPrice.filter(
      priceObject => priceObject.itemId === item.item._id,
    );
    if (check.length === 0) {
      setTotalPrice([
        ...totalPrice,
        {itemId: item.item._id, totalAmount: sumPerMenuItem},
      ]);
    } else {
      const newTotalPrice = totalPrice?.map(price =>
        price.itemId !== item.item._id
          ? price
          : {
              ...price,
              totalAmount: sumPerMenuItem,
            },
      );
      setTotalPrice(newTotalPrice);
    }
  }, [sumPerMenuItem]);

  return (
    <View
      key={item.index}
      style={{
        width: '100%',
        overflow: 'hidden',
        marginBottom: 5,
        paddingHorizontal: 20,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[TextStyles.defaultText, {fontSize: 15}]}>
          {index + 1}. {item.item.dishName}
        </Text>
        <Text
          ellipsizeMode="clip"
          numberOfLines={1}
          style={[
            TextStyles.defaultText,
            {fontSize: 15, flex: 1, marginHorizontal: 10},
          ]}>
          ....................................................................................................................................................................................................................................................................................................................................................................................................................................
        </Text>
        <Text style={[TextStyles.defaultText, {fontSize: 15}]}>
          {item.item.currency} {item.item.price}
        </Text>
      </View>
      {item.changes?.length !== 0 &&
        item.changes?.map((change, index) => {
          const singleIngredient = item.item.dishIngredients.filter(
            ingredient => ingredient._id === change.ingredientId,
          )[0];
          const ingredientFromChanges = item.changes.filter(
            item => item.ingredientId === singleIngredient._id,
          )[0];
          const difference =
            parseFloat(ingredientFromChanges.qtt) - singleIngredient.qtt;
          const totalPerIngredient =
            singleIngredient.pricePerIngredient *
            (difference > 0 ? difference : 0);

          return (
            <View key={index} style={{flexDirection: 'row'}}>
              <Text
                style={[
                  TextStyles.defaultText,
                  {fontSize: 14, paddingLeft: 40, color: '#EA365195'},
                ]}>
                {getTextDifference(
                  difference,
                  singleIngredient.unit,
                  singleIngredient.name,
                )}
              </Text>
              <Text
                ellipsizeMode="clip"
                numberOfLines={1}
                style={[
                  TextStyles.defaultText,
                  {
                    fontSize: 14,
                    flex: 1,
                    marginHorizontal: 10,
                    color: '#EA365195',
                  },
                ]}>
                ....................................................................................................................................................................................................................................................................................................................................................................................................................................
              </Text>
              <Text
                style={[
                  TextStyles.defaultText,
                  {fontSize: 14, paddingLeft: 40, color: '#EA365195'},
                ]}>
                {totalPerIngredient} {item.item.currency}
              </Text>
            </View>
          );
        })}
      <Text style={[TextStyles.defaultText, {alignSelf: 'flex-end'}]}>
        Sum: {sumPerMenuItem} {item.item.currency}
      </Text>
    </View>
  );
};

export default SingleOrderItem;

const styles = StyleSheet.create({});

export const getTextDifference = (
  differenceNumber: number,
  unit: string,
  name: string,
) => {
  switch (true) {
    case differenceNumber > 0:
      return `${differenceNumber} ${unit} more of ${name}`;
    case differenceNumber === 0:
      return `${name}`;
    case differenceNumber < 0:
      return `${differenceNumber} ${unit} less of ${name}`;

    default:
      return ``;
  }
};
