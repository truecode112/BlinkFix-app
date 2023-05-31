import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IGetProfileInfo} from '../../redux/Profile/types';
import ImageController from '../../controllers/recipe/ImageController';

import ProfileMenu from './ProfileMenu';
import {useAppSelector} from '../../redux/hooks';
import InfoSection from './Sections/infoScetion/InfoSection';
import RecipesSection from './Sections/recipesSection/RecipesSection';
import MainComponents from './Sections/Job/MainComponents';

const ProfileContentStudent = ({
  profileInfo,
}: {
  profileInfo: IGetProfileInfo | null | undefined;
}) => {
  const [selected, setSelected] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [userInfo, setUserInfo] = useState<IGetProfileInfo | undefined | null>(
    profileInfo,
  );
  const user = useAppSelector(state => state.profile.data);
  useEffect(() => {
    setUserInfo(user);
  }, [profileInfo]);

  const renderSeciton = (selected: 0 | 1 | 2 | 3 | 4) => {
    switch (selected) {
      case 0:
        return <InfoSection profileInfo={profileInfo} userInfo={userInfo} />;

      case 1:
        return <RecipesSection />;
      case 3:
        return <MainComponents />;

      default:
        <></>;
    }
  };
  return (
    <View style={{width: '100%', flex: 1}}>
      <ImageController user={profileInfo} />

      <ProfileMenu selected={selected} setSelected={setSelected} />
      {renderSeciton(selected)}
      <View style={{height: 40}}></View>
    </View>
  );
};

export default ProfileContentStudent;
