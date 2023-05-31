import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ScrollContainer = ({children}: {children?: React.ReactNode}) => {
  return (
    <ScrollView
      style={{}}
      horizontal
      scrollEnabled={false}
      nestedScrollEnabled
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{width: '100%'}}>
      {children ? children : <Text>Empty scroll container</Text>}
    </ScrollView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
