import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {GetEmployeeList} from '../../../../../redux/Order/tables/employees/GetEmployeeList.thunk';
import SimpleSection from '../../infoScetion/SimpleSection';
import SimpleEmployee from '../../../../Jobs/SimpleEmployee';
import {ScrollView} from 'react-native-gesture-handler';

const EmployeeList = ({establishmentId}: {establishmentId: string}) => {
  const employeThunks = useAppSelector(state => state.employees);
  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetEmployeeList(establishmentId));
    }, []),
  );
  return (
    <View>
      {employeThunks.data?.map(list => {
        return (
          <SimpleSection key={list._id} title={list._id + 's'}>
            <ScrollView horizontal>
              {list.employees?.map(employee => (
                <SimpleEmployee employee={employee} key={employee._id} />
              ))}
            </ScrollView>
          </SimpleSection>
        );
      })}
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({});
