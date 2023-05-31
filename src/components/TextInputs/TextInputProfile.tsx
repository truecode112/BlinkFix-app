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
import InsetShadow from 'react-native-inset-shadow';
import DropShadow from 'react-native-drop-shadow';

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
  type?: 'string' | 'array';
  disabled?: boolean;
}

const TextInputProfile = ({
  placeholder,
  isSecure,
  onChange,
  name,
  state,
  value,
  disabled,
  type,
}: ITextInput) => {
  return (
    <DropShadow
      style={{
        shadowColor: '#ccc',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 30.84,

        elevation: 5,
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,.05)',
          borderRadius: 5,
          width: '100%',
          height: 50,
          marginBottom: 10,
          paddingHorizontal: 5,
        }}>
        <TextInput
          editable={disabled}
          placeholder={placeholder}
          onChangeText={text => {
            onChange({...state, [name]: text});
          }}
          value={value}
          secureTextEntry={isSecure ? true : false}
          style={{
            color: 'white',
            borderRadius: 5,
            paddingVertical: 4,
            flex: 1,
            paddingHorizontal: 10,
            width: '100%',
          }}
        />
      </View>
    </DropShadow>
  );
};

export default TextInputProfile;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    borderRadius: 5,
    flex: 1,
  },
  shadowouter: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    // shadowOpacity: 0.27,
    shadowRadius: 200.65,
    elevation: 6,

    flex: 1,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
});
