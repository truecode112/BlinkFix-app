import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IGetProfileInfo} from '../../redux/Profile/types';
import {ImagePickerResponse} from 'react-native-image-picker';
import {WEBCONST} from '../../constants/webConstants';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addMyProfileImage} from '../../redux/Profile/core/profileAddImageProfile.thunk';

import {
  createFormData,
  handleChoosePhoto,
} from '../../utils/photos/handleFormdata';
import {getMyProfile} from '../../redux/Profile/core/profileCore.thunk';
import FastImage from 'react-native-fast-image';

const ImageController = ({
  user,
  onclick,
}: {
  user?: IGetProfileInfo | null;
  onclick?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(state => state.profile.data?.images);

  const [imagesState, setImagesState] = useState(images);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bacgroundImage, setBacgroundImage] = useState<ImagePickerResponse>();
  const [frontImage, setFrontImage] = useState<ImagePickerResponse>();

  useEffect(() => {
    setImagesState(images);
  }, [images]);
  useEffect(() => {
    if (frontImage?.assets) {
      const data = createFormData(frontImage.assets[0], 'profileImageProfile');
      dispatch(addMyProfileImage(data));
      setImagesState(images);
      dispatch(getMyProfile());
    }
  }, [frontImage]);
  useEffect(() => {
    if (bacgroundImage?.assets) {
      const data = createFormData(
        bacgroundImage.assets[0],
        'profileImageBackground',
      );
      dispatch(addMyProfileImage(data));
      setImagesState(images);
      dispatch(getMyProfile());
    }
  }, [bacgroundImage]);

  return (
    <TouchableOpacity
      onPress={() => (!onclick ? setModalVisible(!modalVisible) : onclick())}
      activeOpacity={0.9}
      style={{
        backgroundColor: '#464646',
        height: 150,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginVertical: 10,
        overflow: 'hidden',
      }}>
      {imagesState?.backgroundImage?.path && (
        <FastImage
          style={{
            width: '100%',
            height: undefined,
            borderRadius: 15,
            aspectRatio: 1.5,
            position: 'absolute',
          }}
          source={{
            uri: `${WEBCONST().STORAGEURLNEW}${
              imagesState?.backgroundImage?.path
            }?${new Date().getTime()}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      <View
        style={{
          zIndex: 1000,
        }}>
        <View
          style={{
            backgroundColor: '#EA3651',
            height: 90,
            aspectRatio: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            overflow: 'hidden',
          }}>
          {imagesState?.profileImage?.path && (
            <FastImage
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
              source={{
                uri: `${WEBCONST().STORAGEURLNEW}${
                  imagesState?.profileImage?.path
                }?${new Date().getTime()}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </View>
        <Text
          style={{
            textTransform: 'capitalize',
            color: '#fff',
            fontSize: 20,
            marginTop: 10,
            fontWeight: '700',
          }}>
          {user?.first_name} {user?.last_name}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Hi {user?.first_name} {user?.last_name}!
            </Text>
            <Pressable
              style={[styles.button, styles.actionButton]}
              onPress={() => handleChoosePhoto(setFrontImage, setModalVisible)}>
              <Text style={styles.textStyle}>Add Profile picture</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.actionButton]}
              onPress={() =>
                handleChoosePhoto(setBacgroundImage, setModalVisible)
              }>
              <Text style={styles.textStyle}>Add Background picture</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyleButtonClose}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImageController;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  actionButton: {
    backgroundColor: '#EA3651',
    marginBottom: 5,
  },
  buttonClose: {
    borderColor: '#EA3651',
    borderWidth: 1,
    marginBottom: 5,
  },
  textStyleButtonClose: {
    color: '#EA3651',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
