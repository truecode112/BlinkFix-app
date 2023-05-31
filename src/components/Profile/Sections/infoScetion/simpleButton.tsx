import {
  StyleProp,
  StyleSheet,
  Text,
  Touchable,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Shadow} from 'react-native-shadow-2';

const SimpleButton = ({
  text,
  onpress,
  style,
}: {
  text: string;
  onpress: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Shadow
      style={{
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 40,
          height: 4,
        },
        shadowOpacity: 0.17,
        shadowRadius: 50.65,

        elevation: 6,
        flex: 1,
      }}>
      <TouchableOpacity onPress={onpress} style={style}>
        <Text style={{color: '#fff'}}>{text}</Text>
      </TouchableOpacity>
    </Shadow>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({});
