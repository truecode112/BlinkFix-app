import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const AdvancementButton = ({
  selected,
  setSelected,
}: {
  selected: 1 | 2 | 3 | 4 | 5 | null;
  setSelected: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | 5 | null>>;
}) => {
  const [advancementSelected, setAdvancementSelected] = useState<
    1 | 2 | 3 | 4 | 5 | null
  >(null);
  const isSelected = (number: number) => {
    if (advancementSelected === number) return true;
    else return false;
  };
  useEffect(() => {
    setAdvancementSelected(selected);
    setSelected(selected);
  }, [selected]);
  const onPressFunction = (number: 1 | 2 | 3 | 4 | 5) => {
    setSelected(number);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.15)',
        marginVertical: 10,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        onPress={() => onPressFunction(1)}
        style={[
          styles.insideButtonSelector,
          {
            backgroundColor: isSelected(1)
              ? 'rgba(0,0,0,0.15)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}>
        <Text style={styles.textButton}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressFunction(2)}
        style={[
          styles.insideButtonSelector,
          {
            backgroundColor: isSelected(2)
              ? 'rgba(0,0,0,0.15)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}>
        <Text style={styles.textButton}>2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressFunction(3)}
        style={[
          styles.insideButtonSelector,
          {
            backgroundColor: isSelected(3)
              ? 'rgba(0,0,0,0.15)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}>
        <Text style={styles.textButton}>3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressFunction(4)}
        style={[
          styles.insideButtonSelector,
          {
            backgroundColor: isSelected(4)
              ? 'rgba(0,0,0,0.15)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}>
        <Text style={styles.textButton}>4</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressFunction(5)}
        style={[
          styles.insideButtonSelector,
          {
            backgroundColor: isSelected(5)
              ? 'rgba(0,0,0,0.15)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}>
        <Text style={styles.textButton}>5</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdvancementButton;

const styles = StyleSheet.create({
  insideButtonSelector: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'red',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    paddingVertical: 5,
  },
});
