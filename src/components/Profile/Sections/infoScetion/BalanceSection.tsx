import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SimpleSection from './SimpleSection';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SimpleButton from './simpleButton';

const BalanceSection = () => {
  return (
    <View>
      <SimpleSection title="Balance Section" balance={3232} currency="$">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            paddingHorizontal: 20,
          }}>
          <SimpleButton
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 5,
            }}
            text="Widthdraw"
            onpress={() => {}}
          />
          <SimpleButton
            style={[
              styles,
              {
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 5,
              },
            ]}
            text="Deposit"
            onpress={() => {}}
          />
        </View>
      </SimpleSection>
    </View>
  );
};

export default BalanceSection;

const styles = StyleSheet.create({});
