import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import StandardJobDisplaySection from '../../../Jobs/StandardJobDisplaySection';
import {IJobsGet} from '../../../../redux/Profile/types';
import TipDisplaySection from '../../../Jobs/TipDisplaySection';
import WorkspaceSection from '../../../Jobs/WorkspaceSection';
import {getMyProfile} from '../../../../redux/Profile/core/profileCore.thunk';
import OnOfButton from './OnOfButton';
import EstablishmentJobSection from './EmployeesJobSection';
import Spinner from 'react-native-spinkit';
import {GetEstablishment} from '../../../../redux/Order/order.thunk';
import UserDataAdderssSection from '../infoScetion/UserDataAddressSection';

const MainComponents = () => {
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const {data, isLoading} = useAppSelector(state => state.profile);
  const establishmentData = useAppSelector(state => state.establishment.data);

  const [jobs, setJobs] = useState<IJobsGet[]>(data?.jobs ? data.jobs : []);
  const [userRole, _] = useState(data?.userRole);
  const [jobMenuStandardSelected, setJobMenuStandardSelected] =
    useState<boolean>(true);

  useEffect(() => {
    if (!data && isLoading !== true) dispatch(getMyProfile());
    if (data?.jobs) setJobs(data.jobs);
  }, [data, isLoading]);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingState(true);
      dispatch(getMyProfile());
      dispatch(GetEstablishment());
    } else setIsLoadingState(false);
  }, [isLoading]);

  useEffect(() => {
    if (!jobMenuStandardSelected) {
      dispatch(GetEstablishment());
      dispatch(getMyProfile());
    }
  }, [jobMenuStandardSelected]);

  return (
    <View style={{flex: 1}}>
      {(userRole === 'Food trucks' ||
        userRole === 'Restaurant' ||
        userRole === 'Shop' ||
        userRole === 'Local Cook' ||
        userRole === 'Student') && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingVertical: 10,
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <OnOfButton
            title="standard"
            selected={jobMenuStandardSelected === true}
            setSelected={() => {
              setJobMenuStandardSelected(true);
            }}
          />
          <OnOfButton
            title={userRole}
            selected={jobMenuStandardSelected === false}
            setSelected={() => {
              setJobMenuStandardSelected(false);
            }}
          />
        </View>
      )}

      {isLoadingState ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner type="Circle" color="#ea768" />
        </View>
      ) : jobMenuStandardSelected ? (
        <>
          <StandardJobDisplaySection jobs={jobs} />
          {jobs.length > 0 && <WorkspaceSection jobs={jobs} />}
          <TipDisplaySection balance={123.32} currency="pln" />
        </>
      ) : (
        <>
          <EstablishmentJobSection />
        </>
      )}
    </View>
  );
};

export default MainComponents;

const styles = StyleSheet.create({});
