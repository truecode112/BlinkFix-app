import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OnOfButton from './OnOfButton';
import Purchases from './Purchases';
import Sales from './Sales';
import Recipes from './Recipes';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {getInvoicesRecipesThunk} from '../../../../redux/Profile/invoices/recipeInvoices.thunk';
import {useFocusEffect} from '@react-navigation/native';
import {GetMyPurchases} from '../../../../redux/Order/Purchases/getMyPurchases.thunk';
import recipesInvoicesSlice from '../../../../redux/Profile/invoices/recipesInvoices.slice';
import Spinner from 'react-native-spinkit';

type Props = {isEstablishment: boolean};

const InvoicesSection = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const succesRecipes = useAppSelector(state => state.recipesInvoices.succes);
  const succesPurchases = useAppSelector(state => state.Purchases.succes);

  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetMyPurchases());
    dispatch(getInvoicesRecipesThunk());
  }, [selectedOption]);

  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      style={{flex: 1, width: width - 20}}
      contentContainerStyle={{width: width - 20}}>
      <View style={{flex: 1, marginTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {props.isEstablishment ? (
            <>
              <OnOfButton
                id={0}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Purchases'}
              />
              <OnOfButton
                id={1}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Sales'}
              />
              <OnOfButton
                id={2}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Recipes'}
              />
            </>
          ) : (
            <>
              <OnOfButton
                id={0}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Purchases'}
              />

              <OnOfButton
                id={2}
                selected={selectedOption}
                setSelected={setSelectedOption}
                text={'Recipes'}
              />
            </>
          )}
        </View>
        <RenderSection
          selectedOption={selectedOption}
          succesRecipes={succesRecipes}
          succesPurchases={succesPurchases}
        />
      </View>
    </ScrollView>
  );
};

export default InvoicesSection;

const styles = StyleSheet.create({
  onOfButton: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
  },
});

const RenderSection = ({
  selectedOption,
  succesPurchases,
  succesRecipes,
}: {
  selectedOption: number;
  succesPurchases: boolean;
  succesRecipes: boolean;
}) => {
  switch (selectedOption) {
    case 0:
      if (succesPurchases) return <Purchases selected={selectedOption} />;
    // case 1:
    //   return <Sales />;
    case 2:
      if (succesRecipes) return <Recipes selected={selectedOption} />;

    default:
      return (
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner type="Circle" color="#ea3651" />
        </View>
      );
  }
};
