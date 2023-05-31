import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Textstyles} from '../../../menupages/contact';

const InfoDisplayRow = ({title, value}: {title: string; value: string}) => {
  return (
    <View style={styles.position}>
      <Text
        style={[
          Textstyles.text,
          Textstyles.title,
          {fontSize: 20, marginVertical: 0},
        ]}>
        {title}
      </Text>
      <Text
        style={[
          Textstyles.text,
          {fontSize: 18, marginVertical: 0, textTransform: 'capitalize'},
        ]}>
        {value}
      </Text>
    </View>
  );
};

export default InfoDisplayRow;

const styles = StyleSheet.create({
  position: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
