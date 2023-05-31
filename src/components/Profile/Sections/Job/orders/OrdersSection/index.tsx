import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from '../../../infoScetion/SimpleSection';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {EstablishmentOrderThunk} from '../../../../../../redux/Order/EstablishmentOrder/EstablishmentOrder.thunk';

import {IEstablishmentOrderData} from '../../../../../../redux/Order/EstablishmentOrder/EstablishmentOrder.types';
import SingleOrderInProfile from './SingleOrderInProfile/SingleOrderInProfile.component';
import {useFocusEffect} from '@react-navigation/native';

const OrdersSection = ({establishmentId}: {establishmentId: string}) => {
  const ordersLists = useAppSelector(state => state.EstablishmentOrder.data);
  const dispatch = useAppDispatch();
  const [establishmentWithOrders, setEstablishmentWithOrders] = useState<
    IEstablishmentOrderData | undefined
  >();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(EstablishmentOrderThunk());
    }, []),
  );
  useEffect(() => {
    if (!ordersLists) {
      dispatch(EstablishmentOrderThunk());
    }
    if (ordersLists) {
      const estabListOfOrders = ordersLists.find(
        list => list.establishment === establishmentId,
      );
      setEstablishmentWithOrders(estabListOfOrders);
    }
    return;
  }, [ordersLists]);

  const {width} = useWindowDimensions();

  return (
    <>
      <SimpleSection title={'Orders'}>
        <RenderOrderList
          width={width}
          establishmentWithOrders={establishmentWithOrders}
        />
      </SimpleSection>
    </>
  );
};

export default OrdersSection;

const styles = StyleSheet.create({});
export function RenderOrderList({
  establishmentWithOrders,
  forwardedToChef,
}: {
  width: number;
  forwardedToChef?: boolean;
  establishmentWithOrders: IEstablishmentOrderData | undefined;
}) {
  const {width} = useWindowDimensions();

  return (
    <ScrollView
      horizontal
      snapToInterval={width * 0.9}
      snapToStart
      snapToEnd
      decelerationRate={'fast'}
      style={{
        overflow: 'hidden',
        alignSelf: 'center',
      }}>
      {establishmentWithOrders?.orders.map((singleOrder, index) => {
        return (
          <TouchableOpacity
            key={index}
            // activeOpacity={1}
            onPress={() => {
              console.log(forwardedToChef);
              if (forwardedToChef) {
                Alert.alert(
                  "If you want to find out more about this order open it in 'Active Ordeers' section",
                );
              }
            }}>
            <SingleOrderInProfile
              order={singleOrder}
              forwardedToChef={forwardedToChef}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
