import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CartContainer = ({
  children,
  selected,
}: {
  children: React.ReactNode;
  selected: boolean;
}) => {
  return <View style={styles.container}>{children}</View>;
};

export default CartContainer;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
