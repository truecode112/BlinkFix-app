import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import LoggedInBackground from '../../../../../../components/background/loggedInBackground';
import {CategoryEstablishmentSelector} from '../../../../../../components/categorySelector';
import {
  ProfileNavigation,
  WorkspaceWaiterMenuProps,
} from '../../../../../../navigation/Profile/ProfileNavigator.types';
import {useAppSelector} from '../../../../../../redux/hooks';
import {IMenu} from '../../../../../../redux/Profile/types';
import {Textstyles} from '../../../../menupages/contact';
import WaiterMenu from './WaiterMenu';
import WaiterMenuNames from './WaiterMenuNames';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WaiterSection = () => {
  const {params} = useRoute<WorkspaceWaiterMenuProps['route']>();
  const establishment = params.establishment;
  const menuNames = establishment?.menu?.map(state => state.menuName);
  const [selectedMenuName, setSelectedMenuName] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<IMenu>();

  useEffect(() => {
    const machingMenu = establishment?.menu?.find(
      menu => menu.menuName === selectedMenuName,
    );
    if (machingMenu) setSelectedMenu(machingMenu);
  }, [selectedMenuName]);

  const visibleCategories = selectedMenu?.categoryVisibility.filter(
    category => category.isVisible === true,
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  useEffect(() => {
    const selectedCategoryName = visibleCategories?.find(
      category => category._id === selectedCategory,
    )?.categoryName;
    if (selectedCategoryName) setSelectedCategoryName(selectedCategoryName);
    else setSelectedCategoryName(null);
  }, [selectedCategory]);
  const {data} = useAppSelector(state => state.WaiterOrder);
  const filteredList = data
    ? data.filter(item => item.establishment._id === establishment._id)
    : [];

  const navigation = useNavigation<ProfileNavigation>();

  return (
    <LoggedInBackground
      stickyButton={
        filteredList.length !== 0
          ? () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('WaiterListOfOrders', {
                      listOfOrders: filteredList,
                    });
                  }}>
                  <View
                    style={[
                      {
                        backgroundColor: '#ea3651',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    {/* <MCI
                      name="shopping-outline"
                      color={'#fff'}
                      size={18}
                      style={{position: 'absolute', left: 8}}
                    /> */}
                    <Text
                      style={[
                        Textstyles.text,
                        {position: 'absolute', top: 0, right: 10, fontSize: 15},
                      ]}>
                      {filteredList.length}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          : () => <></>
      }>
      <View>
        {establishment && (
          <View>
            <WaiterMenuNames
              menuNames={menuNames ? menuNames : []}
              selectedMenuName={selectedMenuName}
              setSelectedMenuName={setSelectedMenuName}
            />
            {visibleCategories && (
              <CategoryEstablishmentSelector
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                categoriesProp={visibleCategories}
              />
            )}
            {selectedMenu && (
              <WaiterMenu
                menu={selectedMenu}
                establishment={establishment}
                selectedCategory={selectedCategoryName}
              />
            )}
          </View>
        )}
      </View>
    </LoggedInBackground>
  );
};

export default WaiterSection;
