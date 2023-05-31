import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({});
const EditButton = ({
  isEditModeEnabled,
  setIsEditModeEnabled,
}: {
  isEditModeEnabled: boolean;
  setIsEditModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <TouchableOpacity
    onPress={() => {
      setIsEditModeEnabled(!isEditModeEnabled);
    }}>
    <Image
      style={{width: 20, height: 20}}
      source={
        !isEditModeEnabled
          ? require('../../assets/utilityIcons/edit.png')
          : require('../../assets/utilityIcons/close.png')
      }></Image>
  </TouchableOpacity>
);

export default EditButton;
