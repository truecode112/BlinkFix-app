import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IInvoice} from '../../../../redux/Order/Purchases/getMyPurchases.thunk';
import {WEBCONST} from '../../../../constants/webConstants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../../../navigation/Profile/ProfileNavigator.types';

type Props = {
  data?: IInvoice[] | undefined;
};

const InvoicesList = (props: Props) => {
  const navigation = useNavigation<ProfileNavigation>();
  const offset = useSharedValue(-150);

  const [lastIdClicked, setLastIdClicked] = useState<string | null>(null);

  return (
    <View>
      {props.data?.map(invoice => {
        // single invoice
        const {orderItems, ...rest} = invoice;

        const active = orderItems.filter(
          orderItem => orderItem.itemId !== undefined,
        );

        const fullprice = active.reduce((accumulator, currentValue) => {
          return accumulator + parseFloat(currentValue.itemId.price);
        }, 0);

        const ingredients = active
          ?.map(items =>
            items.changes.map(
              change => change.qtt * change.ingredientId.pricePerIngredient,
            ),
          )
          .flat();

        const ingredientsPrice = ingredients.reduce((acc, currentValue) => {
          return acc + currentValue;
        }, 0);

        const currency = active.reduce(
          (accumulator, currentValue) =>
            (accumulator = currentValue.itemId.currency),
          '',
        );
        const animatedStyles = useAnimatedStyle(() => {
          return {
            transform: [
              {
                translateX:
                  lastIdClicked === invoice._id
                    ? withTiming(offset.value, {duration: 100})
                    : withTiming(0, {duration: 100}),
              },
            ],
          };
        });
        return (
          <TouchableOpacity
            key={invoice._id}
            activeOpacity={0.5}
            onPress={() => {
              setLastIdClicked(invoice._id);
              if (lastIdClicked === invoice._id) {
                setLastIdClicked(null);
              }
            }}>
            <Animated.View style={[styles.container, animatedStyles]}>
              <>
                <Image
                  style={{width: 50, height: 50, borderRadius: 50}}
                  source={{
                    uri: `${WEBCONST().STORAGEURLNEW}${
                      invoice.orderWhere.owner?.images?.profileImage?.path
                    }`,
                  }}
                />
                <Text style={styles.text}>{invoice.orderWhere.name}</Text>
                <Text style={styles.text}>
                  {currency} {(fullprice + ingredientsPrice).toFixed(2)}
                </Text>
                <View>
                  <Text style={styles.text}>
                    {new Date(invoice.orderDate).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    {new Date(invoice.orderDate).toLocaleTimeString()}
                  </Text>
                </View>
                <Animated.View
                  style={[
                    {
                      flex: 1,
                      height: '100%',
                      width: 150,
                      right: -300,
                      position: 'absolute',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    },
                    ,
                    animatedStyles,
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      setLastIdClicked(null);
                      navigation.navigate('SingleInvoiceFromProfile', {
                        invoice,
                      });
                    }}>
                    <View
                      style={{
                        backgroundColor: '#00000015',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                      }}>
                      <Text style={styles.text}>view</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: '#00000015',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                      }}>
                      <Text style={styles.text}>download</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 2,
    paddingVertical: 5,
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Handlee-Regular',
  },
});

export default InvoicesList;
