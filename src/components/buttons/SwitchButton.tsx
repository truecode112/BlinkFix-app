import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SwitchButton = ({
  categoryVisibleSection,
  setCategoryVisibleSection,
  onPress,
}: {
  categoryVisibleSection: boolean;
  setCategoryVisibleSection: React.Dispatch<React.SetStateAction<boolean>>;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setCategoryVisibleSection(!categoryVisibleSection);
        onPress();
      }}
      style={{position: 'relative', width: 40, marginRight: 10}}>
      <View
        style={{
          height: 10,
          aspectRatio: 3,
          backgroundColor: '#fff',
          position: 'absolute',
          top: '25%',
          borderRadius: 100,
        }}></View>
      <View
        style={{
          alignSelf: categoryVisibleSection ? 'flex-end' : 'flex-start',
        }}>
        <Image
          style={{
            width: 20,
            height: 20,
            backgroundColor: categoryVisibleSection ? 'green' : '#464646',
            borderRadius: 100,
          }}
          source={
            categoryVisibleSection
              ? require('../../assets/utilityIcons/visibleContur.png')
              : require('../../assets/utilityIcons/notVisibleContur.png')
          }></Image>
      </View>
    </TouchableOpacity>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({});
