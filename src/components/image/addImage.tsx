import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {IIMageRecipe} from '../../redux/recipes/types';
import {WEBCONST} from '../../constants/webConstants';

const AddImage = ({
  image,
  setImage,
  imageFromRecipe,
}: {
  image: ImagePickerResponse | null | undefined;
  setImage:
    | React.Dispatch<React.SetStateAction<ImagePickerResponse | null>>
    | React.Dispatch<
        React.SetStateAction<ImagePickerResponse | null | undefined>
      >;
  imageFromRecipe?: IIMageRecipe;
}) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1,
          presentationStyle: 'currentContext',
        });
        setImage(result);
      }}
      style={{
        width: '50%',
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: 35,
        padding: 20,
      }}>
      {imageFromRecipe && !image && (
        <Image
          style={{flex: 1, width: '100%', borderRadius: 25}}
          source={{
            uri: `${WEBCONST().STORAGEURLNEW}${
              imageFromRecipe.path
            }?${new Date().getTime()}`,
          }}
        />
      )}
      {image && image.assets && (
        <Image
          style={{flex: 1, width: '100%', borderRadius: 25}}
          source={{uri: image?.assets[0].uri}}
        />
      )}
      {!image && !imageFromRecipe && (
        <Image
          style={{flex: 1, width: '100%', borderRadius: 50}}
          source={require('../../assets/utilityIcons/addImage.png')}
        />
      )}
    </TouchableOpacity>
  );
};

export default AddImage;

const styles = StyleSheet.create({});
