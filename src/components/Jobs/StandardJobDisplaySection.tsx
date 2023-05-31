import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {IJobsGet} from '../../redux/Profile/types';
import SimpleSection from '../Profile/Sections/infoScetion/SimpleSection';
import DropShadow from 'react-native-drop-shadow';
import {addNewJobRequest} from '../../redux/Profile/Jobs/addNewJobRequest';
import {getJobRequests} from '../../redux/Profile/Jobs/getJobs.thunk';
import {deleteJobRequests} from '../../redux/Profile/Jobs/deleteJob.thunk';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import OutsidePressHandler from 'react-native-outside-press';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import SingleJobWorkspaceDisplay from './SingleJobWorkspaceDisplay/SingleJobWorkspaceDisplay.component';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../navigation/Profile/ProfileNavigator.types';

const StandardJobDisplaySection = ({jobs}: {jobs: IJobsGet[] | undefined}) => {
  const {error} = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [jobRequestForm, setJobRequestForm] = useState({
    workPlace: '',
    typeOfWork: '',
  });
  const [allJobs, setAllJobs] = useState(jobs ? jobs : []);
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const workspaceNavigation = useNavigation<ProfileNavigation>();
  useEffect(() => {
    if (jobs) {
      const test = jobs.filter(job => job.workPlace && job);
      return setAllJobs(test);
    }
  }, [jobs]);

  const onChangeTextFunc = (text: string, name: 'workPlace' | 'typeOfWork') => {
    setJobRequestForm({...jobRequestForm, [name]: text.toLowerCase()});
  };

  const submitJobRequestForm = () => {
    if (
      jobRequestForm.typeOfWork !== 'chef' &&
      jobRequestForm.typeOfWork !== 'driver' &&
      jobRequestForm.typeOfWork !== 'waiter'
    ) {
      Alert.alert(
        'Validation failed',
        "role should be one of the following: 'driver', 'waiter' or 'chef'",
      );
    } else {
      dispatch(addNewJobRequest(jobRequestForm));
      setJobRequestForm({typeOfWork: '', workPlace: ''});
      setIsEditModeEnabled(false);
      dispatch(getJobRequests());
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert(error, undefined, [
        {
          text: "I've got this",
          onPress: () => {
            dispatch(getJobRequests());
          },
        },
      ]);
    }
  }, [error]);

  const [isJobsVisible, setIsJobsVisible] = useState<boolean>(false);
  const sectionJobHeight = useSharedValue(0);
  const sectionJobHeightStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(sectionJobHeight.value, {duration: 200}),
    };
  });
  useEffect(() => {
    if (isJobsVisible) {
      sectionJobHeight.value = 100;
    } else {
      sectionJobHeight.value = 0;
    }
  }, [isJobsVisible]);

  const [selectedJobTitle, setSelectedJobTitle] = useState<string | null>(null);

  const {width} = useWindowDimensions();
  return (
    <View>
      <SimpleSection
        isEditModeEnabled={isEditModeEnabled}
        title="I am currently working..."
        Button={() =>
          !isEditModeEnabled ? (
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
              }}>
              <Image
                style={styles.smallIconSize}
                source={require('../../assets/utilityIcons/edit.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIsEditModeEnabled(!isEditModeEnabled);
              }}>
              <Image
                style={styles.smallIconSizeClose}
                source={require('../../assets/utilityIcons/add.png')}
              />
            </TouchableOpacity>
          )
        }>
        {allJobs.length === 0 ? (
          <Text
            style={[Textstyles.text, {textAlign: 'center', marginVertical: 5}]}>
            You have to apply for a job first.
          </Text>
        ) : (
          allJobs?.map(singleJob => {
            return (
              <DropShadow
                key={singleJob._id}
                style={{
                  flex: 1,

                  margin: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 10,
                    height: 10,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  elevation: 1,
                  borderRadius: 5,
                  inset: 12,
                  backgroundColor: 'rgba(255, 255, 255,0.1)',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  position: 'relative',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.text}>as a </Text>
                  <Text>{singleJob.typeOfWork}</Text>
                  <Text style={styles.text}> in </Text>
                  <Text>
                    {singleJob.workPlace?.name} / {singleJob.workPlace?.type}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(deleteJobRequests(singleJob._id));
                  }}
                  activeOpacity={0}
                  style={{
                    zIndex: 100,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    display: isEditModeEnabled ? 'flex' : 'none',
                  }}>
                  <Image
                    style={[styles.smallIconSize]}
                    source={require('../../assets/utilityIcons/deleteC.png')}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    zIndex: 100,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    display: !isEditModeEnabled ? 'flex' : 'none',
                  }}>
                  <Image
                    style={[styles.smallIconSize]}
                    source={
                      !singleJob.isConfirmed
                        ? require('../../assets/utilityIcons/notConfirmed.png')
                        : require('../../assets/utilityIcons/confirmed.png')
                    }
                  />
                </View>
              </DropShadow>
            );
          })
        )}

        {isEditModeEnabled && (
          <DropShadow
            style={{
              flex: 1,

              margin: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: -2,
                height: 4,
              },
              shadowOpacity: 1,
              shadowRadius: 15,
              elevation: 1,
              borderRadius: 5,
              inset: 12,
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            {/* here */}
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>as a </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setIsJobsVisible(!isJobsVisible);
                }}>
                <Text style={{color: selectedJobTitle ? '#000' : '#808080'}}>
                  {selectedJobTitle
                    ? selectedJobTitle
                    : 'role ( waiter / driver / chef )'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}> in </Text>
              <TextInput
                value={jobRequestForm.workPlace}
                onChangeText={text =>
                  onChangeTextFunc(text.replace(/\s/g, ''), 'workPlace')
                }
                placeholder="Establishment Id"
                editable={isEditModeEnabled}
              />
            </View>
            <OutsidePressHandler
              disabled={false}
              onOutsidePress={() => {
                setIsJobsVisible(false);
              }}>
              <Animated.View style={[{height: 0}, sectionJobHeightStyle]}>
                <TouchableOpacity
                  style={{flex: 1}}
                  activeOpacity={1}
                  onPress={() => {
                    setSelectedJobTitle(null);
                    setIsJobsVisible(false);
                    setJobRequestForm({...jobRequestForm, workPlace: ''});
                  }}>
                  <TouchableOpacity
                    style={styles.job}
                    onPress={() => {
                      setIsJobsVisible(false);
                      setSelectedJobTitle('Driver');
                      setJobRequestForm({
                        ...jobRequestForm,
                        typeOfWork: 'driver',
                      });
                    }}>
                    <Text style={styles.jobText}>Driver</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.job}
                    onPress={() => {
                      setIsJobsVisible(false);
                      setSelectedJobTitle('Waiter');
                      setJobRequestForm({
                        ...jobRequestForm,
                        typeOfWork: 'waiter',
                      });
                    }}>
                    <Text style={styles.jobText}>Waiter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.job}
                    onPress={() => {
                      setIsJobsVisible(false);
                      setSelectedJobTitle('Chef');
                      setJobRequestForm({
                        ...jobRequestForm,
                        typeOfWork: 'chef',
                      });
                    }}>
                    <Text style={styles.jobText}>Chef</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            </OutsidePressHandler>

            <TouchableOpacity
              activeOpacity={1}
              onPress={submitJobRequestForm}
              style={{
                backgroundColor: '#EA3651',
                width: '50%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginVertical: 10,
                alignSelf: 'flex-end',
              }}>
              <Text style={{color: '#fff'}}>New Job request</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}></View>
          </DropShadow>
        )}
      </SimpleSection>

      <SimpleSection title={'Workspaces'}>
        <ScrollView
          horizontal
          snapToInterval={width * 0.8 + 20}
          snapToStart
          snapToEnd
          decelerationRate={'fast'}>
          {allJobs
            .filter(job => job && job.isConfirmed === true)
            .map((job, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  onPress={() => {
                    workspaceNavigation.navigate('Workspace', {
                      screen: job.typeOfWork,
                      jobId: job._id,
                    });
                  }}>
                  <SingleJobWorkspaceDisplay job={job} />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </SimpleSection>
    </View>
  );
};

export default StandardJobDisplaySection;

const styles = StyleSheet.create({
  smallIconSize: {
    height: 20,
    width: 20,
  },
  smallIconSizeClose: {
    height: 20,
    width: 20,
    transform: [{rotate: '45deg'}],
  },
  text: {
    color: '#fff',
  },
  job: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#rgba(0,0,0,.05)',
    alignSelf: 'center',
    marginVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  jobText: {
    color: '#fff',
    fontFamily: 'Handlee-Regular',
    fontSize: 15,
  },
});
