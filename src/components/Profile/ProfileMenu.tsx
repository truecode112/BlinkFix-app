import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SingleItem from './ProfileMenu/SingleItem';

const ProfileMenu = ({
  selected,
  setSelected,
}: {
  selected: 0 | 1 | 2 | 3 | 4;
  setSelected: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3 | 4>>;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <SingleItem
        id={0}
        selected={selected}
        setSelected={setSelected}
        title="info"
        icon={require('../../assets/profileIcons/info.png')}
      />
      <SingleItem
        id={1}
        selected={selected}
        setSelected={setSelected}
        title="recipe"
        icon={require('../../assets/profileIcons/recipes.png')}
      />
      <SingleItem
        id={2}
        selected={selected}
        setSelected={setSelected}
        title="invoices"
        icon={require('../../assets/profileIcons/invoices.png')}
      />
      <SingleItem
        id={3}
        selected={selected}
        setSelected={setSelected}
        title="job"
        icon={require('../../assets/profileIcons/job.png')}
      />
      <SingleItem
        id={4}
        selected={selected}
        setSelected={setSelected}
        title="disputes"
        icon={require('../../assets/profileIcons/disputes.png')}
      />
    </View>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({});
