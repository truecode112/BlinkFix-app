import {Alert, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ProfileNavigation,
  WaiterListOfOrdersProps,
} from '../../../../../../navigation/Profile/ProfileNavigator.types';
import SingleOrderItemInWaiterCart from './SingleOrderItemInWaiterCart';
import {SwipeListView} from 'react-native-swipe-list-view';
import ScrollContainer from '../../../../../../components/ScrollContainer';
import SubmitButton from '../../../../../../components/touchables/SubmitButton';
import {clearShopingCartWaiter} from '../../../../../../redux/Jobs/Waiter/WaiterOrder.slice';
import {AddNewOrder} from '../../../../../../redux/Order/Order/UserPlaceOrder.thunk';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WaiterOrderCart = () => {
  const {data, message, isLoading} = useAppSelector(state => state.WaiterOrder);
  const dataToMap = () => {
    if (!data) return [];
    else {
      return data.map((item, index) => {
        return {...item, key: index};
      });
    }
  };
  const [orderItems, setOrderItems] = useState(dataToMap);
  const {params} = useRoute<WaiterListOfOrdersProps['route']>();
  //   const {height} = Dimensions.get('screen');
  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const navigation = useNavigation<ProfileNavigation>();
  useEffect(() => {
    if (message === 'order placed successfully') {
      navigation.pop();
      Alert.alert('success', 'Order forwarded to chef successfully');
    }
  }, [message]);
  return (
    <LoggedInBackground>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: height - 250,
        }}>
        <ScrollContainer>
          <SwipeListView
            style={{width: '100%', height: '100%'}}
            //   contentContainerStyle={{height: height - 200}}
            keyExtractor={(rowData, index) => {
              return rowData.key.toString();
            }}
            data={orderItems}
            closeOnScroll
            renderItem={(data, rowMap) => (
              <View key={data.index}>
                <SingleOrderItemInWaiterCart item={data.item} />
                <View
                  style={{
                    width: 80,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: -75,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (orderItems) {
                        const newData = [...orderItems];
                        const prevIndex = orderItems.findIndex(
                          item => item.key === data.item.key,
                        );

                        newData.splice(prevIndex, 1);

                        const filter = newData.map((item, index) => {
                          return {
                            ...item,
                            key: index,
                          };
                        });

                        setOrderItems(filter);

                        // if (filteredOrderItems) setOrderItems(filteredOrderItems);
                      }
                    }}
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        overflow: 'hidden',
                        color: 'white',
                        backgroundColor: '#ea3651',
                      }}>
                      delete {data.item.key}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            renderHiddenItem={(orderItems, rowMap) => (
              <View
                style={{
                  width: 80,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 0,
                }}></View>
            )}
            leftOpenValue={0}
            rightOpenValue={-80}
          />

          <View style={{height: 200}} />
        </ScrollContainer>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <SubmitButton
            onPress={() => {
              dispatch(clearShopingCartWaiter());
              navigation.pop();
            }}
            title="Cancel"
            style={{marginVertical: 20, backgroundColor: 'rgb(80,80,80)'}}
          />

          <SubmitButton
            onPress={() => {
              //   console.log(orderItems);

              const items = orderItems?.map(item => item.orderItems);
              if (items.length === 0) {
                Alert.alert('You have to have at least one order item');
                navigation.pop();
                return;
              }
              const resItems = items
                ? items.map(item => {
                    return {
                      itemId: item.item._id,
                      changes: item.changes,
                    };
                  })
                : [];
              //   dispatch(cleanUpEstablishmentOrderSlice());

              dispatch(
                AddNewOrder({
                  isPickup: true,
                  // @ts-ignore
                  orderItems: resItems,
                  orderWhere: params.listOfOrders[0].establishment._id,
                  isWaiter: true,
                }),
              );
            }}
            title="Forward to chef"
            style={{marginVertical: 20}}
          />
        </View>
      </View>
    </LoggedInBackground>
  );
};

export default WaiterOrderCart;

const styles = StyleSheet.create({});
