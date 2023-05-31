import React, {useEffect, useState} from 'react';

import LoggedInBackground from '../../../../components/background/loggedInBackground';
import {
  IAddAllergenToMenuItemProps,
  ProfileAddRecipeNavigationProps,
} from './AddAllergenToMenuItem.types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

import {AddAllergenToMenuItemStyles} from './AddAllergenToMenuItemStyle';
import ScrollContainer from '../../../../components/ScrollContainer';
import {language} from '../../../../utils/languagePacks/selectLanguage';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {Textstyles} from '../../menupages/contact';
import SubmitButton from '../../../../components/touchables/SubmitButton';
import {addAllergyToMenuItemThunk} from '../../../../redux/Profile/allergies/AddAllergenToMenuItem/AddAllergenToMenuItem.thunk';
import {cleanAddAllergenToMenuItemSlice} from '../../../../redux/Profile/allergies/AddAllergenToMenuItem/AddAllergenToMenuItem.slice';
import {getAllergyOfMenuItemThunk} from '../../../../redux/Profile/allergies/AddAllergenToMenuItem/GetAllergensOfMenuItem.thunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddAllergenToMenuItem = (props: IAddAllergenToMenuItemProps) => {
  const route = useRoute<ProfileAddRecipeNavigationProps['route']>();
  const {data, succes, error} = useAppSelector(
    state => state.AddAllergensToMenuItem,
  );
  const deleteButton = require('../../../../assets/utilityIcons/deleteC.png');
  const {params} = route;
  const dispatch = useAppDispatch();
  const {width} = useWindowDimensions();
  const lng = useAppSelector(state => state.App.language);
  const {allergens} = language(lng);

  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
  const [allergensNames, setAllergensNames] = useState<typeof allergens>([]);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllergyOfMenuItemThunk(params.menuItemId));
  }, [params]);

  useEffect(() => {
    if (data && succes) {
      setSelectedAllergens(data.allergens);
    }
  }, [data, succes, error]);

  const OnClickAddAllergenToMenuItem = ({
    selectedAllergens,
    menuItemId,
  }: {
    selectedAllergens: number[];
    menuItemId: string;
  }) => {
    dispatch(
      addAllergyToMenuItemThunk({menuItemId, allergens: selectedAllergens}),
    );
  };

  useEffect(() => {
    const allergensSelectedNames = allergens.filter(singleallergen =>
      selectedAllergens.includes(singleallergen.id),
    );
    setAllergensNames(allergensSelectedNames);
  }, [selectedAllergens]);
  return (
    <LoggedInBackground>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
        <View style={AddAllergenToMenuItemStyles.AllergenContainer}>
          {allergensNames.map(allergen => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const filteredAllergens = allergensNames.filter(
                    allergenToDelete => allergenToDelete.id !== allergen.id,
                  );
                  const filteredIds = selectedAllergens.filter(
                    allergenId => allergenId !== allergen.id,
                  );
                  setSelectedAllergens(filteredIds);
                  setAllergensNames(filteredAllergens);
                }}
                key={allergen.id}
                style={AddAllergenToMenuItemStyles.singleAllergen}>
                <Text
                  style={[
                    Textstyles.text,
                    {textTransform: 'capitalize', fontSize: 14},
                  ]}>
                  {allergen.name}
                </Text>
                <Image
                  source={deleteButton}
                  style={AddAllergenToMenuItemStyles.DeleteButton}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedAllergens.length !== 0 && (
          <SubmitButton
            title="Submit List"
            style={{marginTop: 10}}
            onPress={() => {
              OnClickAddAllergenToMenuItem({
                selectedAllergens,
                menuItemId: params.menuItemId,
              });
              navigation.goBack();
            }}
          />
        )}
        {selectedAllergens.length !== 0 && (
          <SubmitButton
            title="Clean up AllergenList"
            style={{marginTop: 10}}
            onPress={() => {
              OnClickAddAllergenToMenuItem({
                selectedAllergens: [],
                menuItemId: params.menuItemId,
              });
              setSelectedAllergens([]);
            }}
          />
        )}
        <Text style={[Textstyles.text, Textstyles.title]}>
          Choose allergens from list
        </Text>

        <ScrollContainer>
          <SearchableDropdown
            keyboardShouldPersistTaps={'always'}
            items={allergens}
            multiple
            onItemSelect={(item: {id: number; name: string}) => {
              const newAllergens = [...selectedAllergens, item.id];
              setSelectedAllergens([...new Set(newAllergens)]);
            }}
            containerStyle={{padding: 5}}
            onRemoveItem={(item: {id: number; name: string}) => {}}
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
            defaultIndex={0}
            resetValue={false}
            textInputProps={{
              placeholder: 'Search for allergen',
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
              keyboardShouldPersistTaps: 'always',
              nestedScrollEnabled: true,
            }}
          />
        </ScrollContainer>
      </KeyboardAwareScrollView>
    </LoggedInBackground>
  );
};

export default AddAllergenToMenuItem;
