import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {
  IIngredientEstablishment,
  IMenuItem,
} from '../../../redux/Profile/establishmentMenus/types';
import CategoryRecipesSelector from '../../../components/categorySelector';
import {allCategoriesOrder} from '../../../components/categorySelector/allCategories';
import {SpicenessList} from '../../../static/spiceness';
import SpicenesSelector from '../../../components/selectors/SpicenesSelector';
import BooleansSelectors from '../../../components/selectors/BooleansSelectors';
import TextInputProfile from '../../../components/TextInputs/TextInputCuisine';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {PostMyEstabishmentMenuItem} from '../../../redux/Profile/establishmentMenus/establishmentMenuItem/addEstablishmentMenuItem';
import {
  ProfileNavigationAddMenuItems,
  ProfileNavigationPropsAddMenuItems,
} from '../../../navigation/Profile/ProfileNavigator.types';
import {cleanUpMyEstablishmentMenusGet} from '../../../redux/Profile/establishmentMenus/EstablishmentMenu.slice';
import {useNavigation} from '@react-navigation/native';
import IngredientForEstablishmentController from '../../../components/Profile/Sections/Job/MenuListUpdateAndGet/IngredientForEstablishmentController';
import ImagePicker, {Image as ImageProps} from 'react-native-image-crop-picker';
import {PostMyEstabishmentMenusItemImages} from '../../../redux/Profile/establishmentMenus/EstablishmentMenu.thunk';
import {createFormData} from '../../../utils/photos/handleFormdata';
import {getMyWallet} from '../../../redux/Profile/wallet/wallet.thunks';

const ProfileNavigationAddMenuItemsPage = (
  props: ProfileNavigationPropsAddMenuItems,
) => {
  const navigation = useNavigation<ProfileNavigationAddMenuItems>();
  const [isDispatchFired, setIsDispatchFired] = useState<boolean>(false);

  const wallet = useAppSelector(state => state.wallet.data);
  useEffect(() => {
    dispatch(getMyWallet());
  }, [props]);

  const menuId = props.route.params.menuId;
  const [newMenuItemState, setNewMenuItemState] = useState<IMenuItem>({
    dishName: '',
    dishDescription: '',
    price: '',
    currency: '',
    isDishForDelivery: true,
    category: '',
    spiceness: '',
    isVegan: false,
    isKosher: false,
    isHalal: false,
    dishIngredients: [],
    allergens: [],
  });
  const dispatch = useAppDispatch();
  const {isLoading, lastAddedId} = useAppSelector(
    state => state.MyEstabishmentMenus,
  );

  const [selected, setSelected] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  >(0);
  const categories = allCategoriesOrder();

  useEffect(() => {
    if (selected === 0) {
      setNewMenuItemState({
        ...newMenuItemState,
        category: categories[selected].cagetoryName,
      });
    }
    if (selected) {
      setNewMenuItemState({
        ...newMenuItemState,
        category: categories[selected].cagetoryName,
      });
    }
  }, [selected]);

  const {succes} = useAppSelector(state => state.MyEstabishmentMenus);

  useEffect(() => {
    if (isLoading) setIsDispatchFired(true);
  }, [isLoading]);

  useEffect(() => {
    if (succes && isDispatchFired && itemImage === null) {
      navigation.navigate('ProfileHome');
      setIsDispatchFired(false);
    }
  }, [succes, isDispatchFired]);

  useEffect(() => {
    if (lastAddedId && succes && isDispatchFired && itemImage !== null) {
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
            menuItemId: lastAddedId,
            image: data,
          }),
        );
      }
      navigation.navigate('ProfileHome');
      setIsDispatchFired(false);
    }
  }, [lastAddedId]);

  const [itemImage, setItemImage] = useState<ImageProps | null>(null);

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
          borderRadius: 500,
          marginVertical: 10,
        }}>
        {!itemImage ? (
          <Image
            style={{width: 150, height: 150, margin: 20}}
            source={require('../../../assets/utilityIcons/addImage.png')}
          />
        ) : (
          <>
            <Image
              style={{width: 200, height: 200, borderRadius: 500}}
              source={{uri: itemImage.path}}
            />
          </>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>Title</Text>
      <TextInputProfile
        placeholder={'Dish Name'}
        onChange={setNewMenuItemState}
        name={'dishName'}
        value={newMenuItemState.dishName}
        state={newMenuItemState}
      />
      <Text style={styles.title}>Description</Text>
      <TextInputProfile
        multiline
        placeholder={'Dish Description'}
        onChange={setNewMenuItemState}
        name={'dishDescription'}
        value={newMenuItemState.dishDescription}
        state={newMenuItemState}
      />

      {/* cuisine Selector  **/}
      <Text style={styles.title}>Types</Text>
      <BooleansSelectors
        setBooleanDataState={(
          isVegan: boolean,
          isHalal: boolean,
          isKosher: boolean,
        ) => {
          setNewMenuItemState({
            ...newMenuItemState,
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
        categoriesProp={allCategoriesOrder()}
      />
      <Text style={styles.title}>Spiceness category</Text>

      <SpicenesSelector
        setSpiceness={(text: string) =>
          setNewMenuItemState({...newMenuItemState, spiceness: text})
        }
      />

      <Text style={styles.title}>Price</Text>
      <TextInputProfile
        placeholder={'Dish Price'}
        onChange={setNewMenuItemState}
        name={'price'}
        value={newMenuItemState.price}
        state={newMenuItemState}
      />
      {!wallet?.currency && (
        <TextInputProfile
          placeholder={'Currency'}
          onChange={setNewMenuItemState}
          name={'currency'}
          value={newMenuItemState.currency}
          state={newMenuItemState}
        />
      )}
      <IngredientForEstablishmentController
        ingredients={newMenuItemState.dishIngredients}
        setIngredients={(
          ingredients: IIngredientEstablishment[] | undefined,
        ) => {
          setNewMenuItemState({
            ...newMenuItemState,
            dishIngredients: ingredients,
          });
        }}
        currency={
          wallet?.currency ? wallet.currency : newMenuItemState.currency
        }
      />
      <SubmitButton
        title="Submit new Item"
        onPress={() => {
          dispatch(cleanUpMyEstablishmentMenusGet());
          dispatch(
            PostMyEstabishmentMenuItem({
              menuID: menuId,
              menuItem: {
                ...newMenuItemState,
                currency: wallet ? wallet.currency : '',
              },
            }),
          );
          setIsDispatchFired(true);
        }}
      />
    </LoggedInBackground>
  );
};

export default ProfileNavigationAddMenuItemsPage;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
    fontSize: 20,
    marginTop: 5,
  },
});
