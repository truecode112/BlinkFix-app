import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LoggedInBackground from '../../../../../../components/background/loggedInBackground';
import MenuSquareCartContainerOrder from '../../../../../../components/Order/menuContainer';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ProfileNavigation,
  WorkspaceProps,
  WorkspaceWaiterMenuProps,
} from '../../../../../../navigation/Profile/ProfileNavigator.types';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {JobGetByIdThunk} from '../../../../../../redux/Jobs/JobGetById/JobGetById.thunk';
import Spinner from 'react-native-spinkit';

const WaiterInitialPage = ({jobId}: {jobId: string}) => {
  const orderImage = require('../../../../../../static/icons/Order.png');
  const infoImage = require('../../../../../../assets/profileIcons/info.png');
  const navigation = useNavigation<ProfileNavigation>();
  const dispatch = useAppDispatch();
  const {data, isLoading} = useAppSelector(state => state.JobGetById);
  useEffect(() => {
    dispatch(JobGetByIdThunk(jobId));

    return () => {};
  }, [jobId]);
  const establishment = data?.workPlace;
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner type="Circle" color="#ea3651" />
        </View>
      ) : (
        <>
          <MenuSquareCartContainerOrder
            displayName="Info"
            image={infoImage}
            onPress={() => {
              if (data)
                navigation.navigate('WorkspaceInfo', {
                  job: data,
                });
            }}
          />
          <MenuSquareCartContainerOrder
            displayName="Order Menu"
            onPress={() => {
              if (establishment)
                navigation.navigate('WorkspaceWaiterMenu', {establishment});
            }}
            image={orderImage}
          />
        </>
      )}
    </View>
  );
};

export default WaiterInitialPage;

const styles = StyleSheet.create({});
