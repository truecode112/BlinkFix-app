import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ProfileSingleInvoiceProps} from '../../../navigation/Profile/ProfileNavigator.types';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';

const Singleinvoice = () => {
  const route = useRoute<ProfileSingleInvoiceProps['route']>();
  const {invoice} = route.params;

  const orderDate = new Date(invoice.orderDate);
  const updateDate = new Date(invoice.orderUpdateDate);

  const itemsPrice = invoice.orderItems.reduce((acc, item) => {
    return item?.itemId?.price ? acc + parseFloat(item.itemId.price) : 0;
  }, 0);
  const ingredientsPrice = invoice.orderItems.reduce((acc, item) => {
    const changes = item.changes.reduce((acc, change) => {
      return change.qtt * change.ingredientId.pricePerIngredient;
    }, 0);
    return acc + changes;
  }, 0);

  const currency = invoice.orderItems.reduce((acc, item) => {
    return item?.itemId?.currency ? item.itemId.currency : '';
  }, '');

  return (
    <LoggedInBackground>
      <Text style={styles.text}>invoice: {invoice._id}</Text>
      <Text style={styles.text}>
        order date: {orderDate.toLocaleDateString()}{' '}
        {orderDate.toLocaleTimeString()}
      </Text>
      <Text style={styles.text}>
        update date: {updateDate.toLocaleDateString()}{' '}
        {updateDate.toLocaleTimeString()}
      </Text>
      <Text style={styles.text}>Order from: {invoice.orderWhere.name}</Text>
      <Text style={styles.text}>
        {invoice.isCompleted ? 'Order comleated' : 'Order not compleated yet'}
      </Text>

      <Text style={styles.text}></Text>
      <Text style={styles.text}>address: </Text>
      <Text style={styles.text}>country: {invoice.address.country} </Text>
      <Text style={styles.text}>state: {invoice.address.state} </Text>
      <Text style={styles.text}>postal code: {invoice.address.postcode} </Text>
      <Text style={styles.text}>city: {invoice.address.city} </Text>
      <Text style={styles.text}>
        streat: {invoice.address.street} {invoice.address.buildingnumber}
      </Text>
      <Text style={styles.text}></Text>

      {/* order items and changes  */}
      {invoice.orderItems.length !== 0 &&
        invoice.orderItems?.map(item => (
          <View key={item._id}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                width: '100%',
              }}>
              <Text style={styles.text}>
                {item.itemId?.dishName ? item.itemId?.dishName : ''}
              </Text>
              {item.itemId?.dishName && (
                <Text
                  ellipsizeMode="tail"
                  style={{flex: 1, color: '#fff'}}
                  numberOfLines={1}>
                  {' '}
                  ............................................................................................................
                </Text>
              )}
              <Text style={styles.text}>
                {' '}
                {item.itemId?.currency ? item.itemId?.currency : ''}{' '}
                {item.itemId?.price ? item.itemId?.price : ''}
              </Text>
            </View>
            {item.changes.length !== 0 && (
              <View>
                {item.changes?.map(change => {
                  return (
                    <View key={change._id}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          width: '100%',
                          paddingLeft: 20,
                        }}>
                        <Text style={styles.text}>
                          {change.ingredientId.name}
                        </Text>
                        <Text
                          ellipsizeMode="tail"
                          style={{flex: 1, color: '#fff'}}
                          numberOfLines={1}>
                          {' '}
                          ............................................................................................................
                        </Text>
                        <Text style={styles.text}>
                          {change.qtt}
                          {' x '}
                          {item.itemId?.currency
                            ? item.itemId?.currency
                            : ''}{' '}
                          {change.ingredientId.pricePerIngredient
                            ? change.ingredientId.pricePerIngredient
                            : ''}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      <Text style={styles.text}>
        Order items prce: {currency}
        {itemsPrice}
      </Text>
      <Text style={styles.text}>
        order items ingredients price: {currency}
        {ingredientsPrice}
      </Text>

      {/* tax percentage if included */}
      {/* delivery price !? */}

      <View
        style={{
          marginVertical: 50,
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: '#EA3651',
          borderRadius: 5,
        }}>
        <Text style={styles.text}>Order {invoice.orderStatus}</Text>
      </View>
    </LoggedInBackground>
  );
};

export default Singleinvoice;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Handlee-Regular',
    marginVertical: 5,
  },
});
