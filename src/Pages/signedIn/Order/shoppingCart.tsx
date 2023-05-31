import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {ScrollView} from 'react-native-gesture-handler';
import ShoppingListSingleItem from '../../../components/Order/ShoppingCart/ShoppingListSingleItem';
import {
  clearShoppingList,
  deleteShoppingListsByIndex,
  ICartItemItem,
  IShoppingCart,
} from '../../../redux/Order/shoppingCart.slice';
import {WEBCONST} from '../../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';
import {ShadowStyle} from '../../../components/backgrounds/menuSquareCartContainerRecipes';
import {uniqueId} from 'lodash';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MenuItemButton} from '../../../components/Order/MenuItemButton';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {IOrderNavigation} from '../../../navigation/order/types';
import {Textstyles} from '../menupages/contact';
import InvertedSectionList from 'inverted-section-list';
import CartItem from '../../../components/Order/ShoppingCart/CartItem';
import shoppinListSlice from '../../../redux/recipes/shoppingList/shoppinList.slice';
import {FavoritesPageScreenProp} from '../../../navigation/types';

const ShoppingCart = () => {
  //#region
  const {cartItems} = useAppSelector(state => state.ShoppingCart);
  const navigation = useNavigation<FavoritesPageScreenProp>();
  const [cartItemsState, setCartItemsState] = useState<
    {title: string; data: ICartItemItem[]; shoppingCart: IShoppingCart}[]
  >([]);

  useEffect(() => {
    if (cartItems) {
      const newCartItems = cartItems.map(item => {
        return {
          title: item.establishment.name,
          data: item.orderItems,
          shoppingCart: item,
        };
      });

      setCartItemsState(newCartItems);
    }
  }, [cartItems]);

  function deleteShopingLists(selectedItems: string[]) {
    dispatch(deleteShoppingListsByIndex(selectedItems));
  }

  //#endregion

  //#region
  const animationRotation = useSharedValue(0);
  const {width} = useWindowDimensions();
  const animationSide = useSharedValue(-width);
  const [isExtraButtonRotated, setIsExtraButtonRotated] = useState(false);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${animationRotation.value}deg`, {
            duration: 400,
          }),
        },
      ],
    };
  });
  const animationSideStyle = useAnimatedStyle(() => {
    return {
      right: withTiming(animationSide.value, {duration: 200}),
    };
  });

  const extraMenuRef = useRef(null);

  const {height} = useWindowDimensions();

  //#endregion

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  return (
    <LoggedInBackground
      withoutBottom
      stickyButton={() => (
        <TouchableOpacity
          onPress={() => {
            animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -width : 0;

            setIsExtraButtonRotated(!isExtraButtonRotated);
          }}
          style={{
            height: '100%',
            backgroundColor: '#4d4d4d',
            padding: 2,
            justifyContent: 'center',
          }}>
          <Animated.Image
            style={[{alignSelf: 'center', margin: 2}, animationStyle]}
            source={require('../../../assets/utilityIcons/3dots.png')}
          />
        </TouchableOpacity>
      )}>
      {(!cartItemsState || cartItemsState.length === 0) && (
        <Text style={Textstyles.text}>
          {' '}
          There is nothinh here. Add item to cart.
        </Text>
      )}
      <Animated.View
        ref={extraMenuRef}
        style={[
          {
            width: width,
            position: 'absolute',
            zIndex: 100,
            bottom: 0,
            height: '100%',
          },
          animationSideStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
            animationSide.value = isExtraButtonRotated ? -width : 0;
            setIsExtraButtonRotated(!isExtraButtonRotated);
          }}
          activeOpacity={1}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            padding: 20,
            paddingLeft: width / 2,
            paddingRight: 0,
            paddingBottom: 60,
          }}>
          <MenuItemButton
            title="Delete selected items"
            onPress={() => {
              if (selectedItems.length === 0) {
                Alert.alert('Nothing was selected');
              } else {
                deleteShopingLists(selectedItems);
              }
              animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
              animationSide.value = isExtraButtonRotated ? -width : 0;
              setIsExtraButtonRotated(!isExtraButtonRotated);
            }}
          />
          <MenuItemButton
            title="Clear shopping cart"
            onPress={() => {
              dispatch(clearShoppingList());
              animationRotation.value = !isExtraButtonRotated ? 1440 : 0;
              animationSide.value = isExtraButtonRotated ? -width : 0;
              setIsExtraButtonRotated(!isExtraButtonRotated);
              setCartItemsState([]);
            }}
          />
        </TouchableOpacity>
      </Animated.View>
      {/* HEREWASSCROLLVIEW */}
      <ScrollView
        horizontal
        enabled={false}
        contentContainerStyle={{flex: 1, height: height - 200}}>
        {cartItemsState && (
          <InvertedSectionList
            sections={cartItemsState}
            keyExtractor={() => uniqueId()}
            renderItem={({item, section, index}) => (
              <>
                <View key={uniqueId()} style={{marginBottom: 10}}>
                  <CartItem
                    key={uniqueId()}
                    item={item}
                    id={item.itemId}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    shoppingCartItems={section.shoppingCart}
                    specificItemId={index}
                  />
                </View>
              </>
            )}
            renderSectionFooter={({section}) => {
              const profileImage =
                WEBCONST().STORAGEURLNEW +
                // @ts-ignore
                section.shoppingCart.establishment.owner?.images?.profileImage
                  ?.path;

              function calculateTotalPrice(): string {
                const filteredItems = selectedItems.map(
                  index => section.shoppingCart.orderItems[parseInt(index)],
                );

                const itemPrices = filteredItems
                  .map(item => {
                    const ingPrice = item?.changes
                      .map(change => {
                        const ingerdient = item?.item?.dishIngredients.filter(
                          ing => ing._id === change.ingredientId,
                        )[0];

                        const difference =
                          parseFloat(change.qtt) - ingerdient.qtt;
                        const totalPerIngredient =
                          ingerdient.pricePerIngredient *
                          (difference > 0 ? difference : 0);
                        return totalPerIngredient;
                      })
                      .reduce((prev, sum) => prev + sum, 0);

                    return parseFloat(item?.item.price + ingPrice);
                  })
                  .reduce((prev, sum) => prev + sum, 0)
                  .toFixed(2);

                return itemPrices;
              }

              return (
                <View
                  key={uniqueId()}
                  style={{
                    backgroundColor: '#00000075',
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        borderRadius: 15,
                        backgroundColor: 'rgb(80,80,80)',
                      }}
                      blurRadius={5}
                      source={{
                        uri: `${WEBCONST().STORAGEURLNEW}${
                          // @ts-ignore
                          `${section.shoppingCart.establishment.owner?.images?.backgroundImage?.path}`
                        }`,
                      }}
                    />
                    <DropShadow style={[ShadowStyle.underImage]}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          marginBottom: 10,
                        }}
                        source={
                          // @ts-ignore
                          profileImage
                            ? {
                                uri: profileImage,
                              }
                            : require('../../../assets/BX.png')
                        }
                      />
                    </DropShadow>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        textTransform: 'capitalize',
                        fontFamily: 'Handlee-Regular',
                      }}>
                      {section.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        Textstyles.text,
                        {textAlign: 'center', fontSize: 15, marginLeft: 20},
                      ]}>
                      total price: {calculateTotalPrice()}
                    </Text>
                    <SubmitButton
                      style={{marginVertical: 10, marginRight: 20}}
                      onPress={() => {
                        const selectedItemsMap = selectedItems.map(
                          indexOfSelectedItem =>
                            section.shoppingCart.orderItems[
                              parseInt(indexOfSelectedItem)
                            ],
                        );
                        const selectedItemsFromSection =
                          selectedItemsMap.filter(allitems => {
                            const te = selectedItems.includes(allitems?.itemId);
                            if (te) return true;
                          });

                        if (selectedItemsMap.length === 0) {
                          Alert.alert('You must select at least one item');
                        } else {
                          const totalPrice = calculateTotalPrice();
                          navigation.navigate('paymentOrderPage', {
                            items: selectedItemsMap,
                            orderWhere: section.shoppingCart.establishment._id,
                            // TODO: add address
                            address: null,
                            total: parseFloat(totalPrice),
                          });
                        }
                      }}
                      title={`Finish shopping in ${section.shoppingCart.establishment.name}`}
                    />
                  </View>
                </View>
              );
            }}
            stickySectionHeadersEnabled={true}
          />
        )}
      </ScrollView>
    </LoggedInBackground>
  );
};

export default ShoppingCart;
