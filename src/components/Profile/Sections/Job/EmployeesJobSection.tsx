import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {IEstablishment} from '../../../../redux/Profile/types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OpenHoursSection from './OpenHours/section';
import TablesSection from './TablesSection/section';
import EmployeesToAccept from './WorkSpaceSection/section';
import EmployeeList from './WorkSpaceSection/EmployeeList';
import MenuListUpdateAndGet from './MenuListUpdateAndGet/section';
import {Textstyles} from '../../../../Pages/signedIn/menupages/contact';
import PositionLatLong from '../infoScetion/PositionLatLong';
import SubmitButton from '../../../touchables/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../../../navigation/Profile/ProfileNavigator.types';
import {useDispatch} from 'react-redux';
import {cleanCreateEstablishmentSclice} from '../../../../redux/Order/Establishments/create/createEstablishment.slice';
import JobsIds from '../../../Jobs/JobsIds';
import UserDataAdderssSection from '../infoScetion/UserDataAddressSection';
import TaxPercentage from '../../../Jobs/establishmentTaxPercentage';
import OrdersSection from './orders/OrdersSection';

const EstablishmentJobSection = () => {
  const navigation = useNavigation<ProfileNavigation>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cleanCreateEstablishmentSclice());
  }, []);
  const Establishment = useAppSelector(state => state.establishment);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [establishment, setEstablishment] = useState<IEstablishment | null>(
    null,
  );

  useEffect(() => {
    if (Establishment.error) {
      setErrorText(Establishment.error.message);
    }
    if (Establishment.data) {
      setEstablishment(Establishment.data[0]);
    }
  }, [Establishment]);

  return (
    <View>
      {establishment ? (
        <>
          <JobsIds id={establishment._id} />
          <TaxPercentage
            taxPercentage={establishment.taxPercentage}
            establishmentId={establishment._id}
          />
          <UserDataAdderssSection
            key={establishment.address._id}
            info={establishment?.address}
            establishment
            id={establishment._id}
          />
          <PositionLatLong info={establishment} />
          {errorText && <Text>{errorText}</Text>}
          <OpenHoursSection />
          {establishment.type !== 'shop' && <TablesSection />}
          <EmployeesToAccept establishmentId={establishment._id} />
          <OrdersSection establishmentId={establishment._id} />
          <EmployeeList establishmentId={establishment._id} />
          {establishment.type !== 'shop' && (
            <MenuListUpdateAndGet establishment={establishment} />
          )}
        </>
      ) : (
        <View>
          <Text
            style={[Textstyles.text, Textstyles.title, {textAlign: 'center'}]}>
            You propably do not have registered establishment yet.
          </Text>
          <Text style={[Textstyles.text, {textAlign: 'center'}]}>
            Start working with us right now
          </Text>
          <SubmitButton
            title="Lets start"
            onPress={() => {
              navigation.navigate('createestablishment');
            }}
          />
        </View>
      )}
    </View>
  );
};

export default EstablishmentJobSection;

const styles = StyleSheet.create({});
