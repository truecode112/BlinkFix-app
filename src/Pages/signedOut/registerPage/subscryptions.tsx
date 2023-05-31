import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CartContainer from '../../../components/backgrounds/cartContainer';
import {default as StaticSubscriptions} from '../../../static/subscription.json';
import SingleSub from './SingleSub';
const Subscryptions = ({
  selected,
  setSelected,
  setSubName,
}: {
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  setSubName: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <ScrollView
      horizontal={true}
      style={{
        flexGrow: 1,
        width: '100%',
      }}>
      {StaticSubscriptions?.map(element => {
        return (
          <SingleSub
            key={element.id}
            sub={element}
            selected={selected}
            setSelected={setSelected}
            setSubName={setSubName}
          />
        );
      })}
    </ScrollView>
  );
};

export default Subscryptions;

const styles = StyleSheet.create({});
