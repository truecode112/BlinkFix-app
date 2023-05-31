import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const OnOfDot = ({
  isSelected,
  setIsSelected,
}: {
  isSelected: boolean;
  setIsSelected: React.Dispatch<boolean>;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isSelected ? '#EA3651' : 'rgba(0,0,0,.15)',
        height: 30,
        aspectRatio: 1,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => setIsSelected(!isSelected)}>
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>✓</Text>
    </TouchableOpacity>
  );
};

export default OnOfDot;

const styles = StyleSheet.create({});
