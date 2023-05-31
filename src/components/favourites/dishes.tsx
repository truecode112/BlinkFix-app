import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import {getLikedMenuItems} from '../../redux/counters/favourites/Order/menuItems/getLikedMenuItems.thunk';
import Spinner from 'react-native-spinkit';
import SingleMenuList from '../Order/SingleMenuList';
import {ScrollView} from 'react-native-gesture-handler';
import {IMenuItem} from '../../redux/Profile/types';
import {WEBCONST} from '../../constants/webConstants';
import ImageController from '../../controllers/recipe/ImageController';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Favouritedishes = () => {
  const dispatch = useAppDispatch();
  const {data, isLoading} = useAppSelector(
    state => state.GetMyFavouritesMenuItems,
  );
  const establishments = useAppSelector(
    state => state.findNerbayEstablishment.data,
  );
  const [allEstablishments, setallEstablishments] = useState(establishments);

  function groupByEstablishmentId(items: IMenuItem[]): {
    [establishmentId: string]: IMenuItem[];
  } {
    const result: {[establishmentId: string]: IMenuItem[]} = {};

    items.forEach(item => {
      if (!result[item.establishmentId]) {
        result[item.establishmentId] = [];
      }
      result[item.establishmentId].push(item);
    });

    return result;
  }

  const [groupItems, setGorupItems] = useState<{
    [establishmentId: string]: IMenuItem[];
  }>();
  useEffect(() => {
    if (establishments) setallEstablishments(establishments);
  }, [establishments]);
  useEffect(() => {
    if (!data) {
      dispatch(getLikedMenuItems());
    }
    if (data) {
      const group = groupByEstablishmentId(data);
      setGorupItems(group);
    }
  }, [data]);
  const navigation = useNavigation<any>();

  const {width} = useWindowDimensions();
  return (
    <>
      {isLoading ? (
        <View style={{height: '100%', flex: 1}}>
          <Spinner type="Circle" color="#ea3651" />
        </View>
      ) : (
        <>
          {groupItems &&
            Object.keys(groupItems).map((key, index) => {
              const estab = establishments?.find(
                establishment => establishment._id === key,
              );
              const estabMenuItems = groupItems[key];
              return (
                <View key={index + 'Establishment'}>
                  <View>
                    <ImageController
                      user={estab?.owner}
                      onclick={() => {
                        navigation.navigate('favourites/establishment', {
                          establishment: estab,
                        });
                      }}
                    />
                  </View>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{height: 250}}
                    style={{width: width}}>
                    {data && allEstablishments && data?.length !== 0 ? (
                      estabMenuItems.map(menuItem => {
                        if (estab)
                          return (
                            <SingleMenuList
                              menuItem={menuItem}
                              key={menuItem._id}
                              establishmentId={menuItem.establishmentId}
                              establishment={estab}
                            />
                          );
                      })
                    ) : (
                      <Text style={[Textstyles.text, Textstyles.title]}>
                        Your favourite dishes will be there
                      </Text>
                    )}
                  </ScrollView>
                </View>
              );
            })}
        </>
      )}
    </>
  );
};

export default Favouritedishes;

const styles = StyleSheet.create({});
