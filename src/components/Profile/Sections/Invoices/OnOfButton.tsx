import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {ShadowStyle} from '../../../backgrounds/menuSquareCartContainerRecipes';

type Props = {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  text: string;
};

const OnOfButton = (props: Props) => {
  const isSelected = props.selected === props.id;
  return (
    <TouchableOpacity
      onPress={() => {
        props.setSelected(props.id);
      }}
      style={[
        styles.onOfButton,
        {backgroundColor: isSelected ? '#00000015' : '#00000055'},
      ]}>
      <DropShadow
        style={[
          ShadowStyle.underImage,
          {width: '100%', flex: 1, aliginItems: 'center'},
        ]}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </DropShadow>
    </TouchableOpacity>
  );
};

export default OnOfButton;

const styles = StyleSheet.create({
  onOfButton: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
    alignSelf: 'center',
  },
});
