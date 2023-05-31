import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BalanceSection from './BalanceSection';
import UserDataSection from './UserDataSection';
import UserDataAdderssSection from './UserDataAddressSection';
import AllergiesSection from './AllergiesSection';
import DocumentSection from './DocumentSection';
import {IEstablishment, IGetProfileInfo} from '../../../../redux/Profile/types';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {GetEstablishment} from '../../../../redux/Order/order.thunk';
import {Counters} from '../../EstablishmentContent';
import {ICounter} from '../../../../redux/recipes/types';

const InfoSection = ({
  profileInfo,
  userInfo,
}: {
  profileInfo: IGetProfileInfo | null | undefined;
  userInfo: IGetProfileInfo | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const estabData = useAppSelector(state => state.establishment.data);
  const [establishment, setEstablishment] = useState<IEstablishment[] | null>(
    null,
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetEstablishment());
    }, []),
  );

  useEffect(() => {
    if (estabData && estabData.length > 0) {
      setEstablishment(estabData);
    }
  }, [estabData]);

  const [counter, setCounter] = useState<ICounter[]>();

  useEffect(() => {
    if (establishment?.length !== 0) {
      const countersMap = establishment?.map(
        singleEstablishment => singleEstablishment.counter,
      );
      setCounter(countersMap);
    }
  }, [establishment]);
  return (
    <>
      {counter?.length !== 0 &&
        counter?.map(singleCounter => {
          <Counters counter={singleCounter} key={singleCounter?._id} />;
        })}
      <BalanceSection />
      <UserDataSection info={profileInfo} />
      <UserDataAdderssSection
        info={profileInfo?.address[0]}
        id={userInfo ? userInfo._id : ''}
      />

      <AllergiesSection />
      {profileInfo?.userRole === 'Student' && (
        <DocumentSection document={profileInfo?.documentImages} />
      )}
    </>
  );
};

export default InfoSection;

const styles = StyleSheet.create({});
