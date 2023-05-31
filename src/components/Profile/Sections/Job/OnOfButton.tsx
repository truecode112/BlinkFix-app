import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InsetShadow from 'react-native-inset-shadow';
import {Shadow} from 'react-native-shadow-2';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OnOfButton = ({
  title,
  selected,
  setSelected,
  height,
  width,
}: {
  title: string;
  selected: boolean;
  setSelected: () => void;
  height?: number;
  width?: number | string;
}) => {
  return (
    <View
      style={{
        flex: 1,
        height: height ? height : '100%',
        maxHeight: height ? height : '100%',
        width: width ? width : '40%',
        paddingHorizontal: 10,
      }}>
      {!selected ? (
        <Shadow style={{width: '100%'}}>
          <TouchableOpacity onPress={setSelected} style={styles.buttonStyle}>
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  width: '100%',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: 10,
                  textAlign: 'center',
                }}>
                {title}
              </Text>
            </View>
          </TouchableOpacity>
        </Shadow>
      ) : (
        <InsetShadow
          containerStyle={styles.shadow}
          shadowRadius={10}
          shadowOffset={10}
          elevation={100}
          shadowOpacity={0.5}
          color="rgba(128,128,128,1)">
          <TouchableOpacity onPress={setSelected} style={styles.buttonStyle}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: 10,
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        </InsetShadow>
      )}
    </View>
  );
};

export default OnOfButton;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    borderRadius: 5,
  },
  buttonStyle: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  shadowouter: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginHorizontal: 10,

    elevation: 6,
    height: '100%',
    width: '100%',
  },
});
