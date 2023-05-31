import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IWokringHours} from '../../../../../redux/Profile/types';
import {TextInputProfileArray} from '../../../../TextInputs/TextInputCuisine';
import DropShadow from 'react-native-drop-shadow';

const SingleDay = ({
  day,
  isEditModeEnabled,
  setIsEditModeEnabled,
  state,
  setState,
}: {
  day: IWokringHours | undefined;
  state: IWokringHours[] | null;
  isEditModeEnabled: boolean;
  setIsEditModeEnabled: React.Dispatch<boolean>;
  setState: React.Dispatch<React.SetStateAction<IWokringHours[] | null>>;
}) => {
  const value = state?.find(element => element.day === day?.day);
  return (
    <DropShadow
      key={day?._id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: -2,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,.05)',
        marginTop: 5,
      }}>
      <Text
        style={{
          textTransform: 'capitalize',
          color: '#fff',
          flex: 1,
          marginLeft: 5,
        }}>
        {day?.day}:
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{color: '#fff'}}> Open: </Text>
        <TextInputProfileArray
          disabled={isEditModeEnabled}
          placeholder="start"
          state={state}
          onChange={(text: string) => {
            if (state) {
              const value = state.filter(value => value.day === day?.day)[0];
              value.hours.open = text;
              const restvalue = state?.filter(value => value.day !== day?.day);
              setState([value, ...restvalue]);
            }
          }}
          name="mondaystart"
          value={value?.hours.open}></TextInputProfileArray>
        <Text style={{color: '#fff'}}> Close: </Text>
        <TextInputProfileArray
          disabled={isEditModeEnabled}
          placeholder="end"
          state={state}
          onChange={(text: string) => {
            if (state) {
              const value = state.filter(value => value.day === day?.day)[0];
              const restvalue = state.filter(value => value.day === day?.day);
              value.hours.close = text;
              setState([value, ...restvalue]);
            }
          }}
          name="mondaystart"
          value={value?.hours.close}></TextInputProfileArray>
        {/*  */}
      </View>
    </DropShadow>
  );
};

export default SingleDay;

const styles = StyleSheet.create({});
