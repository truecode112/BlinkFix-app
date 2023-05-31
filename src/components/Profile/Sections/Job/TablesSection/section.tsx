import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from '../../infoScetion/SimpleSection';
import DropShadow from 'react-native-drop-shadow';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {ITable} from '../../../../../redux/Profile/types';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {AddTableToEstablishment} from '../../../../../redux/Order/tables/tableAdd.thunk';
import {DeleteTableEstablishment} from '../../../../../redux/Order/tables/tableDelete.thunk';
import {cleanUpEstablishment} from '../../../../../redux/Order/Establishment.slice';

const TablesSection = () => {
  const initialNewTable = {
    numberOfPlaces: '',
    numberOfTables: '',
    tableName: '',
    tableShape: '',
  };
  const {data, error} = useAppSelector(state => state.establishment);
  const [tableState, setTableState] = useState<ITable[] | null>();
  const [newTableState, setNewTableState] = useState<ITable>(initialNewTable);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data && data[0]) setTableState(data[0].tables);
  }, [data]);
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (error)
      Alert.alert('Something went wrong', error, [
        {onPress: () => dispatch(cleanUpEstablishment())},
      ]);
  }, [error]);

  return (
    <SimpleSection
      title={'Table Section'}
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
      {isEditModeEnabled && (
        <>
          <DropShadow
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
              height: 100,
              paddingVertical: 5,
              backgroundColor: 'rgba(0,0,0,.05)',
              borderRadius: 5,
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                height: '100%',
              }}>
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  justifyContent: 'space-evenly',
                  marginHorizontal: 2,
                }}>
                <TextInput
                  placeholder="Name of the table"
                  onChangeText={text => {
                    setNewTableState({...newTableState, tableName: text});
                  }}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    marginBottom: 5,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}></TextInput>
                <TextInput
                  onChangeText={text => {
                    setNewTableState({...newTableState, numberOfTables: text});
                  }}
                  style={{
                    color: '#fff',
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}
                  placeholder="Number of tables"></TextInput>
              </View>
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  justifyContent: 'space-evenly',
                  marginHorizontal: 2,
                }}>
                <TextInput
                  onChangeText={text => {
                    setNewTableState({...newTableState, tableShape: text});
                  }}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'center',
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}
                  placeholder="Shape of the table"></TextInput>
                <TextInput
                  onChangeText={text => {
                    setNewTableState({...newTableState, numberOfPlaces: text});
                  }}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'center',
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}
                  placeholder="Number of places"></TextInput>
              </View>
            </View>
          </DropShadow>
          <TouchableOpacity
            onPress={() => {
              if (data && data.length > 0) {
                dispatch(
                  AddTableToEstablishment({
                    establishmentId: data[0]._id,
                    table: newTableState,
                  }),
                );
                setIsEditModeEnabled(false);
                setNewTableState(initialNewTable);
              }
            }}
            style={{
              alignSelf: 'flex-end',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: '#ea3651',
              borderRadius: 5,
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff'}}>Add new Table</Text>
          </TouchableOpacity>
        </>
      )}
      {tableState && tableState.length !== 0 ? (
        tableState.map(table => (
          <DropShadow
            key={table._id}
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
            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  {table.tableName} / {table.tableShape}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#fff'}}> All / Available </Text>
                  <Text style={{color: '#EA3651'}}>
                    {table.numberOfTables} / {table.numberOfTablesAvailable}
                  </Text>
                </View>
              </View>
              <Text style={{color: '#fff', fontSize: 30, textAlign: 'center'}}>
                {table.numberOfPlaces}
              </Text>
              {isEditModeEnabled ? (
                <TouchableOpacity
                  onPress={() => {
                    if (table._id && data && data[0])
                      dispatch(
                        DeleteTableEstablishment({
                          tableSetId: table._id,
                          establishmentId: data[0]._id,
                        }),
                      );
                  }}
                  style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../../../../../assets/utilityIcons/deleteC.png')}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  style={{height: 35, width: 35}}
                  source={require('../../../../../assets/utilityIcons/chair.png')}
                />
              )}
            </View>
          </DropShadow>
        ))
      ) : (
        <DropShadow
          key={'not existing table'}
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
          <View style={{flexDirection: 'row', marginHorizontal: 20}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginBottom: 5,
                }}>
                {'table name'} / {'table shape'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#fff'}}> All / Available </Text>
                <Text style={{color: '#EA3651'}}>
                  {'0'} / {'0'}
                </Text>
              </View>
            </View>
            <Text style={{color: '#fff', fontSize: 30, textAlign: 'center'}}>
              {'0'}
            </Text>
            {isEditModeEnabled ? (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'warning',
                    'this is only example menu item add your own to perform this action',
                  );
                }}
                style={{
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../../../../assets/utilityIcons/deleteC.png')}
                />
              </TouchableOpacity>
            ) : (
              <Image
                style={{height: 35, width: 35}}
                source={require('../../../../../assets/utilityIcons/chair.png')}
              />
            )}
          </View>
        </DropShadow>
      )}
    </SimpleSection>
  );
};

export default TablesSection;

const styles = StyleSheet.create({});
