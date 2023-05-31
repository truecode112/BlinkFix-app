import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {Textstyles} from './contact';
import SelectDropdown from 'react-native-select-dropdown';
import Languages from '../../../static/languages';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useAppDispatch} from '../../../redux/hooks';
import {setLanguage} from '../../../redux/App/setup.slice';
import {useNavigation} from '@react-navigation/native';
import {HomePageScreenProp} from '../../../navigation/types';
import {setLocalStorageLanguage} from '../../../utils/localStorage';

const LanguageSelection = () => {
  const [selectedLang, setSelectedLang] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomePageScreenProp>();

  return (
    <LoggedInBackground>
      <Text style={[Textstyles.text, Textstyles.title]}>
        Select your language
      </Text>

      <SelectDropdown
        data={Languages}
        onSelect={(
          selectedItem: {id: number; language: string; languageCode: string},
          index,
        ) => {
          setSelectedLang(selectedItem.languageCode);
        }}
        buttonTextAfterSelection={(
          selectedItem: {id: number; language: string; languageCode: string},
          index,
        ) => {
          return selectedItem.language.toUpperCase();
        }}
        rowTextForSelection={(
          item: {id: number; language: string; languageCode: string},
          index,
        ) => {
          return item.language.toUpperCase();
        }}
        rowStyle={{
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderWidth: 0,
        }}
        buttonStyle={{
          width: '100%',
          height: 50,
          borderRadius: 8,
          borderWidth: 0,

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
            source={require('../../../assets/utilityIcons/arrowup.png')}
          />
        )}
        dropdownIconPosition="right"
        defaultButtonText="Select Your Langouage"
        dropdownStyle={{
          backgroundColor: 'rgba(100,100,100,0.9)',
          borderRadius: 15,
          borderWidth: 0,
        }}
        buttonTextStyle={{color: '#fff'}}
        selectedRowTextStyle={{color: '#fff'}}
        rowTextStyle={{color: '#fff', borderWidth: 0}}
        selectedRowStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      />
      <View style={{width: '100%', marginTop: 10}}>
        <SubmitButton
          title="Select"
          onPress={async () => {
            dispatch(setLanguage(selectedLang));
            await setLocalStorageLanguage(selectedLang);
            navigation.navigate('HugeMenu2x2');
          }}
        />
      </View>
    </LoggedInBackground>
  );
};

export default LanguageSelection;

const styles = StyleSheet.create({});
