import React from 'react';
import {StyleSheet} from 'react-native';

export const OrderModalContentStyles = StyleSheet.create({
  Container: {
    flexWrap: 'wrap',
  },
  ImageStyle: {
    borderRadius: 50,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 20,
  },
  SingleOrderItem: {
    flexDirection: 'row',
    marginLeft: 20,
  },
});
