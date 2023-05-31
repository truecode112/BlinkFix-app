import {
  Image,
  ImageErrorEventData,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from './SimpleSection';
import RenderDocumentImage from './renderDocumentImage';
import {IGetDocumentImages} from '../../../../redux/Profile/types';
import {useAppDispatch} from '../../../../redux/hooks';
import {ImagePickerResponse} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {getMyProfile} from '../../../../redux/Profile/core/profileCore.thunk';
import {createFormData} from '../../../../utils/photos/handleFormdata';
import {addMyProfileDocumentImage} from '../../../../redux/Profile/profileImageDocument.thunk';

const DocumentSection = ({
  document,
}: {
  document: IGetDocumentImages[] | undefined;
}) => {
  const [images, setImages] = useState<IGetDocumentImages[] | undefined>(
    document,
  );

  const dispatch = useAppDispatch();
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const [isImageFlipped, setisImageFlipped] = useState<boolean>(false);
  const [photo, setPhoto] = React.useState<ImagePickerResponse | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyProfile());
      setImages(document);
    }, []),
  );

  useEffect(() => {
    if (photo?.assets) {
      const data = createFormData(
        photo?.assets[0],
        isImageFlipped ? 'documentImageBack' : 'documentImageFront',
      );
      dispatch(addMyProfileDocumentImage(data));
      setPhoto(null);
      dispatch(getMyProfile());
    }
  }, [photo]);

  return (
    <>
      <SimpleSection
        isEditModeEnabled={isEditModeEnabled}
        title="Document Section"
        Button={() => (
          <TouchableOpacity
            onPress={() => {
              setIsEditModeEnabled(!isEditModeEnabled);
            }}>
            <Image
              style={{height: 20, aspectRatio: 1}}
              source={
                isEditModeEnabled
                  ? require('../../../../assets/utilityIcons/close.png')
                  : require('../../../../assets/utilityIcons/edit.png')
              }
            />
          </TouchableOpacity>
        )}>
        <RenderDocumentImage
          images={images}
          photos={photo}
          setPhotos={setPhoto}
          isEditModeEnabled={isEditModeEnabled}
          setisImageFlipped={setisImageFlipped}
          isImageFlipped={isImageFlipped}
          setIsEditModeEnabled={setIsEditModeEnabled}
        />
      </SimpleSection>
      {/* //TODO: after ssl should work */}
    </>
  );
};

export default DocumentSection;

const styles = StyleSheet.create({
  face: {
    flex: 1,
    backgroundColor: 'red',
  },
});
