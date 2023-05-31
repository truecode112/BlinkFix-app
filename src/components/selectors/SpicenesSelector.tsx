import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {SpicenessList} from '../../static/spiceness';

const SpicenesSelector = ({
  setSpiceness,
}: {
  setSpiceness: (text: string) => void;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const spicenesList = SpicenessList();

  useEffect(() => {
    if (selected) setSpiceness(selected);
  }, [selected]);

  return (
    <View style={{width: '100%'}}>
      <SelectDropdown
        data={spicenesList ? spicenesList : []}
        onSelect={(selectedItem, index) => {
          setSelected(selectedItem.name);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          setSelected(selectedItem.name);
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
        rowStyle={{
          borderRadius: 10,
          backgroundColor: 'transparent',
        }}
        buttonStyle={{
          width: '100%',
          height: 50,
          borderRadius: 8,
          backgroundColor: 'rgba(0,0,0,0.15)',
        }}
        searchPlaceHolder={'Search for one job'}
        dropdownOverlayColor="rgba(0,0,0,0)"
        renderDropdownIcon={isOpen => (
          <Image
            style={{
              height: 10,
              width: 20,
              transform: [{rotate: !isOpen ? '180deg' : '0deg'}],
            }}
            source={require('../../assets/utilityIcons/arrowup.png')}
          />
        )}
        dropdownIconPosition="right"
        defaultButtonText="Select Spiceness"
        dropdownStyle={{
          backgroundColor: 'rgba(100,100,100,0.5)',
          borderRadius: 15,
        }}
        buttonTextStyle={{color: '#fff'}}
        selectedRowTextStyle={{color: '#fff'}}
        rowTextStyle={{color: '#fff'}}
        selectedRowStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
      />
    </View>
  );
};

export default SpicenesSelector;

const styles = StyleSheet.create({});
