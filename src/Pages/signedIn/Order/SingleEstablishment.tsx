import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ISingleEstablishmentProps} from '../../../navigation/order/types';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {WEBCONST} from '../../../constants/webConstants';
import SingleEstablishmentComponent from '../../../components/Order/SingleEstablishmentComponent';
import DropShadow from 'react-native-drop-shadow';
import InsetShadow from 'react-native-inset-shadow';
import {IMenu, IMenuItem} from '../../../redux/Profile/types';
import {ScrollView} from 'react-native-gesture-handler';
import SingleMenuList from '../../../components/Order/SingleMenuList';
import CategoryRecipesSelector, {
  CategoryEstablishmentSelector,
} from '../../../components/categorySelector';
import Animated from 'react-native-reanimated';

const SingleEstablishment = () => {
  const {params} = useRoute<ISingleEstablishmentProps['route']>();
  const establishment = params.establishment;

  const establishmentMenus = establishment.menu;

  const [selected, setSelected] = useState<string | null>(null);
  const [selectedMenuItemsState, setSelectedMenuItemsState] = useState<
    IMenuItem[] | null
  >(null);
  const [selectedMenuState, setSelectedMenuState] = useState<IMenu | null>(
    null,
  );
  useEffect(() => {
    if (selected) {
      const filteredMenu = establishmentMenus?.filter(
        menu => menu._id === selected,
      )[0];
      if (filteredMenu) {
        setSelectedMenuState(filteredMenu);
        setSelectedMenuItemsState(filteredMenu.menuItems);
      }
    } else setSelectedMenuItemsState(null);
  }, [selected]);
  const [categorySelected, setCategorySelected] = useState<string | null>(null);

  const [filteredMenuItems, setFilteredMenuItems] = useState<
    IMenuItem[] | null
  >(null);

  useEffect(() => {
    if (!categorySelected) setFilteredMenuItems(null);
    else {
      const category = selectedMenuState?.categoryVisibility.filter(
        category => {
          if (category._id === categorySelected) return category;
        },
      )[0];

      const afterFilter = selectedMenuItemsState?.filter(
        item => item.category === category?.categoryName,
      );
      if (afterFilter) setFilteredMenuItems(afterFilter);
    }
  }, [categorySelected]);
  const onlyVisibleCategories = selectedMenuState
    ? selectedMenuState?.categoryVisibility.filter(
        category => category.isVisible === true,
      )
    : [];
  return (
    <LoggedInBackground>
      <SingleEstablishmentComponent
        establishment={establishment}
        key={establishment._id}
        noCheckout
      />
      <ScrollView enabled={false} style={{width: '100%'}}>
        <ScrollView
          horizontal
          style={{height: 40, marginVertical: 10}}
          contentContainerStyle={{
            flexGrow: 1,
            height: 40,
            marginVertical: 10,
            justifyContent: 'space-around',
            alignSelf: 'center',
          }}>
          {establishmentMenus?.map(menu => {
            return selected === menu._id ? (
              <DropShadow
                key={menu._id}
                style={{
                  borderRadius: 5,
                  backgroundColor: '#0000000f',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.46,
                  shadowRadius: 15.14,

                  elevation: 17,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(menu._id);
                  }}>
                  <Text style={{color: '#fff', padding: 10}}>
                    {menu.menuName}
                  </Text>
                </TouchableOpacity>
              </DropShadow>
            ) : (
              <InsetShadow
                key={menu._id}
                containerStyle={{borderRadius: 5}}
                shadowRadius={9}
                shadowOffset={2}
                elevation={100}
                shadowOpacity={0.2}
                color="rgba(0,0,0,1)">
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() => {
                    setSelected(menu._id);
                  }}>
                  <Text style={{color: '#fff'}}>{menu.menuName}</Text>
                </TouchableOpacity>
              </InsetShadow>
            );
          })}
        </ScrollView>

        {selectedMenuState && (
          <CategoryEstablishmentSelector
            selected={categorySelected}
            setSelected={setCategorySelected}
            categoriesProp={onlyVisibleCategories}
          />
        )}
        {!categorySelected && (
          <ScrollView horizontal style={{flex: 1}}>
            {selectedMenuItemsState &&
              selectedMenuItemsState?.map(menuItem => (
                <SingleMenuList
                  menuItem={menuItem}
                  key={menuItem._id}
                  establishmentId={establishment._id}
                  establishment={establishment}
                />
              ))}
          </ScrollView>
        )}
        {categorySelected && (
          <ScrollView horizontal style={{flex: 1}}>
            {filteredMenuItems &&
              filteredMenuItems?.map(menuItem => (
                <SingleMenuList
                  menuItem={menuItem}
                  key={menuItem._id}
                  establishmentId={establishment._id}
                  establishment={establishment}
                />
              ))}
          </ScrollView>
        )}
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            textTransform: 'capitalize',
            marginVertical: 10,
            fontFamily: 'Handlee-Regular',
          }}>
          {establishment.name} bestsellers
        </Text>

        {/* menu item renderer */}
        <ScrollView horizontal style={{flex: 1}}>
          {selectedMenuItemsState &&
            selectedMenuItemsState?.map(menuItem => (
              <SingleMenuList
                menuItem={menuItem}
                key={menuItem._id}
                establishmentId={establishment._id}
                establishment={establishment}
              />
            ))}
        </ScrollView>
      </ScrollView>
      <View style={{height: 100}}></View>
    </LoggedInBackground>
  );
};

export default SingleEstablishment;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
});
