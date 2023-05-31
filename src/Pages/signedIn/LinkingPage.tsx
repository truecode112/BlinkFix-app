import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {HomePageProp} from '../../navigation/types';

const LinkingPage = () => {
  const route = useRoute<HomePageProp['route']>();
  return (
    <View>
      <Text>LinkingPage</Text>
    </View>
  );
};

export default LinkingPage;

const styles = StyleSheet.create({});
