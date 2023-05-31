import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';

const SingleCategory = ({
  singleCategory,
  setSelected,
  isSelected,
}: {
  isSelected: boolean;
  setSelected: React.Dispatch<
    React.SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null>
  >;
  singleCategory: {
    cagetoryName: string;
    categoryIcon: any;
    index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  };
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (isSelected) setSelected(null);
        else setSelected(singleCategory.index);
      }}>
      {isSelected ? (
        <DropShadow style={styles.shadowContainerSelected}>
          <View style={styles.container}>
            <Image
              style={{height: '40%', aspectRatio: 1}}
              source={singleCategory.categoryIcon}
            />
            <Text style={styles.textIcon}>{singleCategory.cagetoryName}</Text>
          </View>
        </DropShadow>
      ) : (
        <DropShadow style={styles.shadowContainer}>
          <View style={styles.container}>
            <Image
              style={{height: '40%', aspectRatio: 1}}
              source={singleCategory.categoryIcon}
            />
            <Text style={styles.textIcon}>{singleCategory.cagetoryName}</Text>
          </View>
        </DropShadow>
      )}
    </TouchableOpacity>
  );
};

export default SingleCategory;

const styles = StyleSheet.create({
  textIcon: {
    color: '#fff',
    fontSize: 10,
  },
  shadowContainer: {
    flex: 1,
    aspectRatio: 1,

    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 1,
    borderRadius: 10,
    inset: 12,
  },
  container: {
    backgroundColor: 'rgba(225,225,225,.05)',
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    alignItems: 'center',
  },
  shadowContainerSelected: {
    backgroundColor: 'rgba(0,0,0,.25)',
    overflow: 'hidden',
    flex: 1,
    aspectRatio: 1,

    margin: 5,
    shadowColor: 'rgba(77,77,77,.25)',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 2,
    borderRadius: 10,
    inset: 12,
  },
});
