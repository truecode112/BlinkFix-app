import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {forwardRef, RefObject, useState} from 'react';
import {
  addressType,
  ILoginForm,
  IRegisterForm,
  IStripeDetails,
} from '../../redux/Auth/AuthTypes';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import {IRequestStripeCreate} from '../../redux/Order/Order/stripe/createStripeAccount.thunk';
import {CreateInterfaceType} from '../../Pages/signedIn/menupages/establishment/establishment.types';

export interface ITextInput {
  placeholder: string;
  isSecure?: boolean;
  onChange: any;
  name: string;
  state?:
    | ILoginForm
    | IRegisterForm
    | addressType
    | IStripeDetails
    | IRequestStripeCreate
    | Partial<CreateInterfaceType>;
  value: string | undefined;
  disabled?: boolean;
}

const TextInputCustom = forwardRef<TextInput, ITextInput>(
  ({placeholder, isSecure, onChange, name, state, value, disabled}, ref) => {
    return (
      <View
        style={{
          marginVertical: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: 'rgba(0,0,0,0.15)',
          borderRadius: 5,
        }}>
        <TextInput
          ref={ref}
          editable={disabled ? false : true}
          placeholder={placeholder}
          onChangeText={text => {
            onChange({...state, [name]: text});
          }}
          style={[Textstyles.text, {fontSize: 16}]}
          value={value}
          secureTextEntry={isSecure ? true : false}></TextInput>
      </View>
    );
  },
);

export default TextInputCustom;

const styles = StyleSheet.create({});
