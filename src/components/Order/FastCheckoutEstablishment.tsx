import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IEstablishment, IMenu, IMenuItem} from '../../redux/Profile/types';
import {ScrollView} from 'react-native-gesture-handler';
import {WEBCONST} from '../../constants/webConstants';
import InsetShadow from 'react-native-inset-shadow';
import DropShadow from 'react-native-drop-shadow';
import SubmitButton from '../touchables/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {MenuOrderNavigation} from '../../navigation/order/types';

const FastCheckoutEstablishment = ({
  establishment,
}: {
  establishment: IEstablishment;
}) => {
  const navigation = useNavigation<MenuOrderNavigation>();
  const [establishmentMenus, setEstablishmentMenus] = useState<IMenu[] | null>(
    null,
  );

  const [selectedMenuItemsState, setSelectedMenuItemsState] = useState<
    IMenuItem[] | null
  >(null);

  useEffect(() => {
    if (establishment.menu) {
      setEstablishmentMenus(establishment.menu);
    }
  }, [establishmentMenus]);
  const [selected, setSelected] = useState<string | null>(null);
  const {width} = useWindowDimensions();

  useEffect(() => {
    if (
      !selected &&
      establishmentMenus !== null &&
      establishmentMenus[0]?._id
    ) {
      setSelected(establishmentMenus[0]?._id);
    }
  }, [selected, establishmentMenus]);

  useEffect(() => {
    const selectedMenu = establishmentMenus?.filter(
      menu => menu._id === selected,
    )[0];

    const selectedMenuItems = selectedMenu?.menuItems;
    if (selectedMenuItems) setSelectedMenuItemsState(selectedMenuItems);
    else setSelectedMenuItemsState(null);
  }, [selected]);
  return (
    <View style={{marginBottom: 4}}>
      <ScrollView
        style={{
          flexDirection: 'row',
          maxWidth: '70%',
        }}
        contentContainerStyle={{
          flexDirection: 'row',
          flexGrow: 1,
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
        {establishmentMenus?.map(menu =>
          selected === menu._id ? (
            <DropShadow
              key={menu._id}
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: '#ffffff0f',
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
                <Text style={[styles.textStyle, {color: '#fff'}]}>
                  {menu.menuName}
                </Text>
              </TouchableOpacity>
            </DropShadow>
          ) : (
            <InsetShadow
              key={menu._id}
              containerStyle={{padding: 10, borderRadius: 5}}
              shadowRadius={9}
              shadowOffset={2}
              elevation={100}
              shadowOpacity={0.2}
              color="rgba(128,128,128,1)">
              <TouchableOpacity
                onPress={() => {
                  setSelected(menu._id);
                }}>
                <Text style={[styles.textStyle, {color: '#fff'}]}>
                  {menu.menuName}
                </Text>
              </TouchableOpacity>
            </InsetShadow>
          ),
        )}
      </ScrollView>
      <ScrollView horizontal style={{}}>
        {selectedMenuItemsState &&
          selectedMenuItemsState?.map((menuItem, index) => (
            <DropShadow
              key={index}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.46,
                shadowRadius: 11.14,

                elevation: 17,
                width: width / 1.75,
                marginHorizontal: 20,
                backgroundColor: '#ffffff03',

                padding: 20,
                marginVertical: 30,
                borderRadius: 5,
              }}>
              <DropShadow
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 10,
                    height: 10,
                  },
                  shadowOpacity: 0.39,
                  shadowRadius: 8.3,

                  elevation: 13,
                }}>
                <Image
                  style={{
                    height: 100,
                    width: '80%',
                    aspectRatio: 1,
                    resizeMode: 'contain',
                    borderRadius: width,
                    alignSelf: 'center',
                  }}
                  source={{
                    uri: `${WEBCONST().STORAGEURLNEW}${menuItem.image?.path}`,
                  }}
                />
              </DropShadow>
              <Text style={[styles.textStyle, {fontSize: 18}]}>
                {menuItem.dishName}
              </Text>
              <Text
                style={[
                  styles.textStyle,
                  {fontSize: 14, fontFamily: 'Handlee-Regular', maxHeight: 40},
                ]}>
                {menuItem.dishDescription}
              </Text>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 18,
                    fontWeight: '900',
                  },
                ]}>
                {menuItem.currency} {menuItem.price}
              </Text>
            </DropShadow>
          ))}
      </ScrollView>
      <SubmitButton
        onPress={() => {
          navigation.navigate('SingleRestaurantPage', {
            establishment: establishment,
          });
        }}
        title={`Go to ${establishment.name}`}
      />
    </View>
  );
};

export default FastCheckoutEstablishment;

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Damion',
    textTransform: 'capitalize',
  },
});
