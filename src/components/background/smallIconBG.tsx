import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';

const SmallIconBG = ({children}: {children: React.ReactNode}) => {
  return (
    <View
      style={{
        width: 45,
        aspectRatio: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={styles.ContainerSmall}>{children}</View>
    </View>
  );
};

export default SmallIconBG;

const styles = StyleSheet.create({
  ContainerSmall: {
    width: 50,

    aspectRatio: 1,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
});
