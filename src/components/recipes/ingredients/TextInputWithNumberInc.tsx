import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const TextInputWithNumberInc = ({
  qtt,
  setQtt,
}: {
  qtt: number;
  setQtt: React.Dispatch<number>;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        style={styles.buttonInc}
        onPress={() => {
          if (qtt > 0) setQtt(qtt - 1);
        }}>
        <Text style={styles.textButotn}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{qtt}</Text>
      <TouchableOpacity
        style={styles.buttonInc}
        onPress={() => setQtt(qtt + 1)}>
        <Text style={styles.textButotn}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextInputWithNumberInc;

const styles = StyleSheet.create({
  buttonInc: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    aspectRatio: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: 40,
    color: 'white',
    textAlign: 'center',
  },
  textButotn: {
    color: 'white',
    textAlign: 'center',
  },
});
