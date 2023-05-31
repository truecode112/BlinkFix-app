import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import RecipesLists from '../recipes/recipesLists';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import {useFocusEffect} from '@react-navigation/native';
import {LikedEstablishmentThunk} from '../../redux/counters/favourites/Order';
import EstablishmentsView from '../Order/EstablishmentsView';
import {ScrollView} from 'react-native-gesture-handler';
import SingleEstablishmentComponent from '../Order/SingleEstablishmentComponent';
import Spinner from 'react-native-spinkit';
import {IEstablishment} from '../../redux/Profile/types';

const FavouriteProviders = () => {
  const {data, isLoading} = useAppSelector(state => state.LikedEstablishments);
  const dispatch = useAppDispatch();
  const [loadingState, setLoadingState] = useState(true);
  const [layoutHeught, setLayoutHeught] = useState(0);
  const [splitedEstablishments, setSplitedEstablishments] = useState<{
    shop: IEstablishment[];
    foodtruck: IEstablishment[];
    restaurant: IEstablishment[];
    localCook: IEstablishment[];
  }>({shop: [], foodtruck: [], restaurant: [], localCook: []});
  const [keys, setKeys] = useState<string[]>();
  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setLoadingState(false);
      }, 1500);
    }
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      setSplitedEstablishments(splitData(data));
    }
  }, [data]);

  useEffect(() => {
    if (!keys) {
      const SplitedEstablishmentsKeys = Object.keys(splitedEstablishments);
      setKeys(SplitedEstablishmentsKeys);
      setSelectedKey(SplitedEstablishmentsKeys[0]);
    }
  }, [splitedEstablishments]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(LikedEstablishmentThunk());
    }, []),
  );

  const filteredData = (key: string) => {
    if (key === 'shop') return splitedEstablishments.shop;
    if (key === 'foodtruck') return splitedEstablishments.foodtruck;
    if (key === 'restaurant') return splitedEstablishments.restaurant;
    if (key === 'localCook') return splitedEstablishments.localCook;
  };
  const [selectedKey, setSelectedKey] = useState<string>('');

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        {keys?.map((key, index) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSelectedKey(key);
              }}
              key={index}
              style={{
                paddingVertical: 10,
                backgroundColor:
                  selectedKey === key
                    ? '#rgba(255,255,255,0.05)'
                    : '#rgba(255,255,255,0.01)',
                flex: 1,
                marginHorizontal: 5,
                borderRadius: 5,
                overflow: 'hidden',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  color: '#fff',
                  fontFamily: 'Handlee-Regular',
                }}>
                {key + 's'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {loadingState ? (
        <View
          onLayout={event => {
            var {x, y, width, height} = event.nativeEvent.layout;
            setLayoutHeught(height);
          }}
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner color="#EA3651" type="Circle" />
        </View>
      ) : (
        <ScrollView
          horizontal
          scrollEnabled={false}
          style={{
            flex: 1,
            marginVertical: 10,
          }}
          contentContainerStyle={{
            flex: 1,
          }}>
          <View style={{width: '100%', flex: 1}}>
            {data?.length !== 0 ? (
              <ScrollView
                style={{flex: 1, maxHeight: layoutHeught}}
                contentContainerStyle={{
                  paddingBottom: 40,
                }}>
                {filteredData(selectedKey)?.length !== 0 ? (
                  filteredData(selectedKey)?.map(establishment => {
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={establishment._id}
                        onPress={() => {}}>
                        <SingleEstablishmentComponent
                          establishment={establishment}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text
                    style={[
                      Textstyles.text,
                      Textstyles.title,
                      {textAlign: 'center'},
                    ]}>
                    Your favourite {selectedKey}'s will be there
                  </Text>
                )}
              </ScrollView>
            ) : (
              <Text style={[Textstyles.text, Textstyles.title]}>
                Your favourite restaurants will be there
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default FavouriteProviders;

const styles = StyleSheet.create({});

const splitData = (data: IEstablishment[]) => {
  const initialSplitedEstablishments = {
    shop: [],
    foodtruck: [],
    restaurant: [],
    localCook: [],
  };

  return data.reduce((acc, establishment) => {
    const type = establishment.type;
    if (type in acc) {
      // @ts-ignore
      acc[type].push(establishment);
    }
    return acc;
  }, initialSplitedEstablishments);
};
