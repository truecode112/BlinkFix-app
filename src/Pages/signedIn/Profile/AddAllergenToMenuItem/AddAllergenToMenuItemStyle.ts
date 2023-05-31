import React from 'react';
import {StyleSheet} from 'react-native';

export const AddAllergenToMenuItemStyles = StyleSheet.create({
  singleAllergen: {
    backgroundColor: '#ffffff15',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 2,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
  },
  AllergenContainer: {
    width: '100%',
  },
  DeleteButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 10,
    alignSelf: 'center',
  },
});
