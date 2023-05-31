import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SimpleSection from '../Profile/Sections/infoScetion/SimpleSection';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropShadow from 'react-native-drop-shadow';

const TipDisplaySection = ({
  balance,
  currency,
}: {
  balance: number;
  currency: string;
}) => {
  return (
    <SimpleSection
      title="Balance Section"
      Button={() => (
        <Text style={{color: '#fff'}}>
          {balance} {currency}
        </Text>
      )}>
      <DropShadow
        style={{
          margin: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 1,
          borderRadius: 5,
          inset: 12,
          backgroundColor: 'rgba(0, 0, 0,.10)',
          paddingVertical: 5,
          paddingHorizontal: 20,
          position: 'relative',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '40%',
          alignSelf: 'flex-end',
        }}>
        <TouchableOpacity
          //TODO: add withdeaw money
          style={{
            alignSelf: 'flex-end',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#fff', textShadowColor: 'transparent'}}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </DropShadow>
    </SimpleSection>
  );
};

export default TipDisplaySection;

const styles = StyleSheet.create({});
