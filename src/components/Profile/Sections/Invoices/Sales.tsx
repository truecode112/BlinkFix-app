import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InvoicesList from './InvoicesList';

type Props = {};

const Sales = (props: Props) => {
  return (
    <View>
      <InvoicesList />
    </View>
  );
};

export default Sales;

const styles = StyleSheet.create({});
