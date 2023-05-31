import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback} from 'react';
import {IRecipe} from '../../redux/recipes/types';
import {convertAdvancement} from './advancement';
import SmallIconBG from '../background/smallIconBG';
import DishesType from './dishesType';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {deleteRecipe} from '../../redux/recipes/recipesThunks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RecipesToProfilePageNavigation} from '../../navigation/types';
import {WEBCONST} from '../../constants/webConstants';
import {ProfileNavigation} from '../../navigation/Profile/ProfileNavigator.types';
import {LikeRecipeThunk} from '../../redux/counters/favourites/Recipes/Favourites.thunk';
import {getMyProfile} from '../../redux/Profile/core/profileCore.thunk';

const SingleRecipe = ({
  Recipe,
  isEditModeEnabled,
  from,
}: {
  Recipe: IRecipe;
  isEditModeEnabled?: boolean;
  from?: 'Profile' | 'Recipe' | 'favorites';
}) => {
  const heartIconNotFilled = require('../../assets/utilityIcons/heart.png');
  const heartIconFilled = require('../../assets/utilityIcons/liked.png');
  const shareIconFilled = require('../../assets/utilityIcons/share.png');
  const navigation = useNavigation<RecipesToProfilePageNavigation>();
  const navigationProfile = useNavigation<ProfileNavigation>();

  const dispatch = useAppDispatch();

  const handleLike = (recipeId: string) => {
    dispatch(LikeRecipeThunk(recipeId));
  };

  const handleShare = (recipeId: string) => {
    Alert.alert('Shared: ' + recipeId);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getMyProfile());
    }, []),
  );

  const userId = useAppSelector(state => state.profile.data?._id);
  const likeArray = Recipe?.counter?.whoLike;
  const isRecipeLiked = likeArray?.includes(userId ? userId : '');

  return (
    <View style={styles.container}>
      {!isEditModeEnabled && (
        <View style={{position: 'absolute', right: 10, top: 5, zIndex: 10000}}>
          <>
            <TouchableOpacity
              onPress={() => {
                handleLike(Recipe._id);
              }}
              style={{
                padding: 5,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#fff',
                marginVertical: 2,
                backgroundColor: 'rgba(225,225,225,.25)',
              }}>
              <Image
                source={isRecipeLiked ? heartIconFilled : heartIconNotFilled}
                style={{width: 15, height: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleShare(Recipe._id);
              }}
              style={{
                backgroundColor: '#ffffff40',
                padding: 5,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#fff',
                marginVertical: 2,
              }}>
              <Image source={shareIconFilled} style={{width: 15, height: 15}} />
            </TouchableOpacity>
          </>
        </View>
      )}
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        {isEditModeEnabled && (
          <View
            style={{alignSelf: 'flex-end', right: 10, top: 10, zIndex: 100}}>
            <TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteRecipe(Recipe._id));
                }}>
                <Image
                  source={require('../../assets/utilityIcons/deleteC.png')}
                  style={{width: 30, height: 30, marginBottom: 5}}
                />
              </TouchableOpacity>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    if (from === 'Profile') {
                      navigationProfile.navigate('EditRecipeFromProfile', {
                        recipeGet: Recipe,
                      });
                    } else if (from === 'favorites') {
                      Alert.alert('Favorites dupa');
                    } else {
                      navigation.navigate('Recipes Home', {
                        screen: 'Edit Recipe',
                        params: {
                          recipeGet: Recipe,
                        },
                      });
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}>
                <Image
                  source={require('../../assets/utilityIcons/editC.png')}
                  style={{width: 30, height: 30, marginBottom: 5}}
                />
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      <View style={styles.image}>
        {Recipe?.image && (
          <Image
            style={{height: '100%', width: '100%', position: 'absolute'}}
            source={{
              uri: `${WEBCONST().STORAGEURLNEW}${
                Recipe.image.path
              }?${new Date().getTime()}`,
            }}
          />
        )}
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            maxWidth: '30%',
            maxHeight: '100%',
            height: '100%',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 2,
              backgroundColor: 'rgba(0,0,0,0.6)',
              flexDirection: 'row',
              borderRadius: 5,
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/utilityIcons/heart.png')}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Handlee-Regular',
                fontSize: 15,
              }}>
              {Recipe?.counter?.numberOfLikes}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 2,
              backgroundColor: 'rgba(0,0,0,0.6)',
              flexDirection: 'row',
              borderRadius: 5,
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/utilityIcons/share.png')}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Handlee-Regular',
                fontSize: 15,
              }}>
              {Recipe?.counter?.numberOfShares}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 2,
              backgroundColor: 'rgba(0,0,0,0.6)',
              flexDirection: 'row',
              borderRadius: 5,
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/utilityIcons/click.png')}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Handlee-Regular',
                fontSize: 15,
              }}>
              {Recipe?.counter?.numberOfClicks}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>{Recipe?.title}</Text>
      <View style={styles.smallIconContainer}>
        <SmallIconBG>{convertAdvancement(Recipe?.advancement)}</SmallIconBG>
        <SmallIconBG>
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/serves.png')}
          />
          <Text style={styles.titleIcon}>{Recipe?.serves}</Text>
        </SmallIconBG>
        <SmallIconBG>
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/clock.png')}
          />
          <Text style={styles.titleIcon}>
            {Recipe?.prepTime} / {Recipe?.cookTime}
          </Text>
        </SmallIconBG>
        <SmallIconBG>
          <DishesType dishType={Recipe?.dishesType} />
        </SmallIconBG>
      </View>
      <View style={styles.smallIconContainer}>
        {Recipe?.isVegan && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/Untitled/vegan.png')}
            />
            <Text style={styles.titleIcon}>Vegan</Text>
          </SmallIconBG>
        )}
        {Recipe?.isHalal && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/Untitled/halal.png')}
            />
            <Text style={styles.titleIcon}>Halal</Text>
          </SmallIconBG>
        )}
        {Recipe?.isKosher && (
          <SmallIconBG>
            <Image
              style={styles.imageIcon}
              source={require('../../static/icons/Untitled/kosher.png')}
            />
            <Text style={styles.titleIcon}>Kosher</Text>
          </SmallIconBG>
        )}
      </View>
      <MaskedView
        style={{flex: 1, flexDirection: 'row', height: '100%', margin: 7}}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
              }}>
              {Recipe?.description}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
              }}>
              {Recipe?.cuisine?.name}
            </Text>
          </View>
        }>
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(255,255,266,0)']}
          style={{
            flex: 1,
            height: '100%',
          }}
        />
      </MaskedView>
    </View>
  );
};

export default SingleRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    backgroundColor: 'grey',
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: 20,
    height: '30%',
    position: 'relative',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  ContainerSmall: {
    width: 50,

    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    height: '60%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  titleIcon: {fontSize: 8, width: '100%', textAlign: 'center', color: '#fff'},
  smallIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 3,
  },
  descriptionContainer: {
    flex: 1,
    margin: 5,
    textAlign: 'center',
  },
});
