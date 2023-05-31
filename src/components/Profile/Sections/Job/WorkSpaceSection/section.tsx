import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from '../../infoScetion/SimpleSection';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import DropShadow from 'react-native-drop-shadow';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {EmpoyeesToAccept} from '../../../../../redux/Order/tables/employees/getEmployeesToAccept.thunk';
import {EmpoyeesAccept} from '../../../../../redux/Order/tables/employees/ConfirmNewEmployee.thunk';
import {EmpoyeesReject} from '../../../../../redux/Order/tables/employees/RejectNewEmployee.thunk';
import {getMyProfile} from '../../../../../redux/Profile/core/profileCore.thunk';
import {GetEmployeeList} from '../../../../../redux/Order/tables/employees/GetEmployeeList.thunk';

const EmployeesToAccept = ({establishmentId}: {establishmentId: string}) => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.employeesAccept);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(EmpoyeesToAccept(establishmentId));
    }, []),
  );

  useEffect(() => {
    dispatch(GetEmployeeList(establishmentId));
  }, [data]);
  if (data && data?.length > 0)
    return (
      <SimpleSection
        title={'Employees to accept'}
        isEditModeEnabled={isEditModeEnabled}
        Button={() =>
          isEditModeEnabled ? (
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
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
        }>
        <View style={{marginBottom: 20}}>
          {data?.map(singleJobToAccept => {
            const date = new Date(singleJobToAccept.startOfWork);
            return (
              <DropShadow
                key={singleJobToAccept._id}
                style={{
                  shadowColor: '#ccc',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.05,
                  shadowRadius: 30.84,

                  elevation: 5,
                  alignItems: 'center',
                  height: 50,
                  paddingVertical: 5,
                  backgroundColor: 'rgba(0,0,0,.05)',
                  borderRadius: 5,
                  marginBottom: 5,
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      textTransform: 'capitalize',
                    }}>
                    {singleJobToAccept.workerId.first_name}{' '}
                    {singleJobToAccept.workerId.last_name}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      textTransform: 'capitalize',
                    }}>
                    {' '}
                    {singleJobToAccept.typeOfWork}{' '}
                  </Text>
                </View>
                <Text
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    color: '#fff',
                    fontSize: 12,
                  }}>
                  {date.toDateString()}
                </Text>
                {isEditModeEnabled && (
                  <View
                    style={{
                      position: 'absolute',
                      right: 15,
                      top: '30%',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{paddingHorizontal: 5}}
                      onPress={() =>
                        dispatch(EmpoyeesAccept(singleJobToAccept._id))
                      }>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../../../../../assets/utilityIcons/confirm.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{paddingHorizontal: 5}}
                      onPress={() =>
                        dispatch(EmpoyeesReject(singleJobToAccept._id))
                      }>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../../../../../assets/utilityIcons/reject.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </DropShadow>
            );
          })}
        </View>
      </SimpleSection>
    );
  else return <></>;
};

export default EmployeesToAccept;

const styles = StyleSheet.create({});
