import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const PillButton = ({
  status,
  setStatus,
}: {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setStatus(!status)}
      style={{
        height: 30,
        aspectRatio: 2,
        borderRadius: 40,
        borderWidth: 1,
        position: 'relative',
        borderColor: '#fff',
        padding: 1,
        alignItems: status === false ? 'flex-start' : 'flex-end',
        backgroundColor: !status
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 255, 0, 0.35)',
      }}>
      <View
        style={{
          height: '100%',
          aspectRatio: 1,
          backgroundColor: '#FFF',
          borderRadius: 100,
        }}></View>
    </TouchableOpacity>
  );
};

export default PillButton;

const styles = StyleSheet.create({});
