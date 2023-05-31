import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InvoicesList from './InvoicesList';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import recipesInvoicesSlice, {
  IInvoiceRecipe,
} from '../../../../redux/Profile/invoices/recipesInvoices.slice';
import {getInvoicesRecipesThunk} from '../../../../redux/Profile/invoices/recipeInvoices.thunk';
import {WEBCONST} from '../../../../constants/webConstants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {addFounds} from '../../../../redux/Profile/wallet/wallet.thunks';
import SingleInvoice from './SingleInvoice';

type Props = {
  selected: number;
};

const Recipes = (props: Props) => {
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const {data, isLoading} = useAppSelector(state => state.recipesInvoices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!data) {
      dispatch(getInvoicesRecipesThunk());
    }
  }, [data]);
  return (
    <View>
      <View style={styles.container}>
        <Text style={[styles.text, {flex: 4}]}>Recipe Name</Text>
        <Text style={[styles.text, {flex: 1}]}>Number of clicks</Text>
        <Text style={[styles.text, {flex: 1}]}>Salary</Text>
      </View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        data?.map((invoice, index) => {
          return invoice ? (
            <SingleInvoice
              key={index}
              invoice={invoice}
              lastClicked={lastClicked}
              setLastClicked={setLastClicked}
            />
          ) : (
            <Text key={index}>cju</Text>
          );
        })
      )}
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    paddingVertical: 5,
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Handlee-Regular',
  },
});
