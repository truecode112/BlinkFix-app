import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IGetDocumentImages} from '../../../../redux/Profile/types';
import {ImagePickerResponse} from 'react-native-image-picker';
import FlipCard from 'react-native-flip-card';
import FlipView from '../../../backgrounds/FlipView';
import {handleChoosePhoto} from '../../../../utils/photos/handleFormdata';
import {WEBCONST} from '../../../../constants/webConstants';

const RenderDocumentImage = ({
  images,
  isEditModeEnabled,
  isImageFlipped,
  setisImageFlipped,
  setPhotos,
  setIsEditModeEnabled,
  photos,
}: {
  isImageFlipped: boolean;
  isEditModeEnabled: boolean;
  images: IGetDocumentImages[] | undefined;
  setisImageFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  photos: ImagePickerResponse | null;
  setPhotos: React.Dispatch<React.SetStateAction<ImagePickerResponse | null>>;
  setIsEditModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [frontImage, setFrontImage] = useState<IGetDocumentImages>();
  const [backImage, setBackImage] = useState<IGetDocumentImages>();
  useEffect(() => {
    const frontImage = images?.find(image => image.isFrontImage);
    const backImage = images?.find(image => !image.isFrontImage);
    setFrontImage(frontImage);
    setBackImage(backImage);
  }, [images]);

  {
    return (
      <>
        <FlipCard flip={isImageFlipped} flipHorizontal>
          {frontImage ? (
            <TouchableOpacity
              onPress={() => {
                if (!isEditModeEnabled) setisImageFlipped(!isImageFlipped);
                else {
                  handleChoosePhoto(setPhotos, setIsEditModeEnabled);
                }
              }}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1.6,
                  borderRadius: 15,
                  resizeMode: 'contain',
                }}
                source={{
                  uri:
                    WEBCONST().STORAGEURLNEW +
                    frontImage?.path +
                    `?${new Date().getTime()}`,
                }}
              />
            </TouchableOpacity>
          ) : (
            <FlipView
              shouldFlip={false}
              onPress={async () => {
                if (!isEditModeEnabled) setisImageFlipped(!isImageFlipped);
                else {
                  handleChoosePhoto(setPhotos, setIsEditModeEnabled);
                }
              }}
              image={require('../../../../assets/utilityIcons/document.png')}
            />
          )}

          {backImage ? (
            <TouchableOpacity
              onPress={() => {
                if (!isEditModeEnabled) setisImageFlipped(!isImageFlipped);
                else {
                  handleChoosePhoto(setPhotos, setIsEditModeEnabled);
                }
              }}>
              <Image
                style={{
                  width: '100%',
                  aspectRatio: 1.6,
                  borderRadius: 15,
                  resizeMode: 'contain',
                }}
                source={{
                  uri:
                    WEBCONST().STORAGEURLNEW +
                    backImage?.path +
                    `?${new Date().getTime()}`,
                }}
              />
            </TouchableOpacity>
          ) : (
            <FlipView
              shouldFlip={false}
              onPress={async () => {
                if (!isEditModeEnabled) setisImageFlipped(!isImageFlipped);
                else {
                  handleChoosePhoto(setPhotos, setIsEditModeEnabled);
                }
              }}
              image={require('../../../../assets/utilityIcons/document.png')}
            />
          )}
        </FlipCard>
      </>
    );
  }
};

export default RenderDocumentImage;

const styles = StyleSheet.create({});
