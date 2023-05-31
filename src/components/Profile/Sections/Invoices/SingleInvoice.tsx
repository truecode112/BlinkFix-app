import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IInvoiceRecipe} from '../../../../redux/Profile/invoices/recipesInvoices.slice';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {WEBCONST} from '../../../../constants/webConstants';

const SingleInvoice = ({
  invoice,
  setLastClicked,
  lastClicked,
}: {
  lastClicked: string | null;
  setLastClicked: React.Dispatch<React.SetStateAction<string | null>>;
  invoice: IInvoiceRecipe;
}) => {
  const offset = useSharedValue(-150);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            lastClicked === invoice.recipe._id
              ? withTiming(offset.value, {duration: 100})
              : withTiming(0, {duration: 100}),
        },
      ],
    };
  });
  return (
    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          setLastClicked(invoice.recipe._id);
          if (lastClicked === invoice.recipe._id) {
            setLastClicked(null);
          }
        }}
        activeOpacity={1}>
        <Animated.View style={[styles.container, animatedStyles]}>
          <Image
            style={{
              width: 50,
              aspectRatio: 1,
              borderRadius: 50,
              resizeMode: 'cover',
              backgroundColor: '#ffffff45',
            }}
            source={
              invoice.recipe.image
                ? {uri: WEBCONST().STORAGEURLNEW + invoice.recipe.image.path}
                : require('../../../../assets/BX.png')
            }
          />
          <Text style={[styles.text, {flex: 4}]}>{invoice.recipe?.title}</Text>
          <Text style={[styles.text, {flex: 1}]}>{invoice.numberOfClicks}</Text>
          <Text style={[styles.text, {flex: 1}]}>
            {invoice.wage.toFixed(2)}
          </Text>
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        key={invoice.recipe._id + 'menu'}
        style={[
          {
            position: 'absolute',
            right: -150,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          },

          animatedStyles,
        ]}>
        <TouchableOpacity
          onPress={() => {
            setLastClicked(null);
            // TODO: move founds to account
            // dispatch(
            //   addFounds({
            //     amount: invoice.wage.toString(),
            //     type: 'recipes payout',
            //     description: `Recipe: ${invoice.recipe.title} ${invoice.recipe._id}`,
            //   }),
            // );
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: 'center',
                width: '100%',
                backgroundColor: '#00000015',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                fontSize: 10,
                overflow: 'hidden',
              },
            ]}>
            Move funds to account
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SingleInvoice;

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
