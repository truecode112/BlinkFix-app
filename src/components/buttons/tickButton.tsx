import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TickButton = ({
  selected,
  setSelected,
  title,
  displaySquare,
  isIncremental,
  incrementLeft,
  incrementRight,
  incrementValue,
  changeTextValue,
}: {
  selected: boolean;
  title: string;
  setSelected: () => void;
  displaySquare?: boolean;
  isIncremental?: boolean;
  incrementLeft?: (newValue?: string) => void;
  incrementRight?: (newValue?: string) => void;
  incrementValue?: string;
  changeTextValue?: (text: string) => void;
}) => {
  const {width} = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: width - 220,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setSelected();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          width: '100%',
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderColor: 'rgba(255, 255, 255,.6)',
            borderRadius: 10,
            borderWidth: 1,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
            display: displaySquare === false ? 'none' : 'flex',
          }}>
          <Text
            style={{
              fontFamily: 'Handlee-Regular',
              color: '#fff',
              fontSize: 20,
            }}>
            {selected ? '✓' : ''}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Handlee-Regular',
            color: '#fff',
            fontSize: 15,
            width: '100%',
            paddingRight: 50,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
      {isIncremental && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => incrementRight && incrementRight()}>
            <Text
              style={{
                color: '#fff',
                margin: 1,
                textAlign: 'center',
              }}>
              -
            </Text>
          </TouchableOpacity>
          <TextInput
            keyboardType="numbers-and-punctuation"
            style={{
              width: 30,
              height: 30,
              alignSelf: 'center',
              textAlign: 'center',
              color: '#fff',
              fontSize: 10,
            }}
            value={incrementValue ? incrementValue : '0'}
            onChangeText={text => {
              let newText = '';
              let numbers = '0123456789.,';

              for (var i = 0; i < text.length; i++) {
                if (numbers.indexOf(text[i]) > -1) {
                  newText = newText + text[i];
                } else {
                  newText = newText + '';
                }
              }
              changeTextValue && changeTextValue(newText);
            }}
          />

          <TouchableOpacity
            onPressIn={() => {
              incrementLeft && incrementLeft();
            }}
            style={styles.buttonContainer}>
            <Text
              style={{
                color: '#fff',
                margin: 1,
                textAlign: 'center',
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TickButton;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff15',
    margin: 1,
    height: 30,
    aspectRatio: 1,
  },
});
