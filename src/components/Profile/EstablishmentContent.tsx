import {Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IGetProfileInfo} from '../../redux/Profile/types';
import ImageController from '../../controllers/recipe/ImageController';

import ProfileMenu from './ProfileMenu';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import InfoSection from './Sections/infoScetion/InfoSection';
import RecipesSection from './Sections/recipesSection/RecipesSection';
import MainComponents from './Sections/Job/MainComponents';
import {useFocusEffect} from '@react-navigation/native';
import {getMyProfile} from '../../redux/Profile/core/profileCore.thunk';
import SimpleSection from './Sections/infoScetion/SimpleSection';
import {ICounter} from '../../redux/recipes/types';
import InvoicesSection from './Sections/Invoices';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EstablishmentContent = ({
  profileInfo,
}: {
  profileInfo: IGetProfileInfo | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [userInfo, setUserInfo] = useState<IGetProfileInfo | undefined | null>(
    profileInfo,
  );
  const user = useAppSelector(state => state.profile.data);
  useEffect(() => {
    setUserInfo(user);
  }, [profileInfo]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyProfile());
    }, []),
  );

  const renderSeciton = (selected: 0 | 1 | 2 | 3 | 4) => {
    switch (selected) {
      case 0:
        return <InfoSection profileInfo={profileInfo} userInfo={userInfo} />;

      case 1:
        return <RecipesSection />;
      case 2:
        return (
          <InvoicesSection
            isEstablishment={
              userInfo?.userRole !== 'End User' &&
              userInfo?.userRole !== 'Student'
            }
          />
        );
      case 3:
        // workspace
        return (
          <>
            <MainComponents />
          </>
        );

      default:
        <></>;
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View style={{width: '100%', flex: 1}}>
        <ImageController user={profileInfo} />
        <ProfileMenu selected={selected} setSelected={setSelected} />

        <View style={{flex: 1}}>{renderSeciton(selected)}</View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EstablishmentContent;
export const Counters = ({counter}: {counter: ICounter}) => {
  return (
    <SimpleSection title={'Counters of your establishment'}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 2,
            backgroundColor: 'rgba(255,255,255,0.2)',
            flexDirection: 'row',
            flex: 1,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/utilityIcons/heart.png')}
          />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Handlee-Regular',
              fontSize: 15,
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
            flex: 1,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/utilityIcons/share.png')}
          />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Handlee-Regular',
              fontSize: 15,
            }}>
            {counter?.numberOfShares}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 2,
            backgroundColor: 'rgba(255,255,255,0.2)',
            flexDirection: 'row',
            flex: 1,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/utilityIcons/click.png')}
          />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Handlee-Regular',
              fontSize: 15,
            }}>
            {counter?.numberOfClicks}
          </Text>
        </View>
      </View>
    </SimpleSection>
  );
};
