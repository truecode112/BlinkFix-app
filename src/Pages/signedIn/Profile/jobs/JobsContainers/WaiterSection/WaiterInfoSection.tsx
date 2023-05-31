import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useEffect} from 'react';
import LoggedInBackground from '../../../../../../components/background/loggedInBackground';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {WorkspaceInfoProps} from '../../../../../../navigation/Profile/ProfileNavigator.types';
import {Textstyles} from '../../../../menupages/contact';
import {RenderOrderList} from '../../../../../../components/Profile/Sections/Job/orders/OrdersSection';
import SimpleSection from '../../../../../../components/Profile/Sections/infoScetion/SimpleSection';
import ForwardedToYouSection from './ForwardedToYouSection';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {ForwardedToJobTypeThunk} from '../../../../../../redux/Profile/Jobs/ForwardedToJobType/ForwardedToJobType.thunk';
import Spinner from 'react-native-spinkit';

const WaiterInfoSection = () => {
  const {params} = useRoute<WorkspaceInfoProps['route']>();
  const {job} = params;
  const establishment = job.workPlace;
  const startOfWork = new Date(job.startOfWork ? job.startOfWork : '');
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const {data, isLoading} = useAppSelector(
    state => state.ForwardedOrderToJobType,
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        ForwardedToJobTypeThunk({jobId: job._id, jobType: job.typeOfWork}),
      );
    }, []),
  );

  return (
    <LoggedInBackground>
      <Text style={[Textstyles.text, {fontSize: 22, textAlign: 'center'}]}>
        You work in{' '}
        <Text style={{textTransform: 'capitalize', color: 'rgb(80,80,80)'}}>
          {establishment.name}
        </Text>{' '}
        as a <Text style={{color: 'rgb(80,80,80)'}}>{job.typeOfWork} </Text>
        since{' '}
        <Text style={{color: '#ea3651'}}>
          {startOfWork.toLocaleDateString()}
        </Text>
      </Text>
      {job.orders?.length === 0 && (
        <View
          style={{
            height: 200,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[Textstyles.title, Textstyles.text]}>
            Orders that you prepared will be there
          </Text>
        </View>
      )}
      {(!data || data.length === 0) &&
        (isLoading ? (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner color="#ea3651" type="Circle" />
          </View>
        ) : (
          <View
            style={{
              height: 400,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[Textstyles.title, Textstyles.text]}>
              Orders that are assigned to {job.typeOfWork} will be there
            </Text>
          </View>
        ))}
      {data && data.length !== 0 && (
        <ForwardedToYouSection
          jobId={job._id}
          jobType={job.typeOfWork}
          orders={data}
          establishmentId={establishment._id}
        />
      )}
      {job.orders && job.orders.length !== 0 && (
        <View>
          <SimpleSection title={'Your orders'}>
            {job.orders && (
              <RenderOrderList
                width={width}
                establishmentWithOrders={{
                  orders: job.orders,
                  establishment: establishment._id,
                }}
              />
            )}
          </SimpleSection>
        </View>
      )}
    </LoggedInBackground>
  );
};

export default WaiterInfoSection;

const styles = StyleSheet.create({});
