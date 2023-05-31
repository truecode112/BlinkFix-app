import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-spinkit';
import MenuSquareCartContainerOrder from '../../../../../../components/Order/menuContainer';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../../../../../navigation/Profile/ProfileNavigator.types';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {JobGetByIdThunk} from '../../../../../../redux/Jobs/JobGetById/JobGetById.thunk';
import {ForwardedToJobTypeThunk} from '../../../../../../redux/Profile/Jobs/ForwardedToJobType/ForwardedToJobType.thunk';

const ChefInitialPage = ({jobId}: {jobId: string}) => {
  const ordersLists = require('../../../../../../assets/orderLists.png');
  const infoImage = require('../../../../../../assets/profileIcons/info.png');
  const navigation = useNavigation<ProfileNavigation>();
  const dispatch = useAppDispatch();
  const {data, isLoading} = useAppSelector(state => state.JobGetById);
  const forwardedData = useAppSelector(
    state => state.ForwardedOrderToJobType.data,
  );

  useEffect(() => {
    dispatch(JobGetByIdThunk(jobId));
    dispatch(ForwardedToJobTypeThunk({jobId, jobType: 'chef'}));

    return () => {};
  }, [jobId]);

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
            displayName="Active Orders"
            onPress={() => {
              if (forwardedData)
                navigation.navigate('ChefsActiveOrders', {
                  activeOrders: forwardedData,
                  jobId: jobId,
                });
            }}
            image={ordersLists}
          />
        </>
      )}
    </View>
  );
};

export default ChefInitialPage;

const styles = StyleSheet.create({});
