import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';

const SimpleSection = ({
  children,
  title,
  balance,
  currency,
  Button,
  ExtraButton,
  isEditModeEnabled,
}: {
  children: React.ReactNode;
  title: string | null;
  balance?: number;
  currency?: string;
  Button?: () => JSX.Element;
  ExtraButton?: () => JSX.Element | null;
  isEditModeEnabled?: boolean;
}) => {
  const {width} = useWindowDimensions();
  return (
    <View>
      <View
        style={{
          width: width - 10,
          backgroundColor: isEditModeEnabled ? '#EA3651' : '#464646',
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 10,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}>
          {title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {ExtraButton && <ExtraButton />}
          {Button && <Button />}
          {balance && currency && (
            <Text style={{color: '#fff', fontWeight: '900'}}>
              {balance.toString()} {currency}
            </Text>
          )}
        </View>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default SimpleSection;

const styles = StyleSheet.create({});
