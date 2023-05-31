import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const DishesType = ({dishType}: {dishType: string}) => {
  const LoadImage = () => {
    switch (dishType) {
      case 'Soups':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/soup.png')}
          />
        );
      case 'Salads':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/salad.png')}
          />
        );
      case 'Bakeries':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/bakery.png')}
          />
        );
      case 'Dairy':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/dairy.png')}
          />
        );
      case 'Mains':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/breakfast.png')}
          />
        );
      case 'Sides':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/french.png')}
          />
        );
      case 'Beverages':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/soft-drink.png')}
          />
        );
      case 'Pickles':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/pickles.png')}
          />
        );
      case 'Snacks':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/snacks.png')}
          />
        );
      case 'Occasion':
        return (
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/dishesType/occasion.png')}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {dishType && LoadImage()}
      <Text style={styles.titleIcon}>{dishType}</Text>
    </>
  );
};

export default DishesType;

const styles = StyleSheet.create({
  imageIcon: {
    height: '50%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  ContainerSmall: {
    width: 50,

    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  titleIcon: {fontSize: 8, width: '100%', textAlign: 'center', color: '#fff'},
});
