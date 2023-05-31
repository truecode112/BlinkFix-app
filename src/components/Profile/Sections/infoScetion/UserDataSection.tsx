import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from './SimpleSection';
import {IGetProfileInfo} from '../../../../redux/Profile/types';
import {useAppDispatch} from '../../../../redux/hooks';
import {editMyProfile} from '../../../../redux/Profile/core/profileEditUserData.thunk';
import TextInputProfile from '../../../TextInputs/TextInputCuisine';

const UserDataSection = ({
  info,
}: {
  info: IGetProfileInfo | null | undefined;
}) => {
  const [updateUserState, setUpdateUserState] = useState<
    IGetProfileInfo | undefined | null
  >(info);
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {}, [isEditModeEnabled]);
  return (
    <View>
      <SimpleSection
        isEditModeEnabled={isEditModeEnabled}
        title="Your data"
        Button={() => (
          <TouchableOpacity
            onPress={() => {
              if (isEditModeEnabled) {
                dispatch(editMyProfile(updateUserState));
              }
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
        <View style={{width: '100%', flex: 1}}>
          <TextInputProfile
            disabled={!isEditModeEnabled}
            name="first_name"
            onChange={setUpdateUserState}
            placeholder="First name"
            value={updateUserState?.first_name}
            state={updateUserState}
          />
          <TextInputProfile
            disabled={!isEditModeEnabled}
            name="last_name"
            onChange={setUpdateUserState}
            placeholder="Last name"
            value={updateUserState?.last_name}
            state={updateUserState}
          />
          <TextInputProfile
            disabled={!isEditModeEnabled}
            name="name"
            onChange={setUpdateUserState}
            placeholder="Your in app name"
            value={updateUserState?.name}
            state={updateUserState}
          />
          <TextInputProfile
            disabled={!isEditModeEnabled}
            name="email"
            onChange={setUpdateUserState}
            placeholder="Email Address"
            value={updateUserState?.email}
            state={updateUserState}
          />
          <TextInputProfile
            disabled={!isEditModeEnabled}
            name="phone_number"
            onChange={setUpdateUserState}
            placeholder="First name"
            value={updateUserState?.phone_number}
            state={updateUserState}
          />
          <TextInputProfile
            disabled={!isEditModeEnabled}
            name="first_name"
            onChange={setUpdateUserState}
            placeholder="First name"
            value={updateUserState?.birth_year}
            state={updateUserState}
          />
        </View>
      </SimpleSection>
    </View>
  );
};

export default UserDataSection;

const styles = StyleSheet.create({});
