import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  IEstablishment,
  IMenu,
  IMenuItem,
} from '../../../../../../redux/Profile/types';
import ScrollContainer from '../../../../../../components/ScrollContainer';
import SingleMenuList from '../../../../../../components/Order/SingleMenuList';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {
  clearMessage,
  clearShopingCartWaiter,
} from '../../../../../../redux/Jobs/Waiter/WaiterOrder.slice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../../../../../navigation/Profile/ProfileNavigator.types';

const WaiterMenu = ({
  menu,
  establishment,
  selectedCategory,
}: {
  menu: IMenu;
  establishment: IEstablishment;
  selectedCategory: string | null;
}) => {
  const [filteredMenu, setFilteredMenu] = useState<IMenuItem[]>(menu.menuItems);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredMenu(menu.menuItems);
    } else {
      const filter = menu.menuItems.filter(
        item => item.category === selectedCategory,
      );
      setFilteredMenu(filter);
    }
  }, [selectedCategory]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileNavigation>();
  const {data, message, isLoading, succes} = useAppSelector(
    state => state.WaiterOrder,
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log({message, succes});
      if (message === 'order placed successfully' && succes) {
        dispatch(clearMessage());
        dispatch(clearShopingCartWaiter());
      }
    }, [message, succes]),
  );

  useEffect(() => {
    console.log({message, succes});
  }, [message, succes]);

  const renderItem = ({item}: {item: IMenuItem}) => (
    <SingleMenuList
      menuItem={item}
      key={item._id}
      establishmentId={establishment._id}
      establishment={establishment}
      style={{width: '50%', paddingHorizontal: 0, marginHorizontal: 0}}
      isWaiter={true}
    />
  );

  return (
    <>
      <Text>{message}</Text>
      <ScrollContainer>
        <FlatList
          data={filteredMenu}
          numColumns={2}
          contentContainerStyle={styles.container}
          renderItem={renderItem}
        />
      </ScrollContainer>
    </>
  );
};

export default WaiterMenu;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  item: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#f9c2ff',
  },
});
