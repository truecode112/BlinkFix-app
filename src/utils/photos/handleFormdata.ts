import {Platform} from 'react-native';
import {
  Asset,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

export const createFormData = (photo: Asset, name: string) => {
  const data = new FormData();

  data.append(name, {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri?.replace('file://', '') : photo.uri,
  });

  return data;
};

export const handleChoosePhoto = (
  setPhoto: (ImagePickerResponse: ImagePickerResponse) => void,
  setIsEditModeEnabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
    if (response) {
      setPhoto(response);
    }
    setIsEditModeEnabled(false);
  });
};
