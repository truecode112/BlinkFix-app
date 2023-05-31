import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {default as ccjson} from '../../../static/coutrycurrency.json';
import {TextInputCustom} from '../../../components/TextInputs';
import {addressType} from '../../../redux/Auth/AuthTypes';
import SubmitButton from '../../../components/touchables/SubmitButton';

const AddressCreate = ({
  address,
  setAddress,
  onPress,
}: {
  address: addressType;
  setAddress: React.Dispatch<React.SetStateAction<addressType>>;
  onPress: () => void;
}) => {
  const [ccList, setCcList] = useState<
    | {
        country: string;
        countryCode: string;
        currencyCode: string;
        name?: string;
      }[]
  >([]);

  useEffect(() => {
    const newClist = ccjson.map(language => {
      const name = language.country;
      return {...language, name};
    });
    setCcList(newClist);
  }, [ccjson]);
  const ref = useRef<TextInput>(null);
  const [selectedCountry, setSelectedCountry] = useState<{
    country: string;
    countryCode: string;
    currencyCode: string;
    name: string;
  } | null>({
    country: '',
    countryCode: '',
    currencyCode: '',
    name: '',
  });

  useEffect(() => {
    setAddress({
      ...address,
      country: selectedCountry ? selectedCountry.name : '',
    });
  }, [selectedCountry]);
  return (
    <ScrollView
      horizontal
      style={{width: '100%'}}
      contentContainerStyle={{
        width: '100%',
        margin: 0,
        padding: 0,
        height: '100%',
      }}
      scrollEnabled={false}
      keyboardShouldPersistTaps="always">
      <View style={{width: '100%'}}>
        <SearchableDropdown
          keyboardShouldPersistTaps="always"
          onItemSelect={(item: {
            country: string;
            countryCode: string;
            currencyCode: string;
            name: string;
          }) => {
            setSelectedCountry(item);
            setTimeout(() => {
              ref.current?.focus();
            }, 100);
          }}
          containerStyle={{padding: 5}}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#00000015',
            borderColor: '#bbbbbb15',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#fff'}}
          itemsContainerStyle={{
            maxHeight: 140,
            borderRadius: 5,
          }}
          items={ccList}
          defaultIndex={0}
          resetValue={true}
          textInputProps={{
            value: selectedCountry?.country,
            placeholder: 'Search for Country',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: 'transparent',
              borderRadius: 5,
              width: '103%',
              alignSelf: 'center',
              color: '#fff',
              backgroundColor: '#rgba(0,0,0,.15)',
            },
            clearTextOnFocus: true,
            onPress: () => {
              setSelectedCountry(null);
            },
            onFocused: () => {
              setSelectedCountry(null);
            },
            onTextChange: (text: string) => {
              setSelectedCountry(null);

              if (text.length === 0) {
                const newClist = ccjson.map(language => {
                  const name = language.country;
                  return {...language, name};
                });
                setCcList(newClist);
              }
            },
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />

        <TextInputCustom
          ref={ref}
          placeholder="city"
          onChange={setAddress}
          state={address}
          name="city"
          value={address.city}
        />
        <TextInputCustom
          placeholder="state"
          onChange={setAddress}
          state={address}
          name="state"
          value={address.state}
        />
        <TextInputCustom
          placeholder="postcode"
          onChange={setAddress}
          state={address}
          name="postcode"
          value={address.postcode}
        />
        <TextInputCustom
          placeholder="street"
          onChange={setAddress}
          state={address}
          name="street"
          value={address.street}
        />
        <TextInputCustom
          placeholder="buildingnumber"
          onChange={setAddress}
          state={address}
          name="buildingnumber"
          value={address.buildingnumber}
        />
        <SubmitButton onPress={onPress} title="Add new Address" />
      </View>
    </ScrollView>
  );
};

export default AddressCreate;

const styles = StyleSheet.create({});
