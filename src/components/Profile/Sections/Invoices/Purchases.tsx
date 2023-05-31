import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import InvoicesList from './InvoicesList';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {GetMyPurchases} from '../../../../redux/Order/Purchases/getMyPurchases.thunk';

type Props = {selected: number};

const Purchases = (props: Props) => {
  const {data} = useAppSelector(state => state.Purchases);

  return (
    <View>
      <InvoicesList data={data} />
    </View>
  );
};

export default Purchases;

const styles = StyleSheet.create({});
