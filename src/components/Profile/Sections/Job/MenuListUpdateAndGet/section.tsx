import {StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {IEstablishment} from '../../../../../redux/Profile/types';
import MenuTitles from './MenuTitles.section';
import MenuItemsListSection from './MenuItemsListSection';
import MenuCatoegryListSection from './MenuCatoegryListSection';
import {useAppDispatch} from '../../../../../redux/hooks';
const MenuListUpdateAndGet = ({
  establishment,
}: {
  establishment: IEstablishment;
}) => {
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <MenuTitles
        selected={selected}
        setSelected={setSelected}
        establishment={establishment}
      />

      {selected && (
        <MenuCatoegryListSection
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {selected && <MenuItemsListSection selectedMenuId={selected} />}
    </>
  );
};

export default MenuListUpdateAndGet;

const styles = StyleSheet.create({});
