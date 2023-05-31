import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import {IMenuItem} from '../../../../../redux/Profile/establishmentMenus/types';
import {WEBCONST} from '../../../../../constants/webConstants';
import DropShadow from 'react-native-drop-shadow';
import {Textstyles} from '../../../../../Pages/signedIn/menupages/contact';

const SingleMenuItem = ({menuItem}: {menuItem: IMenuItem}) => {
  const {width} = useWindowDimensions();
  const counter = menuItem?.counter;
  const ingredientsSet = menuItem?.dishIngredients?.map(
    ingredientMap => ingredientMap.name,
  );

  const joinedIngredient = ingredientsSet?.join(' • ');
  return (
    <View
      key={menuItem._id}
      style={{
        width: width / 1.5,
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 6,
            height: 6,
          },
          shadowOpacity: 0.29,
          shadowRadius: 2.65,
          elevation: 7,

          width: '100%',
          aspectRatio: 2,
          backgroundColor: 'rgba(80,80,80,0.2)',
          borderRadius: 15,
          marginBottom: 10,
        }}>
        {menuItem.image && (
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 15,
            }}
            source={{
              uri: `${WEBCONST().STORAGEURLNEW}${menuItem.image.path}`,
            }}
          />
        )}
        {counter && (
          <View
            style={{
              width: '30%',
              marginLeft: 10,
              marginTop: 10,
              position: 'absolute',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                flexDirection: 'row',
                borderRadius: 15,
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../../../../../assets/utilityIcons/click.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Handlee-Regular',
                  fontSize: 12,
                }}>
                {counter?.numberOfClicks}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                flexDirection: 'row',
                borderRadius: 15,
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../../../../../assets/utilityIcons/heart.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Handlee-Regular',
                  fontSize: 12,
                }}>
                {counter?.numberOfLikes}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                flexDirection: 'row',
                borderRadius: 15,
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../../../../../assets/utilityIcons/share.png')}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Handlee-Regular',
                  fontSize: 12,
                }}>
                {counter?.numberOfShares}
              </Text>
            </View>
          </View>
        )}
        {menuItem.allergens.length !== 0 && (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              borderRadius: 20,
              backgroundColor: '#ffffff20',
              paddingVertical: 2,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 25, width: 25, marginRight: 10}}
              source={require('../../../../../assets/utilityIcons/allergen.png')}
            />
            <Text style={[Textstyles.text, {fontSize: 12}]}>
              Allergens present
            </Text>
          </View>
        )}
      </View>
      <Text
        style={{
          fontFamily: 'Damion',
          textTransform: 'capitalize',
          fontSize: 16,
          color: '#fff',
        }}>
        {menuItem.dishName}
      </Text>
      <Text
        style={{
          fontFamily: 'Damion',
          textTransform: 'capitalize',
          fontSize: 14,
          color: '#fff',
          fontWeight: 'bold',
          flexWrap: 'wrap',
        }}>
        • {joinedIngredient} •
      </Text>
      <Text
        style={{
          fontFamily: 'Handlee-Regular',
          textTransform: 'capitalize',
          fontSize: 14,
          color: '#fff',
        }}>
        {menuItem.dishDescription}
      </Text>
      <Text
        style={{
          fontFamily: 'Handlee-Regular',
          textTransform: 'capitalize',
          fontSize: 14,
          color: '#fff',
        }}>
        {menuItem.currency} {menuItem.price}
      </Text>
    </View>
  );
};

export default SingleMenuItem;

const styles = StyleSheet.create({});
