import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCardAnimation} from '@react-navigation/stack';
import {SpicenessList} from '../../static/spiceness';

const SpicenessSelector = ({
  setSpiceness,
}: {
  setSpiceness: React.Dispatch<
    React.SetStateAction<'normal' | 'extra hot' | 'Hot' | 'Mild'>
  >;
}) => {
  const spicenessList = SpicenessList();
  const [selected, setSelected] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const selectedSpieness = SpicenessList()[selected];
    setSpiceness(selectedSpieness.name);
  }, [selected]);

  return (
    <View
      style={{
        width: '100%',
        position: 'relative',
        marginVertical: 10,
        maxHeight: 900,
      }}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        key={spicenessList[selected].id}
        style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          paddingHorizontal: 50,
          paddingVertical: 5,
          borderRadius: 5,
          backgroundColor: 'rgba(0,0,0,0.15)',
        }}>
        <Image
          source={require('../../assets/utilityIcons/arrowup.png')}
          style={{
            height: '100%',
            width: 30,
            margin: 10,
            resizeMode: 'contain',
            transform: !isOpen
              ? [{rotateX: '180deg'}]
              : [{rotateX: '0deg'}, {rotateZ: '0deg'}],
          }}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image
            source={spicenessList[selected].icon}
            style={{width: 40, aspectRatio: 1}}
          />
          <Text style={{color: 'white'}}>{spicenessList[selected].name}</Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          height: !isOpen ? 0 : '20%',
          opacity: !isOpen ? 0 : 1,
          display: !isOpen ? 'none' : 'flex',
          maxHeight: 200,
        }}>
        {spicenessList?.map(spiceness => (
          <TouchableOpacity
            onPress={() => {
              setSelected(spiceness.id);
              setIsOpen(false);
            }}
            key={spiceness.id}
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}>
            <Image
              source={spiceness.icon}
              style={{width: 40, aspectRatio: 1}}
            />
            <Text style={{color: 'white'}}>{spiceness.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SpicenessSelector;

const styles = StyleSheet.create({});
