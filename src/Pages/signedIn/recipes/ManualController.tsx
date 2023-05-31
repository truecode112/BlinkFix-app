import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IManualList} from './Recipesadd';
import TextInputRecipe from '../../../components/TextInputs/TextInputRecipe';
import {launchImageLibrary} from 'react-native-image-picker';
import {isDraft} from '@reduxjs/toolkit';
import DelleteDot from '../../../components/Icons/delleteDot';
import uuid from 'react-native-uuid';
import {IManualEdit} from '../../../redux/recipes/editRecipe/editRecipe.thunk';
//#region
export const ManualController = ({
  manualList,
  setManualList,
}: {
  manualList: IManualList[] | IManualEdit[];
  setManualList: React.Dispatch<React.SetStateAction<IManualList[]>>;
}) => {
  const [manual, setManual] = useState<IManualList>({
    _id: null,
    description: '',
    stepNumber: '',
  });
  useEffect(() => {
    manualList?.map((element, index) => {
      element.index = uuid.v4().toString() + index.toString();
      return element;
    });
  }, [manualList]);

  return (
    <View style={{width: '100%'}}>
      {manualList !== undefined && (
        <View>
          {manualList?.map((manualStep, index) => {
            return (
              <View
                key={index}
                style={{
                  marginVertical: 10,
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  padding: 10,
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        paddingVertical: 10,
                      }}>
                      step:
                    </Text>
                    {/* step */}
                    <TextInput
                      multiline={false}
                      style={{
                        color: '#fff',
                        maxWidth: '100%',
                        fontSize: 18,
                        width: 40,
                        textAlign: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                        marginBottom: 0,
                      }}
                      onChangeText={text => {
                        const elementToChange = manualList?.map(step => {
                          if (step._id === manualStep._id)
                            return {
                              ...step,
                              stepNumber: text,
                            };
                          else return step;
                        });
                        setManualList(elementToChange);
                      }}
                      value={manualStep.stepNumber}
                    />
                  </View>

                  <DelleteDot
                    onPress={() => {
                      const filteredIngredients = manualList.filter(
                        item => manualStep._id !== item._id,
                      );
                      setManualList(filteredIngredients);
                      setManual({
                        description: '',
                        stepNumber: '',
                        _id: null,
                      });
                    }}
                  />
                </View>
                {/* description */}
                {/* description */}
                <TextInput
                  multiline={true}
                  style={{color: '#fff', maxWidth: '100%'}}
                  onChangeText={text => {
                    const elementToChange = manualList?.map(step => {
                      if (step.index === manualStep.index)
                        return {
                          ...step,
                          description: text,
                        };
                      else return step;
                    });
                    setManualList(elementToChange);
                  }}
                  value={manualStep.description}
                />
                {manualStep.imageUrl && manualStep.imageUrl.assets ? (
                  <View style={{position: 'relative', flex: 1, width: '100%'}}>
                    <Image
                      style={{
                        flex: 1,
                        width: '100%',
                        aspectRatio: 2,
                        resizeMode: 'cover',
                      }}
                      source={{uri: manualStep.imageUrl?.assets[0].uri}}
                    />
                    <DelleteDot
                      style={{position: 'absolute', right: 10, top: 10}}
                      onPress={() => {
                        manualList?.map(recipeStep => {
                          if (recipeStep._id === manualStep._id) {
                            const allSteps = manualList?.map(step => {
                              if (step._id === manualStep._id) {
                                delete step.imageUrl;

                                return step;
                              }
                              return step;
                            });
                            setManualList(allSteps);
                          }
                        });
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <DelleteDot
                      onPress={async () => {
                        const result = await launchImageLibrary({
                          mediaType: 'photo',
                          selectionLimit: 1,
                          presentationStyle: 'currentContext',
                        });
                        const allSteps = manualList?.map(item => {
                          if (item._id === manualStep._id) {
                            item.imageUrl = result;
                            return item;
                          }
                          return item;
                        });
                        setManualList(allSteps);
                      }}
                      style={{backgroundColor: 'green'}}
                      sign={'+'}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#fff', fontSize: 20}}>Step </Text>
          <TextInput
            multiline={false}
            style={{
              color: '#fff',
              maxWidth: '100%',
              fontSize: 18,
              width: 40,
              textAlign: 'center',

              borderBottomWidth: 1,
              borderBottomColor: '#fff',
              marginBottom: 0,
            }}
            onChangeText={text => {
              setManual({...manual, stepNumber: text});
            }}
            value={manual.stepNumber}
            onPressIn={() => setManual({...manual, stepNumber: ''})}
          />
        </View>

        <TextInputRecipe
          placeholder="Description"
          value={manual?.description}
          onChange={setManual}
          name={'description'}
          state={manual}
          onFocus={e => setManual({...manual, stepNumber: '', description: ''})}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4D4D4D',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={async () => {
              const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
                presentationStyle: 'currentContext',
              });
              if (manual) setManual({...manual, imageUrl: result});
            }}>
            <Text style={{color: '#fff'}}>Add image to step</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (manual)
                setManualList([
                  ...manualList,
                  {
                    ...manual,
                    description: manual.description,
                  },
                ]);
              else {
                Alert.alert('you have to provide manual step information');
              }
              setManual({description: '', stepNumber: '', _id: null});
            }}
            style={{
              backgroundColor: '#EA3651',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}>Add step to manual</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//#endregion
export const ManualControllerEdit = ({
  manualList,
  setManualList,
}: {
  manualList: IManualEdit[] | null;
  setManualList: (value: IManualEdit[]) => void;
}) => {
  const [manual, setManual] = useState<IManualEdit>({
    index: null,
    description: '',
    stepNumber: '',
  });

  useEffect(() => {
    manualList?.map((element, index) => {
      element.index = uuid.v4().toString() + index.toString();
      return element;
    });
  }, [manualList]);

  return (
    <View style={{width: '100%'}}>
      {manualList !== undefined && (
        <View>
          {manualList?.map((manualStep, index) => {
            return (
              <View
                key={index}
                style={{
                  marginVertical: 10,
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  padding: 10,
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        paddingVertical: 10,
                      }}>
                      step:
                    </Text>
                    {/* step */}
                    <TextInput
                      multiline={false}
                      style={{
                        color: '#fff',
                        maxWidth: '100%',
                        fontSize: 18,
                        width: 40,
                        textAlign: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                        marginBottom: 0,
                      }}
                      onChangeText={text => {
                        const elementToChange = manualList?.map(step => {
                          if (step.index === manualStep.index)
                            return {
                              ...step,
                              stepNumber: text,
                            };
                          else return step;
                        });
                        setManualList(elementToChange);
                      }}
                      value={manualStep.stepNumber?.toString()}
                    />
                  </View>

                  <DelleteDot
                    onPress={() => {
                      const filteredIngredients = manualList.filter(
                        item => manualStep.index !== item.index,
                      );
                      setManualList(filteredIngredients);
                      setManual({
                        description: '',
                        stepNumber: '',
                      });
                    }}
                  />
                </View>
                {/* description */}
                <TextInput
                  multiline={true}
                  style={{color: '#fff', maxWidth: '100%'}}
                  onChangeText={text => {
                    const elementToChange = manualList?.map(step => {
                      if (step.index === manualStep.index)
                        return {
                          ...step,
                          description: text,
                        };
                      else return step;
                    });
                    setManualList(elementToChange);
                  }}
                  value={manualStep.description}
                />
                {manualStep.imageUrl && manualStep.imageUrl.assets ? (
                  <View style={{position: 'relative', flex: 1, width: '100%'}}>
                    <Image
                      style={{
                        flex: 1,
                        width: '100%',
                        aspectRatio: 2,
                        resizeMode: 'cover',
                      }}
                      source={{uri: manualStep.imageUrl?.assets[0].uri}}
                    />
                    <DelleteDot
                      style={{position: 'absolute', right: 10, top: 10}}
                      onPress={() => {
                        manualList?.map(recipeStep => {
                          if (recipeStep._id === manualStep._id) {
                            const allSteps = manualList?.map(step => {
                              if (step._id === manualStep._id) {
                                delete step.imageUrl;

                                return step;
                              }
                              return step;
                            });
                            setManualList(allSteps);
                          }
                        });
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <DelleteDot
                      onPress={async () => {
                        const result = await launchImageLibrary({
                          mediaType: 'photo',
                          selectionLimit: 1,
                          presentationStyle: 'currentContext',
                        });
                        const allSteps = manualList?.map(item => {
                          if (item._id === manualStep._id) {
                            item.imageUrl = result;
                            return item;
                          }
                          return item;
                        });
                        setManualList(allSteps);
                      }}
                      style={{backgroundColor: 'green'}}
                      sign={'+'}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#fff', fontSize: 20}}>Step </Text>
          <TextInput
            multiline={false}
            style={{
              color: '#fff',
              maxWidth: '100%',
              fontSize: 18,
              width: 40,
              textAlign: 'center',

              borderBottomWidth: 1,
              borderBottomColor: '#fff',
              marginBottom: 0,
            }}
            onChangeText={text => {
              setManual({...manual, stepNumber: text});
            }}
            value={manual.stepNumber}
            onPressIn={() => setManual({...manual, stepNumber: ''})}
          />
        </View>
        <TextInputRecipe
          placeholder="Description"
          value={manual?.description}
          onChange={setManual}
          name={'description'}
          state={manual}
          onFocus={e => setManual({...manual, stepNumber: '', description: ''})}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4D4D4D',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={async () => {
              const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
                presentationStyle: 'currentContext',
              });
              if (manual) setManual({...manual, imageUrl: result});
            }}>
            <Text style={{color: '#fff'}}>Add image to step</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (manualList && manual)
                setManualList([
                  ...manualList,
                  {
                    ...manual,
                    description: manual.description,
                  },
                ]);
              else {
                Alert.alert('you have to provide manual step information');
              }
              setManual({description: '', stepNumber: '', _id: null});
            }}
            style={{
              backgroundColor: '#EA3651',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}>Add step to manual</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
