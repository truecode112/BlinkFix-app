import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  addressType,
  ILoginForm,
  IRegisterForm,
} from '../../redux/Auth/AuthTypes';
import {IIngredient} from '../../redux/recipes/types';
import {
  IIngredientList,
  IManualList,
  IRecipeAdd,
} from '../../Pages/signedIn/recipes/Recipesadd';
import {IGetProfileInfo} from '../../redux/Profile/types';

export interface ITextInput {
  placeholder: string;
  isSecure?: boolean;
  onChange: any;
  name: string;
  state?:
    | ILoginForm
    | IRegisterForm
    | addressType
    | IManualList
    | IIngredientList
    | IRecipeAdd
    | IGetProfileInfo
    | undefined
    | null;
  value: string | undefined;
  onFocus?: (ev: FocusEvent) => void;
  type?: 'string';
}

const TextInputRecipe = ({
  placeholder,
  isSecure,
  onChange,
  name,
  state,
  value,
  onFocus,
  type,
}: ITextInput) => {
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 5,
        paddingVertical: 10,
      }}>
      <TextInput
        placeholder={placeholder}
        onChangeText={text => {
          if (type === 'string') {
            const firstLetter = text.substring(0, 1);
            if (firstLetter === '#' || firstLetter === ' ') {
              const substring = text.substring(1, text.length);
              onChange(substring.trim());
            } else onChange(text.trim());
          } else onChange({...state, [name]: text});
        }}
        value={value}
        secureTextEntry={isSecure ? true : false}
        style={{color: 'white'}}></TextInput>
    </View>
  );
};

export default TextInputRecipe;

const styles = StyleSheet.create({});
