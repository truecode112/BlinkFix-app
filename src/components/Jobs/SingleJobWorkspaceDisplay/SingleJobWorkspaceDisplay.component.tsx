import React from 'react';

import {Image, Text, useWindowDimensions, View} from 'react-native';
import {WEBCONST} from '../../../constants/webConstants';
import {Textstyles} from '../../../Pages/signedIn/menupages/contact';
import {IJobTitle} from '../../../redux/Profile/types';
import {ISingleJobWorkspaceDisplayProps} from './SingleJobWorkspaceDisplay.types';
import {SingleJobWorkspaceDisplayStyles} from './SingleJobWorkspaceDisplayStyle';

const SingleJobWorkspaceDisplay = (props: ISingleJobWorkspaceDisplayProps) => {
  const styles = SingleJobWorkspaceDisplayStyles;
  const {width} = useWindowDimensions();
  const {job} = props;

  const estabBGImage: string | null = `${WEBCONST().STORAGEURLNEW}/${
    // @ts-ignore
    job?.workPlace?.owner?.images?.backgroundImage
      ? // @ts-ignore
        job.workPlace.owner?.images.backgroundImage.path
      : null
  }`;
  const estabFrontImage: string | null = `${WEBCONST().STORAGEURLNEW}/${
    // @ts-ignore
    job?.workPlace?.owner?.images?.profileImage
      ? // @ts-ignore
        job.workPlace.owner?.images.profileImage.path
      : null
  }`;
  return (
    <View
      style={[
        {
          width: 0.8 * width,
          aspectRatio: 2,
          borderRadius: 10,
          overflow: 'hidden',
          marginHorizontal: 10,
        },
      ]}>
      {/* bannerImages */}
      <View>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff35',
            zIndex: 100,
            position: 'absolute',
          }}></View>
        {estabBGImage ? (
          <Image
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#00000015',
            }}
            source={{
              uri: estabBGImage,
            }}
          />
        ) : (
          <></>
        )}
        {estabFrontImage ? (
          <Image
            style={{
              width: '30%',
              aspectRatio: 1,
              backgroundColor: '#00000015',
              position: 'absolute',
              alignSelf: 'center',
              borderRadius: 100,
              top: 10,
              zIndex: 1000,
            }}
            source={{
              uri: estabFrontImage,
            }}
          />
        ) : (
          <></>
        )}
        <Text
          style={[
            Textstyles.text,
            Textstyles.title,
            {
              position: 'absolute',
              textTransform: 'capitalize',
              alignSelf: 'center',
              bottom: 0,
              fontSize: 30,
              margin: 0,
              padding: 0,
            },
          ]}>
          {job.workPlace.name}
        </Text>
      </View>
      <JobOptionIcon option={job.typeOfWork} />
    </View>
  );
};

export default SingleJobWorkspaceDisplay;

const JobOptionIcon = ({option}: {option: IJobTitle}) => {
  const chefIcon = require('../../../assets/utilityIcons/chefHat.png');
  const waiterIcon = require('../../../assets/utilityIcons/waiterIcon.png');
  const driverIcon = require('../../../assets/utilityIcons/driverIcon.png');

  const returnIcong = () => {
    switch (option) {
      case 'chef':
        return chefIcon;
      case 'waiter':
        return waiterIcon;
      case 'driver':
        return driverIcon;
      default:
        return chefIcon;
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        borderRadius: 50,
        borderWidth: 2,
        padding: 7,
        borderColor: '#FFFFFF',
        top: 10,
        right: 20,
      }}>
      <Image source={returnIcong()} style={{height: 35, width: 35}} />
    </View>
  );
};
