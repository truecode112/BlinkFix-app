import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IIsCategoryVisible} from '../../../../../redux/Profile/establishmentMenus/types';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {allCategoriesOrder} from '../../../../categorySelector/allCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SimpleSection from '../../infoScetion/SimpleSection';
import DropShadow from 'react-native-drop-shadow';
import InsetShadow from 'react-native-inset-shadow';
import _ from 'lodash';
import EditButton from '../../../../buttons/EditButton';
import SwitchButton from '../../../../buttons/SwitchButton';
import {EditEstablishmentMenuCategories} from '../../../../../redux/Order/Establishment.menycategory.thunk';
import SubmitButton from '../../../../touchables/SubmitButton';
import {ICategoryVisibility} from '../../../../../redux/Profile/types';
import {renderPhotoToRecipe} from '../../../../categorySelector';
import {Textstyles} from '../../../../../Pages/signedIn/menupages/contact';

const MenuCatoegryListSection = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const {data} = useAppSelector(state => state.MyEstabishmentMenus);

  const dispatch = useAppDispatch();

  const [categoryVisibleSection, setCategoryVisibleSection] =
    useState<boolean>(true);

  useEffect(() => {
    const selectedMenu = data?.filter(menu => {
      if (menu._id === selected) return menu;
    })[0];

    if (selectedMenu)
      setCategoryVisibleSection(selectedMenu.isOurMenuSubmenuVisible);
  }, [selected]);

  const [selectedMenuCategories, setSelectedMenuCategories] = useState<
    IIsCategoryVisible[] | null
  >(null);

  const [categoryVisiblility, setCategoryVisiblility] = useState<
    ICategoryVisibility[] | null
  >(null);

  useEffect(() => {
    if (data) {
      const selectedMenu = data.filter(menu => menu._id === selected)[0];
      setSelectedMenuCategories(selectedMenu?.categoryVisibility);

      const visibility = selectedMenu?.categoryVisibility;
      setCategoryVisiblility(visibility);
    }
  }, [data, selected]);

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);

  const changeVisiblity = (categoryId: string) => {
    const selectedMenu = data?.filter(menu => {
      if (menu._id === selected) return menu;
    })[0];

    if (isEditModeEnabled) {
      if (selectedMenu) {
        const action = categoryVisiblility?.map(category => {
          if (category._id === categoryId)
            return {...category, isVisible: !category.isVisible};
          else return category;
        });
        if (action) setCategoryVisiblility(action);
      }
    } else {
      Alert.alert('Warning', 'You might need to enable edit mode');
    }
  };

  const changeCategoryVisibility = () => {
    const newCategoriesVisible = selectedMenuCategories?.map(section => {
      section.isVisible = !categoryVisibleSection;
      return section;
    });
    if (newCategoriesVisible) {
      setCategoryVisibleSection(!categoryVisibleSection);
      setSelectedMenuCategories(newCategoriesVisible);
    }
  };

  useEffect(() => {
    const findAnyTrue = categoryVisiblility?.some(
      category => category.isVisible === false,
    );
    if (findAnyTrue === true) {
      setCategoryVisibleSection(false);
    }

    const findAnyfalse = categoryVisiblility?.some(
      category => category.isVisible === true,
    );
    if (findAnyfalse === true) {
      setCategoryVisibleSection(true);
    }
  }, [categoryVisiblility]);

  useEffect(() => {
    if (data && selectedMenuCategories) {
      const menuId = data[0]._id;
      const timeoutId = setTimeout(() => {}, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedMenuCategories, categoryVisibleSection]);

  return (
    <SimpleSection
      title={'Categories'}
      isEditModeEnabled={isEditModeEnabled}
      Button={() => (
        <EditButton
          isEditModeEnabled={isEditModeEnabled}
          setIsEditModeEnabled={setIsEditModeEnabled}
        />
      )}
      ExtraButton={() =>
        isEditModeEnabled ? (
          <SwitchButton
            categoryVisibleSection={categoryVisibleSection}
            setCategoryVisibleSection={setCategoryVisibleSection}
            onPress={() => changeCategoryVisibility()}
          />
        ) : null
      }>
      {categoryVisiblility ? (
        <ScrollView horizontal contentContainerStyle={{marginBottom: 10}}>
          {categoryVisiblility.map(category =>
            category.isVisible ? (
              <TouchableOpacity
                activeOpacity={1}
                key={category._id}
                //   disabled={isEditModeEnabled}
                onPress={() => {
                  changeVisiblity(category._id);
                }}>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: -2,
                      height: 4,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 15,
                    elevation: 1,
                    borderRadius: 10,
                    padding: 10,
                    overflow: 'hidden',
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    marginHorizontal: 5,
                    position: 'relative',
                    height: 100,
                    width: 100,
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 100,
                    }}
                    source={require('../../../../../assets/utilityIcons/visible.png')}
                  />
                  <Image
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                    source={renderPhotoToRecipe(category)}
                  />
                  <Text
                    style={[
                      Textstyles.text,
                      {
                        fontSize: 12,
                        marginTop: 10,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {category.categoryName}
                  </Text>
                </DropShadow>
              </TouchableOpacity>
            ) : (
              <InsetShadow
                key={category._id}
                containerStyle={{
                  width: 100,
                  height: 100,
                  shadowColor: 'rgba(0,0,0,.1)',
                  shadowOffset: {
                    width: -2,
                    height: 4,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 15,
                  elevation: 1,
                  borderRadius: 10,
                  padding: 10,
                  overflow: 'hidden',
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.01)',
                  marginHorizontal: 5,
                  position: 'relative',
                }}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 100,
                  }}
                  source={require('../../../../../assets/utilityIcons/notVisible.png')}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  // disabled={isEditModeEnabled}
                  key={category._id}
                  onPress={() => {
                    changeVisiblity(category._id);
                  }}>
                  <Image
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                    source={renderPhotoToRecipe(category)}
                  />
                  <Text
                    style={[
                      Textstyles.text,
                      {
                        fontSize: 12,
                        marginTop: 10,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {category.categoryName}
                  </Text>
                </TouchableOpacity>
              </InsetShadow>
            ),
          )}
        </ScrollView>
      ) : (
        <ScrollView horizontal contentContainerStyle={{marginBottom: 10}}>
          {placeholderCategoryVisibility.map(category =>
            category.isVisible ? (
              <TouchableOpacity
                activeOpacity={1}
                key={category._id}
                //   disabled={isEditModeEnabled}
                onPress={() => {
                  Alert.alert(
                    'warning',
                    'this is only example menu item add your own to perform this action',
                  );
                }}>
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: -2,
                      height: 4,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 15,
                    elevation: 1,
                    borderRadius: 10,
                    padding: 10,
                    overflow: 'hidden',
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    marginHorizontal: 5,
                    position: 'relative',
                    height: 100,
                    width: 100,
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 100,
                    }}
                    source={require('../../../../../assets/utilityIcons/visible.png')}
                  />
                  <Image
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                    source={renderPhotoToRecipe(category)}
                  />
                  <Text
                    style={[
                      Textstyles.text,
                      {
                        fontSize: 12,
                        marginTop: 10,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {category.categoryName}
                  </Text>
                </DropShadow>
              </TouchableOpacity>
            ) : (
              <InsetShadow
                key={category._id}
                containerStyle={{
                  width: 100,
                  height: 100,
                  shadowColor: 'rgba(0,0,0,.1)',
                  shadowOffset: {
                    width: -2,
                    height: 4,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 15,
                  elevation: 1,
                  borderRadius: 10,
                  padding: 10,
                  overflow: 'hidden',
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.01)',
                  marginHorizontal: 5,
                  position: 'relative',
                }}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 100,
                  }}
                  source={require('../../../../../assets/utilityIcons/notVisible.png')}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  // disabled={isEditModeEnabled}
                  key={category._id}
                  onPress={() => {
                    changeVisiblity(category._id);
                  }}>
                  <Image
                    style={{width: 40, height: 40, alignSelf: 'center'}}
                    source={renderPhotoToRecipe(category)}
                  />
                  <Text
                    style={[
                      Textstyles.text,
                      {
                        fontSize: 12,
                        marginTop: 10,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {category.categoryName}
                  </Text>
                </TouchableOpacity>
              </InsetShadow>
            ),
          )}
        </ScrollView>
      )}
      {isEditModeEnabled && (
        <SubmitButton
          title="Submit Changes"
          onPress={() => {
            if (categoryVisiblility)
              dispatch(
                EditEstablishmentMenuCategories({
                  categoryVisibility: categoryVisiblility,
                  menuId: selected,
                  isOurMenuSubmenuVisible: categoryVisibleSection,
                }),
              );
            setSelected(null);
          }}
        />
      )}
    </SimpleSection>
  );
};

export default MenuCatoegryListSection;

const styles = StyleSheet.create({});

const placeholderCategoryVisibility = [
  {_id: '642d3fc7af5d831bf5d7a3ce', categoryName: 'bakeries', isVisible: true},
  {_id: '642d3fc7af5d831bf5d7a3cf', categoryName: 'starters', isVisible: true},
  {_id: '642d3fc7af5d831bf5d7a3d0', categoryName: 'sides', isVisible: true},
  {_id: '642d3fc7af5d831bf5d7a3d1', categoryName: 'soups', isVisible: true},
  {_id: '642d3fc7af5d831bf5d7a3d2', categoryName: 'mains', isVisible: true},
  {_id: '642d3fc7af5d831bf5d7a3d3', categoryName: 'desserts', isVisible: true},
  {_id: '642d3fc7af5d831bf5d7a3d4', categoryName: 'beverages', isVisible: true},
  {
    _id: '642d3fc7af5d831bf5d7a3d5',
    categoryName: 'alc beverages',
    isVisible: true,
  },
  {_id: '642d3fc7af5d831bf5d7a3d6', categoryName: 'products', isVisible: true},
];
