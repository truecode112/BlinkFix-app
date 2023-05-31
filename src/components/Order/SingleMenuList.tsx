import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Alert,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropShadow from 'react-native-drop-shadow';
import {IEstablishment, IMenuItem} from '../../redux/Profile/types';
import {WEBCONST} from '../../constants/webConstants';
import {useNavigation} from '@react-navigation/native';
import {IMenuItemAddModalNavigation} from '../../navigation/order/types';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import {AddMenuItemLike} from '../../redux/counters/favourites/Order/menuItems/addMenuItemLike.thunk';

/**
 * display menu item for establishment for standard user ends
 * @param param0 menuItems that will be shown
 * @returns View to this item
 */
const SingleMenuList = ({
  menuItem,
  establishmentId,
  establishment,
  style,
  isWaiter,
}: {
  menuItem: IMenuItem;
  establishmentId: string;
  establishment: IEstablishment;
  style?: ViewStyle;
  isWaiter?: boolean;
}) => {
  const navigation = useNavigation<IMenuItemAddModalNavigation>();
  const {width} = useWindowDimensions();

  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useAppDispatch();
  const LikeMenuItem = () => {
    setIsLiked(!isLiked);
    dispatch(AddMenuItemLike(menuItem._id));
  };

  const {data, isLoading} = useAppSelector(
    state => state.findNerbayEstablishment,
  );

  const [menuItemState, setMenuItemState] = useState<IMenuItem>();
  const likedMenuItems = useAppSelector(
    state => state.GetMyFavouritesMenuItems.data,
  );
  useEffect(() => {
    const likedIds = likedMenuItems?.map(menui => menui._id);
    if (likedIds?.includes(menuItem._id)) {
      setIsLikedFromDb(true);
      setIsLiked(true);
    } else {
      setIsLikedFromDb(false);
      setIsLiked(false);
    }
  }, [likedMenuItems]);
  const [isLikedFromDb, setIsLikedFromDb] = useState(false);

  useEffect(() => {
    if (menuItem) {
      setMenuItemState(menuItem);
    }
  }, [menuItem]);

  useEffect(() => {
    if (data) {
      const matchingEstab = data.find(
        establishment => establishment._id === establishmentId,
      );
      matchingEstab?.menu?.map(menu => {
        const itemIds = menu.menuItems.map(item => item._id);
        const matchingMenu = itemIds.includes(menuItem._id);

        if (matchingMenu) {
          const menuItemfiltered = menu?.menuItems.find(
            item => item._id === menuItem._id,
          );
          menu.menuItems.forEach(item => {
            if (item._id === menuItemfiltered?._id) {
              setMenuItemState(item);
            }
          });
          return menu;
        }
      });
    }
  }, [data]);

  const ShareMenuItem = () => {
    // TODO: share functionality
    Alert.alert('warning', 'not implemented yet');
  };

  return (
    <DropShadow
      key={menuItemState?._id}
      style={[
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,

          elevation: 17,
          width: width / 1.75,
          marginHorizontal: 10,
          backgroundColor: '#ffffff03',

          borderRadius: 15,
          position: 'relative',
        },
        style,
      ]}>
      {menuItemState && (
        <>
          {menuItem.allergens.length !== 0 && (
            <View
              style={{
                position: 'absolute',
                top: 15,
                right: 10,
                borderRadius: 20,
                backgroundColor: '#ffffff20',
                paddingVertical: 2,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                zIndex: 100,
              }}>
              <Image
                style={{height: 25, width: 25, marginRight: 10}}
                source={require('../../assets/utilityIcons/allergen.png')}
              />
              <Text style={[Textstyles.text, {fontSize: 12}]}>
                Allergens present
              </Text>
            </View>
          )}
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              padding: 10,
              zIndex: 10,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => {
                navigation.navigate('MenuItemAddModal', {
                  menuItem: menuItemState,
                  establishmentId,
                  establishment: establishment,
                  isWaiter: isWaiter,
                });
              }}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/utilityIcons/add.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '100%',
              width: '100%',
              padding: 10,
              paddingVertical: 30,
              paddingHorizontal: 40,
              margin: 0,
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
                  backgroundColor: '#ffffff09',
                }}
                source={
                  menuItem.image
                    ? {
                        uri: `${WEBCONST().STORAGEURLNEW}${
                          menuItemState.image?.path
                        }`,
                      }
                    : require('../../assets/BX.png')
                }
              />
            </DropShadow>
            <Text style={[styles.textStyle, {fontSize: 18}]}>
              {menuItemState.dishName}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 14,
                  fontFamily: 'Handlee-Regular',
                  maxHeight: 40,
                },
              ]}>
              {menuItemState.dishDescription}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 18,
                  fontWeight: '900',
                },
              ]}>
              {menuItemState.currency} {menuItemState.price}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              flexDirection: 'column',
              zIndex: 100,
            }}>
            <TouchableOpacity
              style={{
                margin: 5,
                padding: 5,
                backgroundColor: '#ffffff20',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={LikeMenuItem}>
              {isLiked ? (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/utilityIcons/liked.png')}
                />
              ) : (
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/utilityIcons/notliked.png')}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 5,
                padding: 5,
                backgroundColor: '#ffffff20',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={ShareMenuItem}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/utilityIcons/share.png')}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </DropShadow>
  );
};

export default SingleMenuList;

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Damion',
    textTransform: 'capitalize',
  },
});
