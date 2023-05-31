import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ShadowStyle} from '../../backgrounds/menuSquareCartContainerRecipes';
import DropShadow from 'react-native-drop-shadow';
import InsetShadow from 'react-native-inset-shadow';

const OnOfButton = ({
  isOpen,
  onPress,
  children,
}: {
  isOpen: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <View style={{flex: 1}}>
      {isOpen ? (
        <TouchableOpacity onPress={() => onPress && onPress()}>
          <DropShadow
            style={[
              ShadowStyle.underImage,
              {
                flex: 1,
                aspectRatio: 1,
                margin: 10,
                backgroundColor: '#ffffff15',
                borderRadius: 5,
                overflow: 'hidden',
                padding: 30,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            {children}
          </DropShadow>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            aspectRatio: 1,
            margin: 10,
            borderRadius: 15,
            overflow: 'hidden',
          }}
          onPress={() => onPress && onPress()}>
          <InsetShadow style={{flex: 1}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 30,
                aspectRatio: 1,
              }}>
              {children}
            </View>
          </InsetShadow>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OnOfButton;

const styles = StyleSheet.create({});
