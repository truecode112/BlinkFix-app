import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from '../../infoScetion/SimpleSection';
import {
  IEstablishment,
  IWokringHours,
} from '../../../../../redux/Profile/types';
import TextInputProfile, {
  TextInputProfileArray,
} from '../../../../TextInputs/TextInputCuisine';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {EditEstablishmentWorkingHours} from '../../../../../redux/Order/Establishment.workinghours.thunk';
import SingleDay from './singleDay';

const OpenHoursSection = () => {
  const establishmentFromProps = useAppSelector(
    state => state.establishment.data,
  );
  const [openHoursState, setOpenHoursState] = useState<IWokringHours[] | null>(
    null,
  );
  const [establishment, setestablishment] = useState<IEstablishment | null>(
    null,
  );

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (establishmentFromProps && establishmentFromProps?.length !== 0)
      setestablishment(establishmentFromProps[0]);
  }, [establishmentFromProps]);
  useEffect(() => {
    if (establishment && establishment.openHours)
      setOpenHoursState(establishment.openHours);
  }, [establishment]);

  return (
    <SimpleSection
      Button={() =>
        isEditModeEnabled ? (
          <TouchableOpacity
            onPress={() => {
              setIsEditModeEnabled(!isEditModeEnabled);
              if (openHoursState)
                dispatch(
                  EditEstablishmentWorkingHours({
                    hours: openHoursState,
                    establishmentId: establishment?._id,
                  }),
                );
            }}>
            <Image
              style={{transform: [{rotate: '45deg'}], width: 20, height: 20}}
              source={require('../../../../../assets/utilityIcons/add.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsEditModeEnabled(!isEditModeEnabled);
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../../../assets/utilityIcons/edit.png')}
            />
          </TouchableOpacity>
        )
      }
      title={'Working Hours'}
      isEditModeEnabled={isEditModeEnabled}>
      <SingleDay
        isEditModeEnabled={isEditModeEnabled}
        setIsEditModeEnabled={setIsEditModeEnabled}
        setState={setOpenHoursState}
        state={openHoursState}
        day={openHoursState?.find(day => day.day === 'monday')}
      />
      <SingleDay
        isEditModeEnabled={isEditModeEnabled}
        setIsEditModeEnabled={setIsEditModeEnabled}
        setState={setOpenHoursState}
        state={openHoursState}
        day={openHoursState?.find(day => day.day === 'tuesday')}
      />
      <SingleDay
        isEditModeEnabled={isEditModeEnabled}
        setIsEditModeEnabled={setIsEditModeEnabled}
        setState={setOpenHoursState}
        state={openHoursState}
        day={openHoursState?.find(day => day.day === 'wednesday')}
      />
      <SingleDay
        isEditModeEnabled={isEditModeEnabled}
        setIsEditModeEnabled={setIsEditModeEnabled}
        setState={setOpenHoursState}
        state={openHoursState}
        day={openHoursState?.find(day => day.day === 'thursday')}
      />
      <SingleDay
        isEditModeEnabled={isEditModeEnabled}
        setIsEditModeEnabled={setIsEditModeEnabled}
        setState={setOpenHoursState}
        state={openHoursState}
        day={openHoursState?.find(day => day.day === 'friday')}
      />
      <SingleDay
        isEditModeEnabled={isEditModeEnabled}
        setIsEditModeEnabled={setIsEditModeEnabled}
        setState={setOpenHoursState}
        state={openHoursState}
        day={openHoursState?.find(day => day.day === 'saturday')}
      />
      <SingleDay
        isEditModeEnabled={isEditModeEnabled}
        setIsEditModeEnabled={setIsEditModeEnabled}
        setState={setOpenHoursState}
        state={openHoursState}
        day={openHoursState?.find(day => day.day === 'sunday')}
      />
    </SimpleSection>
  );
};

export default OpenHoursSection;

const styles = StyleSheet.create({});
