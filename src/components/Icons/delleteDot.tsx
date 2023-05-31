import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {TouchableProps} from 'react-native-svg';

const DelleteDot = ({
  onPress,
  style,
  sign,
}: {
  onPress: () => void;
  style?: ViewStyle;
  sign?: String;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 20,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: '#EA3651',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>
        {sign ? sign : '-'}
      </Text>
    </TouchableOpacity>
  );
};

export default DelleteDot;

const styles = StyleSheet.create({});
