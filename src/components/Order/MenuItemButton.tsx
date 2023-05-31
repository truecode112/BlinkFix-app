import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const MenuItemButton = ({
  title,
  onPress,
  haveRedDot,
}: {
  title: string;
  onPress?: () => void;
  haveRedDot?: boolean;
}) => {
  return (
    <Animated.View
      style={{
        backgroundColor: '#4d4d4d',
        height: 40,
        marginTop: 5,
        borderRadius: 40,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {haveRedDot && (
          <View
            style={{
              backgroundColor: '#EA3651',
              width: 10,
              height: 10,
              borderRadius: 10,
              top: 10,
              right: 15,
              position: 'absolute',
            }}></View>
        )}
        <Text style={{color: '#fff', fontWeight: '900'}}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
