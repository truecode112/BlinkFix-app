import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputProfile from '../../../TextInputs/TextInputProfile';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {addAllergy} from '../../../../redux/Profile/allergies/addAllergy.thunk';
import {deleteAllergy} from '../../../../redux/Profile/allergies/deleteAllergy.thunk';
import SimpleSection from './SimpleSection';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropShadow from 'react-native-drop-shadow';
import {language} from '../../../../utils/languagePacks/selectLanguage';
import {getAllergies} from '../../../../redux/Profile/allergies/getAllergies.thunk';
import ScrollContainer from '../../../ScrollContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Autocomplete from 'react-native-autocomplete-input';

const AllergiesSection = ({}: {}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllergies());
  }, [dispatch]);

  const [isAddAllergyEnabled, setIsAddAllergyEnablrd] =
    useState<boolean>(false);

  const lng = useAppSelector(state => state.App.language);
  const {allergens} = language(lng);
  //TODO: translate from db

  const {width} = useWindowDimensions();

  const {data} = useAppSelector(state => state.allergiesState);
  const [selectedItems, setSelectedItems] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    if (!data) {
      dispatch(getAllergies());
    } else {
      if (data.allergies) {
        const dataFromDb = data.allergies;

        const dat = dataFromDb.map(allergyId => {
          const singleAllergy = allergens.find(
            allergens => allergens.id === allergyId,
          );
          return singleAllergy
            ? singleAllergy
            : {
                id: Math.floor((Math.random() * 100) / 100),
                name: '',
              };
        });

        setSelectedItems(dat);
      }
    }
  }, [data]);
  const [queryText, setQueryText] = useState('');

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={200}>
      <SimpleSection
        title="Allergies"
        isEditModeEnabled={isAddAllergyEnabled}
        Button={() =>
          isAddAllergyEnabled ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setIsAddAllergyEnablrd(!isAddAllergyEnabled);
                }}>
                <Image
                  source={require('../../../../assets/utilityIcons/add.png')}
                  style={{
                    width: 20,
                    height: 20,
                    transform: [{rotate: '45deg'}],
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setIsAddAllergyEnablrd(!isAddAllergyEnabled);
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/utilityIcons/add.png')}
                />
              </TouchableOpacity>
            </>
          )
        }>
        {selectedItems?.map((allergyToMap, index) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (isAddAllergyEnabled) {
                dispatch(deleteAllergy(allergyToMap.id.toString()));
                const filteredAllergiest = selectedItems.filter(
                  allergiest => allergiest.id !== allergyToMap.id,
                );
                setSelectedItems(filteredAllergiest);
              }

              //
            }}
            key={index}
            style={{
              position: 'relative',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInputProfile
              key={index}
              name="x"
              onChange={() => {}}
              placeholder="Add new allergy"
              value={allergyToMap.name}
              disabled={false}
            />
            {isAddAllergyEnabled && (
              <Image
                source={require('../../../../assets/utilityIcons/add.png')}
                style={{
                  width: 20,
                  height: 20,
                  transform: [{rotate: '45deg'}],
                  position: 'absolute',
                  right: 10,
                  alignSelf: 'center',
                }}
              />
            )}
          </TouchableOpacity>
        ))}
        {isAddAllergyEnabled && (
          <>
            <ScrollContainer>
              <SearchableDropdown
                nestedScrollEnabled
                multiple
                onItemSelect={(item: {id: number; name: string}) => {
                  setSelectedItems([...selectedItems, item]);
                  dispatch(addAllergy(item.id));
                }}
                containerStyle={{padding: 5}}
                onRemoveItem={(item: {id: number; name: string}) => {
                  const newItems = selectedItems.filter(
                    itemInArr => item.id !== itemInArr.id,
                  );
                  setSelectedItems(newItems);
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#dddddd20',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{color: '#fff'}}
                itemsContainerStyle={{maxHeight: 140}}
                items={allergens}
                defaultIndex={0}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Search for cuisine',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    width: width - 20,
                    alignSelf: 'center',
                    color: '#fff',
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </ScrollContainer>

            <TouchableOpacity
              style={{
                backgroundColor: '#EA3651',
                width: '50%',
                alignSelf: 'flex-end',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                setIsAddAllergyEnablrd(!isAddAllergyEnabled);
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </SimpleSection>
    </KeyboardAvoidingView>
  );
};

export default AllergiesSection;

export const StringInput = ({
  disabled,
  placeholder,
  editable,
  onChange,
  value,
  type,
  ref,
}: {
  type?: 'noBottom';
  disabled?: string;
  placeholder: string;
  editable: boolean;
  onChange: (text: string) => void;
  value: string;
  ref?: React.RefObject<TextInput>;
}) => {
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
          marginBottom: type === 'noBottom' ? 0 : 10,
          paddingHorizontal: 5,
        }}>
        <TextInput
          ref={ref}
          editable={editable === true ? false : true}
          placeholder={placeholder}
          onChangeText={text => {
            onChange(text);
          }}
          value={value}
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
