import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {default as cuisines} from '../../static/cuisines.json';
import SelectDropdown from 'react-native-select-dropdown';

const CuisineSearchbar = ({
  initialSelectedCuisine,
  setCuisineCode,
}: {
  initialSelectedCuisine?: string | undefined;
  setCuisineCode: (cuisineCode: string) => void;
}) => {
  useEffect(() => {
    const initialCode = cuisines.filter(cuisine => {
      return cuisine.CodeURL;
    })[0];
    if (initialCode) setCuisineCode(initialCode.CodeURL);
  }, [initialSelectedCuisine]);

  return (
    <View style={{maxHeight: 200, marginVertical: 5}}>
      <SelectDropdown
        data={cuisines ? cuisines : []}
        onSelect={(selectedItem, index) => {
          setCuisineCode(selectedItem.CodeURL);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return `${selectedItem.NameEnglish} / ${selectedItem.NameNative}`;
        }}
        rowTextForSelection={(item, index) => {
          return `${item.NameEnglish} / ${item.NameNative}`;
        }}
        rowStyle={{
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
        buttonStyle={{
          width: '100%',
          height: 50,
          borderRadius: 8,
          backgroundColor: 'rgba(0,0,0,0.15)',
          margin: 0,
          padding: 0,
        }}
        searchPlaceHolder={'Search for cuisine'}
        dropdownOverlayColor="rgba(0,0,0,0)"
        renderDropdownIcon={isOpen => (
          <View style={styles.iconContainer}>
            <Image
              style={styles.searchIcon}
              source={
                isOpen
                  ? require('../../assets/utilityIcons/close.png')
                  : require('../../assets/utilityIcons/find.png')
              }
            />
          </View>
        )}
        dropdownIconPosition="left"
        defaultButtonText="Select Cuisine"
        dropdownStyle={{
          backgroundColor: 'rgba(100,100,100,0.9)',
          borderRadius: 15,
        }}
        buttonTextStyle={{color: '#fff'}}
        selectedRowTextStyle={{color: '#fff'}}
        rowTextStyle={{color: '#fff'}}
        selectedRowStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      />
    </View>
  );
};

export default CuisineSearchbar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    height: 50,
  },
  input: {
    flex: 1,
    borderRadius: 0,
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    height: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 20,
    margin: -7,
    left: 0,
  },
});
