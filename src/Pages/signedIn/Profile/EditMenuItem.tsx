import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {
  IIngredientEstablishment,
  IMenuItem,
} from '../../../redux/Profile/establishmentMenus/types';
import CategoryRecipesSelector from '../../../components/categorySelector';
import {allCategoriesOrder} from '../../../components/categorySelector/allCategories';
import SpicenesSelector from '../../../components/selectors/SpicenesSelector';
import BooleansSelectors from '../../../components/selectors/BooleansSelectors';
import TextInputProfile from '../../../components/TextInputs/TextInputCuisine';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {EditMyEstabishmentMenuItem} from '../../../redux/Profile/establishmentMenus/establishmentMenuItem/addEstablishmentMenuItem';
import {
  ProfileNavigation,
  ProfileNavigationPropsEditMenuItems,
} from '../../../navigation/Profile/ProfileNavigator.types';
import {useNavigation} from '@react-navigation/native';
import IngredientForEstablishmentController from '../../../components/Profile/Sections/Job/MenuListUpdateAndGet/IngredientForEstablishmentController';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker, {Image as ImageProps} from 'react-native-image-crop-picker';
import {createFormData} from '../../../utils/photos/handleFormdata';
import {PostMyEstabishmentMenusItemImages} from '../../../redux/Profile/establishmentMenus/EstablishmentMenu.thunk';
import {WEBCONST} from '../../../constants/webConstants';
import {getMyWallet} from '../../../redux/Profile/wallet/wallet.thunks';

const ProfileNavigationEditMenuItemsPage = (
  props: ProfileNavigationPropsEditMenuItems,
) => {
  const navigation = useNavigation<ProfileNavigation>();
  const [isDispatchFired, setIsDispatchFired] = useState<boolean>(false);
  const {menuId, item} = props.route.params;
  const [EditMenuItemState, setEditMenuItemState] = useState<IMenuItem>(item);
  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
  >(null);
  const categories = allCategoriesOrder();
  const {isLoading} = useAppSelector(state => state.MyEstabishmentMenus);
  useEffect(() => {
    setEditMenuItemState(item);
  }, [item]);

  useEffect(() => {
    if (selected)
      setEditMenuItemState({
        ...EditMenuItemState,
        category: categories[selected].cagetoryName,
      });
  }, [selected]);
  const {succes} = useAppSelector(state => state.MyEstabishmentMenus);

  const dispatch = useAppDispatch();
  const wallet = useAppSelector(state => state.wallet.data);
  useEffect(() => {
    dispatch(getMyWallet());
  }, [props]);

  const [itemImage, setItemImage] = useState<ImageProps | null>(null);

  useEffect(() => {
    if (isLoading) setIsDispatchFired(true);
  }, [isLoading]);
  useEffect(() => {
    if (succes && isDispatchFired && itemImage === null) {
      navigation.navigate('ProfileHome');
      setIsDispatchFired(false);
    }
    if (item._id && succes && isDispatchFired && itemImage !== null) {
      if (itemImage.filename) {
        const data = createFormData(
          {
            uri:
              Platform.OS === 'ios'
                ? `file:///${itemImage?.path}`
                : itemImage.path,
            type: 'image/png',
            fileName: itemImage.filename,
          },
          'menuItem',
        );
        dispatch(
          PostMyEstabishmentMenusItemImages({
            menuItemId: item._id,
            image: data,
          }),
        );
      }
      navigation.navigate('ProfileHome');
      setIsDispatchFired(false);
    }
  }, [succes, isDispatchFired]);

  return (
    <LoggedInBackground>
      <Text style={styles.title}>Add image to menu item</Text>
      <TouchableOpacity
        onPress={() => {
          ImagePicker.openPicker({
            freeStyleCropEnabled: true,
            cropping: true,
            cropperCircleOverlay: true,
            mediaType: 'photo',
            compressImageQuality: 1,
          })
            .then(image => {
              if (image) setItemImage(image);
            })
            .catch(err =>
              Alert.alert('error', JSON.stringify(err), [
                {onPress: () => setItemImage(null)},
              ]),
            );
        }}
        style={{
          padding: 10,
          backgroundColor: 'rgba(255,255,255,.1)',
          borderRadius: 50,
          marginVertical: 10,
        }}>
        {item.image && !itemImage && (
          <Image
            style={{width: 200, height: 200, borderRadius: 50}}
            source={{
              uri: `${WEBCONST().STORAGEURLNEW}${
                item.image.path
              }?${new Date().getTime()}`,
            }}
          />
        )}
        {!item.image && !itemImage && (
          <Image
            style={{width: 200, height: 200, borderRadius: 50}}
            source={require('../../../assets/utilityIcons/addImage.png')}
          />
        )}
        {itemImage && (
          <Image
            style={{width: 200, height: 200, borderRadius: 50}}
            source={{uri: itemImage.path}}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>Title</Text>
      <TextInputProfile
        placeholder={'Dish Name'}
        onChange={setEditMenuItemState}
        name={'dishName'}
        value={EditMenuItemState.dishName}
        state={EditMenuItemState}
      />
      <Text style={styles.title}>Description</Text>
      <TextInputProfile
        placeholder={'Dish Description'}
        onChange={setEditMenuItemState}
        name={'dishDescription'}
        value={EditMenuItemState.dishDescription}
        state={EditMenuItemState}
      />

      {/* cuisine Selector  **/}

      <Text style={styles.title}>Types</Text>
      <BooleansSelectors
        setBooleanDataState={(
          isVegan: boolean,
          isHalal: boolean,
          isKosher: boolean,
        ) => {
          setEditMenuItemState({
            ...EditMenuItemState,
            isVegan,
            isHalal,
            isKosher,
          });
        }}
      />
      <Text style={styles.title}>Dishes category</Text>

      <CategoryRecipesSelector
        selected={selected}
        setSelected={setSelected}
        categoriesProp={categories}
      />
      <Text style={styles.title}>Spiceness category</Text>

      <SpicenesSelector
        setSpiceness={(text: string) =>
          setEditMenuItemState({...EditMenuItemState, spiceness: text})
        }
      />
      {!wallet?.currency && (
        <>
          <Text style={styles.title}>Currency </Text>
          <TextInputProfile
            placeholder={'currency'}
            onChange={setEditMenuItemState}
            name={'currency'}
            value={EditMenuItemState.currency}
            state={EditMenuItemState}
          />
        </>
      )}

      <Text style={styles.title}>Price</Text>

      <TextInputProfile
        placeholder={'Dish Price'}
        onChange={setEditMenuItemState}
        name={'price'}
        value={EditMenuItemState.price.toString()}
        state={EditMenuItemState}
      />

      <IngredientForEstablishmentController
        ingredients={EditMenuItemState.dishIngredients}
        setIngredients={(
          ingredients: IIngredientEstablishment[] | undefined,
        ) => {
          setEditMenuItemState({
            ...EditMenuItemState,
            dishIngredients: ingredients,
          });
        }}
        currency={
          wallet?.currency ? wallet.currency : EditMenuItemState.currency
        }
      />

      <SubmitButton
        title="Submit new Item"
        onPress={() => {
          dispatch(
            EditMyEstabishmentMenuItem({
              menuID: menuId,
              menuItem: EditMenuItemState,
            }),
          );
        }}
      />
    </LoggedInBackground>
  );
};

export default ProfileNavigationEditMenuItemsPage;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
    fontSize: 20,
    marginTop: 5,
  },
});
