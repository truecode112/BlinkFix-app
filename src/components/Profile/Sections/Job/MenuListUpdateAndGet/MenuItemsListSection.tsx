import {Alert, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SimpleSection from '../../infoScetion/SimpleSection';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {ScrollView} from 'react-native-gesture-handler';
import SingleMenuItem from './SingleMenuItem';
import EditButton from '../../../../buttons/EditButton';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationAddMenuItems} from '../../../../../navigation/Profile/ProfileNavigator.types';
import {DeleteMyEstabishmentMenuItem} from '../../../../../redux/Profile/establishmentMenus/establishmentMenuItem/addEstablishmentMenuItem';

const MenuItemsListSection = ({selectedMenuId}: {selectedMenuId: string}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileNavigationAddMenuItems>();
  const {data} = useAppSelector(state => state.MyEstabishmentMenus);
  const filteredMenu =
    data && data?.filter(menu => menu._id === selectedMenuId)[0];

  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);

  return (
    <SimpleSection
      isEditModeEnabled={isEditModeEnabled}
      ExtraButton={() =>
        isEditModeEnabled ? (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => {
              navigation.navigate('AddMenuItem', {menuId: selectedMenuId});
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../../../assets/utilityIcons/add.png')}
            />
          </TouchableOpacity>
        ) : null
      }
      title={'Menu items'}
      Button={() => EditButton({isEditModeEnabled, setIsEditModeEnabled})}>
      <ScrollView horizontal>
        {filteredMenu && filteredMenu.menuItems.length !== 0 ? (
          filteredMenu.menuItems?.map(menuItem => {
            return (
              <View style={{position: 'relative'}} key={menuItem._id}>
                <SingleMenuItem menuItem={menuItem} key={menuItem._id} />
                {isEditModeEnabled && (
                  <View style={{position: 'absolute', right: 20, top: 30}}>
                    <TouchableOpacity
                      style={{width: 20, height: 20, marginBottom: 10}}
                      disabled={!isEditModeEnabled}
                      onPress={() => {
                        if (menuItem._id)
                          navigation.navigate('AddAllergens', {
                            menuItemId: menuItem._id,
                          });
                        else Alert.alert('Something went wrong');
                      }}>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 200,
                        }}
                        source={require('../../../../../assets/utilityIcons/allergenSafe.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: 20, height: 20, marginBottom: 10}}
                      disabled={!isEditModeEnabled}
                      onPress={() => {
                        navigation.navigate('EditMenuItem', {
                          menuId: selectedMenuId,
                          item: menuItem,
                        });
                      }}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../../assets/utilityIcons/editC.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: 20, height: 20, marginBottom: 10}}
                      disabled={!isEditModeEnabled}
                      onPress={() => {
                        dispatch(
                          DeleteMyEstabishmentMenuItem({
                            menuID: filteredMenu._id,
                            menuItem: menuItem,
                          }),
                        );
                      }}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../../assets/utilityIcons/deleteC.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={{position: 'relative'}} key={'not existing menu item'}>
            <SingleMenuItem menuItem={placeholderMenuItem('test')} />
            {isEditModeEnabled && (
              <View style={{position: 'absolute', right: 20, top: 30}}>
                <TouchableOpacity
                  style={{width: 20, height: 20, marginBottom: 10}}
                  disabled={!isEditModeEnabled}
                  onPress={() => {
                    Alert.alert(
                      'warning',
                      'this is only example menu item add your own to perform this action',
                    );
                  }}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 200,
                    }}
                    source={require('../../../../../assets/utilityIcons/allergenSafe.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: 20, height: 20, marginBottom: 10}}
                  disabled={!isEditModeEnabled}
                  onPress={() => {
                    Alert.alert(
                      'warning',
                      'this is only example menu item add your own to perform this action',
                    );
                  }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../../../assets/utilityIcons/editC.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: 20, height: 20, marginBottom: 10}}
                  disabled={!isEditModeEnabled}
                  onPress={() => {
                    Alert.alert(
                      'warning',
                      'this is only example menu item add your own to perform this action',
                    );
                  }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../../../assets/utilityIcons/deleteC.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <View style={{height: 50}}></View>
    </SimpleSection>
  );
};

export default MenuItemsListSection;

const placeholderMenuItem = (establishmentId: string) => {
  return {
    _id: 'not existing menu item',
    establishmentId: establishmentId,
    dishName: 'not existing menu item',
    isDishForDelivery: true,
    price: '21.99',
    currency: '$',
    dishDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum reiciendis culpa hic qui eum iusto quidem aspernatur est autem!',
    dishIngredients: [
      {
        _id: (Math.random() * 100000).toString(),
        qtt: 1,
        pricePerIngredient: 1,
        unit: 'liter',
        name: 'Paprika',
        isIngredientVisible: true,
        isIngredientEditable: true,
        __v: 0,
      },
      {
        _id: (Math.random() * 100000).toString(),
        qtt: 1,
        pricePerIngredient: 1,
        unit: 'string',
        name: 'Olive oil',
        isIngredientVisible: true,
        isIngredientEditable: true,
        __v: 0,
      },
      {
        _id: (Math.random() * 100000).toString(),
        qtt: 1,
        pricePerIngredient: 0,
        unit: 'string',
        name: 'Chicken thigh',
        isIngredientVisible: true,
        isIngredientEditable: true,
        __v: 0,
      },
      {
        _id: (Math.random() * 100000).toString(),
        qtt: 1,
        pricePerIngredient: 0,
        unit: 'string',
        name: 'Sweet potatoes',
        isIngredientVisible: true,
        isIngredientEditable: true,
        __v: 0,
      },
      {
        _id: (Math.random() * 100000).toString(),
        qtt: 1,
        pricePerIngredient: 0,
        unit: 'string',
        name: 'Red bell pepper',
        isIngredientVisible: true,
        isIngredientEditable: true,
        __v: 0,
      },
      {
        _id: (Math.random() * 100000).toString(),
        qtt: 1,
        pricePerIngredient: 0,
        unit: 'string',
        name: 'Onion',
        isIngredientVisible: true,
        isIngredientEditable: true,
        __v: 0,
      },
    ],
    spiceness: 'normal',
    isVegan: true,
    isKosher: true,
    isHalal: true,
    category: 'starters',
    allergens: [1],
  };
};
