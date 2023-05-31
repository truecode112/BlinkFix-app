import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

const SubmitButton = ({
  onPress,
  title,
  style,
}: {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.BodyContainer, {...style}]}>
      <Text style={styles.TextButton}>{title}</Text>
    </TouchableOpacity>
  );
};
export default SubmitButton;

const styles = StyleSheet.create({
  BodyContainer: {
    backgroundColor: '#EA3651',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  TextButton: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Handlee-Regular',
  },
});
