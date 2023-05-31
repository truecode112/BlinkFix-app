import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import InsetShadow from 'react-native-inset-shadow';

const OnOfButton = ({
  isOpen,
  name,
  setIsOpen,
}: {
  isOpen: boolean | undefined;
  name: string;
  setIsOpen: () => void;
}) => {
  return (
    <>
      {!isOpen ? (
        <Shadow
          offset={[2, 40]}
          safeRender
          stretch
          paintInside
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10,

            elevation: -16,
            margin: 2,
          }}
          containerStyle={{
            flex: 1,
            marginVertical: 2,
            marginHorizontal: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: -3,
            },
            shadowOpacity: isOpen ? 0.44 : 0.1,
            shadowRadius: isOpen ? 4 : 2,

            elevation: -16,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'rgba(150, 134, 125, 1)',
              margin: 1,
              padding: 10,
              borderRadius: 10,
              width: '100%',
              overflow: 'hidden',
            }}
            onPress={setIsOpen}>
            <Text style={{textAlign: 'center', color: 'white'}}>{name}</Text>
          </TouchableOpacity>
        </Shadow>
      ) : (
        <>
          <InsetShadow
            containerStyle={styles.shadow}
            shadowRadius={5}
            shadowOffset={10}
            elevation={100}
            shadowOpacity={0.5}
            color="rgba(128,128,128,1)">
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                margin: 1,
                padding: 10,
                borderRadius: 10,
                width: '100%',
                overflow: 'hidden',
              }}
              onPress={setIsOpen}>
              <Text style={{textAlign: 'center', color: 'white'}}>{name}</Text>
            </TouchableOpacity>
          </InsetShadow>
        </>
      )}
    </>
  );
};

export default OnOfButton;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    borderRadius: 10,
    flex: 1,
    margin: 2,
  },
});
