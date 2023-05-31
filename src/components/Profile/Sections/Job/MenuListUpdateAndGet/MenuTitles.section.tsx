import {
  Alert,
  Image,
  SectionList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {IEstablishment} from '../../../../../redux/Profile/types';
import SimpleSection from '../../infoScetion/SimpleSection';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  deleteMyEstabishmentMenus,
  getMyEstabishmentMenus,
  PostMyEstabishmentMenus,
} from '../../../../../redux/Profile/establishmentMenus/EstablishmentMenu.thunk';
import InsetShadow from 'react-native-inset-shadow';
import {cleanUpMyEstablishmentMenusGet} from '../../../../../redux/Profile/establishmentMenus/EstablishmentMenu.slice';

const MenuTitles = ({
  establishment,
  selected,
  setSelected,
}: {
  establishment: IEstablishment;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const establishmentId = establishment._id;
  const dispatch = useAppDispatch();
  const {data, error} = useAppSelector(state => state.MyEstabishmentMenus);
  useEffect(() => {
    dispatch(getMyEstabishmentMenus(establishmentId));
  }, [establishmentId]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data[0]._id);
    } else {
      setSelected('example menu name');
    }
  }, [data]);

  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [newMenuTitle, setNewMenuTitle] = useState<string>('');
  const {width} = useWindowDimensions();
  const textInputRef = useRef(null);

  function AddNewMenu(establishmentId: string, text: any): void {
    if (text === '') {
      Alert.alert('Validation Error', 'You must provide a name for menu ');
      //@ts-ignore
      textInputRef.current?.focus();
    } else {
      dispatch(
        PostMyEstabishmentMenus({
          establishmentId: establishmentId,
          title: newMenuTitle,
        }),
      );
      setNewMenuTitle('');
    }
  }
  useEffect(() => {
    dispatch(getMyEstabishmentMenus(establishmentId));
  }, [isEditModeEnabled]);

  useEffect(() => {
    if (error)
      Alert.alert('Problem', error, [
        {
          onPress: () => {
            dispatch(getMyEstabishmentMenus(establishmentId));
          },
        },
      ]);
  }, [error]);

  return (
    <SimpleSection
      title={'Special Menu Names '}
      isEditModeEnabled={isEditModeEnabled}
      Button={() => (
        <TouchableOpacity
          onPress={() => {
            setSelected(null);
            setIsEditModeEnabled(!isEditModeEnabled);
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={
              !isEditModeEnabled
                ? require('../../../../../assets/utilityIcons/edit.png')
                : require('../../../../../assets/utilityIcons/close.png')
            }></Image>
        </TouchableOpacity>
      )}>
      <ScrollView horizontal style={{paddingVertical: 15}}>
        {isEditModeEnabled && (
          <InsetShadow
            containerStyle={{
              borderRadius: 5,
              marginHorizontal: 5,
              minWidth: 250,
              flexGrow: 1,
              maxWidth: width / 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
                marginHorizontal: 5,
                marginVertical: 5,
                width: '100%',
                paddingHorizontal: 10,
              }}>
              <TextInput
                ref={textInputRef}
                style={{color: '#fff', flex: 1}}
                value={newMenuTitle}
                onChangeText={text => setNewMenuTitle(text)}
              />
              <TouchableOpacity
                onPress={() => AddNewMenu(establishmentId, newMenuTitle)}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../../assets/utilityIcons/add.png')}
                />
              </TouchableOpacity>
            </View>
          </InsetShadow>
        )}
        {data && data.length !== 0 ? (
          data?.map(item =>
            selected === item._id ? (
              <View key={item._id}>
                <InsetShadow
                  containerStyle={{
                    borderRadius: 5,
                    position: 'relative',
                    height: 30,
                  }}
                  key={item._id}>
                  <TouchableOpacity
                    disabled={isEditModeEnabled}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      marginHorizontal: 5,
                    }}>
                    <Text style={{color: '#fff'}}>{item.menuName}</Text>
                  </TouchableOpacity>
                </InsetShadow>
                {isEditModeEnabled && (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(deleteMyEstabishmentMenus(item._id));
                    }}
                    style={{
                      borderRadius: 5,
                      marginHorizontal: 5,
                      top: -10,
                      right: -10,
                      position: 'absolute',
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../../../../assets/utilityIcons/deleteC.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View key={item._id}>
                <TouchableOpacity
                  disabled={isEditModeEnabled}
                  style={{position: 'relative'}}
                  onPress={() => {
                    setSelected(item._id);
                  }}
                  key={item._id}>
                  <View
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      marginHorizontal: 5,
                    }}>
                    <Text style={{color: '#fff'}}>{item.menuName}</Text>
                  </View>
                </TouchableOpacity>
                {isEditModeEnabled && (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(deleteMyEstabishmentMenus(item._id));
                    }}
                    style={{
                      borderRadius: 5,
                      marginHorizontal: 5,
                      top: -10,
                      right: -10,
                      position: 'absolute',
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../../../../assets/utilityIcons/deleteC.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ),
          )
        ) : (
          <View key={'example menu name'}>
            <InsetShadow
              containerStyle={{
                borderRadius: 5,
                position: 'relative',
                height: 30,
              }}>
              <TouchableOpacity
                disabled={true}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}>
                <Text style={{color: '#fff'}}>{'example menu name'}</Text>
              </TouchableOpacity>
            </InsetShadow>
            {isEditModeEnabled && (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'warning',
                    'this is only example menu item add your own to perform this action',
                  ); // dispatch(deleteMyEstabishmentMenus(item._id));
                }}
                style={{
                  borderRadius: 5,
                  marginHorizontal: 5,
                  top: -10,
                  right: -10,
                  position: 'absolute',
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../../assets/utilityIcons/deleteC.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SimpleSection>
  );
};

export default MenuTitles;

const styles = StyleSheet.create({});
