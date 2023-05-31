import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SimpleSection from '../Profile/Sections/infoScetion/SimpleSection';
import SelectDropdown from 'react-native-select-dropdown';
import {IJobsGet} from '../../redux/Profile/types';
import _ from 'lodash';

const WorkspaceSection = ({jobs}: {jobs: IJobsGet[]}) => {
  const accepted = jobs.filter(job => job.isConfirmed === true);

  const filteredJobs = accepted?.map(job => {
    return {
      name: job?.workPlace?.name,
      id: job?.workPlace?._id,
      orders: job?.orders,
    };
  });
  var groupedResult = _.groupBy(accepted, jobs => jobs?.workPlace?._id);
  if ((accepted.length > 1 && groupedResult.key !== undefined) === true)
    return (
      <SimpleSection title="Workspace">
        {accepted.length > 1 ? (
          <View style={{width: '100%'}}>
            <SelectDropdown
              data={filteredJobs ? filteredJobs : []}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem?.name;
              }}
              rowTextForSelection={(item, index) => {
                return item?.name;
              }}
              rowStyle={{
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
              buttonStyle={{
                width: '100%',
                height: 50,
                borderRadius: 8,
                backgroundColor: 'rgba(0,0,0,0.15)',
              }}
              searchPlaceHolder={'Search for one job'}
              dropdownOverlayColor="rgba(0,0,0,0)"
              renderDropdownIcon={isOpen => (
                <Image
                  style={{
                    height: 10,
                    width: 20,
                    transform: [{rotate: !isOpen ? '180deg' : '0deg'}],
                  }}
                  source={require('../../assets/utilityIcons/arrowup.png')}
                />
              )}
              dropdownIconPosition="right"
              defaultButtonText="Select one Workplace"
              dropdownStyle={{
                backgroundColor: 'rgba(100,100,100,0.9)',
                borderRadius: 15,
              }}
              buttonTextStyle={{color: '#fff'}}
              selectedRowTextStyle={{color: '#fff'}}
              rowTextStyle={{color: '#fff'}}
              selectedRowStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            />
          </View>
        ) : (
          <Text>{accepted[0]?.workPlace?.name}</Text>
        )}
      </SimpleSection>
    );
  else return <></>;
};

export default WorkspaceSection;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },
});
