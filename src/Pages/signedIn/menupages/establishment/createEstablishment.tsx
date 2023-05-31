import React, {useEffect, useState, Fragment} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import LoggedInBackground from '../../../../components/background/loggedInBackground';
import {TextInputCustom} from '../../../../components/TextInputs';
import {
  CreateInterfaceType,
  initialCreateForm,
  initialHours,
} from './establishment.types';
import {Textstyles} from '../contact';
import SubmitButton from '../../../../components/touchables/SubmitButton';
import {ScrollView} from 'react-native-gesture-handler';
import TickButton from '../../../../components/buttons/tickButton';
import Geolocation from '@react-native-community/geolocation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {default as CL} from '../../../../static/cuisines.json';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {CreateEstablishmentThunk} from '../../../../redux/Order/Establishments/create/createEstablishment.thunk';
import Spinner from 'react-native-spinkit';
import {cleanCreateEstablishmentSclice} from '../../../../redux/Order/Establishments/create/createEstablishment.slice';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigation} from '../../../../navigation/Profile/ProfileNavigator.types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface ICuisineForSearch {
  CodeURL: string;
  name: string;
  NameNative: string;
}

const CreateEstablishment = () => {
  const navigation = useNavigation<ProfileNavigation>();
  const [cuisinesList, setCuisinesList] = useState<ICuisineForSearch[]>([]);
  const [createForm, setCreateForm] =
    useState<CreateInterfaceType>(initialCreateForm);
  const [Cuisines, setCuisines] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<{
    isDelivery: boolean;
    isPickup: boolean;
  }>({isDelivery: false, isPickup: false});
  useEffect(() => {
    const list = CL?.map(item => {
      return {
        CodeURL: item.CodeURL,
        name: item.NameEnglish,
        NameNative: item.NameNative,
      };
    });
    setCuisinesList(list);
  }, []);

  const [foodType, setFoodType] = useState({
    isHalal: false,
    isKosher: false,
    isVegan: false,
  });
  const [lastClicked, setLastClicked] = useState({day: '', isOpen: true});
  const [openHours, setOpenHours] = useState(initialHours);

  const [latlong, setLatlong] = useState({lat: '', long: ''});

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const dispatch = useAppDispatch();

  const handleRegister = () => {
    dispatch(CreateEstablishmentThunk(createForm));
  };
  const {message, isLoading, error} = useAppSelector(
    state => state.CreateEstablishment,
  );
  useEffect(() => {
    if (error) {
      Alert.alert('Something went wrong', JSON.stringify(error), [
        {
          onPress: () => {
            dispatch(cleanCreateEstablishmentSclice());
          },
        },
      ]);
    }
    if (message === 'succesfully added establishment' && !error) {
      navigation.navigate('ProfileHome');
      dispatch(cleanCreateEstablishmentSclice());
    }
  }, [message, error]);

  const handleConfirm = (date: Date) => {
    const daychanged = openHours?.map(dayFilter => {
      if (dayFilter.day === lastClicked.day) {
        if (lastClicked.isOpen)
          return {
            day: lastClicked.day,
            hours: {
              open: date.toLocaleTimeString(),
              close: dayFilter.hours.close,
            },
          };
        else
          return {
            day: lastClicked.day,
            hours: {
              open: dayFilter.hours.open,
              close: date.toLocaleTimeString(),
            },
          };
      } else {
        return dayFilter;
      }
    });
    setOpenHours(daychanged);
    hideDatePicker();
  };
  useEffect(() => {
    setCreateForm({...createForm, openHours: openHours});
  }, [openHours]);

  useEffect(() => {
    setCreateForm({...createForm, cuisineNames: Cuisines});
  }, [Cuisines]);
  useEffect(() => {
    setCreateForm({...createForm, delivery});
  }, [delivery]);

  const {width} = useWindowDimensions();

  return (
    <KeyboardAwareScrollView style={{height: '100%', flex: 1}}>
      <LoggedInBackground withoutBottom>
        {isLoading ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner color="#ea3651" type="Circle" />
          </View>
        ) : (
          <ScrollView
            style={{width: '100%', marginBottom: 80}}
            contentContainerStyle={{}}>
            <Text style={Textstyles.text}>Establishment name:</Text>
            <TextInputPlainText
              onChange={text => {
                setCreateForm({...createForm, name: text});
              }}
              value={createForm?.name}
              placeholder={'Establishment name'}
            />
            <Text style={Textstyles.text}>Vat number:</Text>
            <TextInputPlainText
              onChange={text => {
                setCreateForm({...createForm, vatNumber: text});
              }}
              value={createForm?.vatNumber}
              placeholder={'Vat number'}
            />

            {/* List of cuisiunes */}
            <Text style={[Textstyles.text, Textstyles.title]}>Cuisines</Text>

            <>
              <View>
                {Cuisines?.map((cuisine, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginVertical: 5,
                        borderRadius: 8,
                        backgroundColor: '#00000015',
                      }}>
                      <TouchableOpacity
                        style={{zIndex: 100}}
                        onPress={() => {
                          const indexof = Cuisines.indexOf(cuisine);

                          const filtered = Cuisines.filter(
                            cuisinemapp => Cuisines[indexof] !== cuisinemapp,
                          );
                          setCuisines(filtered);
                        }}>
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            right: 0,
                            top: 5,
                          }}
                          source={require('../../../../assets/utilityIcons/deleteC.png')}
                        />
                      </TouchableOpacity>
                      <Text style={Textstyles.text}>{cuisine}</Text>
                    </View>
                  );
                })}
                <Fragment>
                  <ScrollView
                    horizontal
                    style={{width: '100%'}}
                    contentContainerStyle={{width: '100%'}}>
                    <SearchableDropdown
                      onItemSelect={(item: ICuisineForSearch) => {
                        setCuisines([...Cuisines, item.CodeURL]);
                      }}
                      containerStyle={{padding: 5}}
                      onRemoveItem={(item: ICuisineForSearch) => {
                        const items = Cuisines.filter(
                          cuisine => cuisine !== item.CodeURL,
                        );
                        setCuisines(items);
                      }}
                      itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#dddddd20',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                      itemTextStyle={{color: '#fff'}}
                      itemsContainerStyle={{maxHeight: 140}}
                      items={cuisinesList}
                      defaultIndex={1}
                      resetValue={false}
                      textInputProps={{
                        placeholder: 'Search for cuisine',
                        underlineColorAndroid: 'transparent',
                        style: {
                          padding: 12,
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 5,
                          width: width - 20,
                          alignSelf: 'center',
                          color: '#fff',
                        },
                      }}
                      listProps={{
                        nestedScrollEnabled: true,
                      }}
                    />
                  </ScrollView>
                </Fragment>
              </View>
            </>
            <Text style={[Textstyles.text, Textstyles.title]}>Location</Text>
            <>
              <TextInputCustom
                name="Location"
                disabled
                onChange={() => {}}
                placeholder={'Location lat long'}
                value={latlong.lat}
              />
              <TextInputCustom
                name="Location"
                disabled
                onChange={() => {}}
                placeholder={'Location lat long'}
                value={latlong.long}
              />
              <SubmitButton
                onPress={() => {
                  Geolocation.getCurrentPosition(info =>
                    setLatlong({
                      lat: info.coords.latitude.toString(),
                      long: info.coords.longitude.toString(),
                    }),
                  );
                }}
                title="Get location"
              />
            </>
            {/* Address of establishment */}
            <Text style={[Textstyles.text, Textstyles.title]}>Address</Text>
            <>
              <Text style={[Textstyles.text]}>Country</Text>
              <TextInputPlainText
                onChange={text => {
                  setCreateForm({
                    ...createForm,
                    address: {...createForm.address, country: text},
                  });
                }}
                value={createForm.address.country}
                placeholder={'Country'}
              />
              <Text style={[Textstyles.text]}>State</Text>
              <TextInputPlainText
                onChange={text => {
                  setCreateForm({
                    ...createForm,
                    address: {...createForm.address, state: text},
                  });
                }}
                value={createForm.address.state}
                placeholder={'State'}
              />
              <Text style={[Textstyles.text]}>City</Text>
              <TextInputPlainText
                onChange={text => {
                  setCreateForm({
                    ...createForm,
                    address: {...createForm.address, city: text},
                  });
                }}
                value={createForm.address.city}
                placeholder={'City'}
              />
              <Text style={[Textstyles.text]}>Postal Code</Text>
              <TextInputPlainText
                onChange={text => {
                  setCreateForm({
                    ...createForm,
                    address: {...createForm.address, postcode: text},
                  });
                }}
                value={createForm.address.postcode}
                placeholder={'Postal Code'}
              />

              <Text style={[Textstyles.text]}>Street</Text>
              <TextInputPlainText
                onChange={text => {
                  setCreateForm({
                    ...createForm,
                    address: {...createForm.address, street: text},
                  });
                }}
                value={createForm.address.street}
                placeholder={'Street'}
              />
              <Text style={[Textstyles.text]}>Building number</Text>
              <TextInputPlainText
                onChange={text => {
                  setCreateForm({
                    ...createForm,
                    address: {...createForm.address, buildingnumber: text},
                  });
                }}
                value={createForm.address.buildingnumber}
                placeholder={'Building number'}
              />
            </>

            <Text style={[Textstyles.text, Textstyles.title]}>Delivery</Text>
            {/* delivery of establishment */}
            <>
              <TickButton
                title="Delivery"
                selected={delivery.isDelivery}
                setSelected={() => {
                  setDelivery({...delivery, isDelivery: !delivery.isDelivery});
                }}
              />
              <TickButton
                title="Pickup"
                selected={delivery.isPickup}
                setSelected={() => {
                  setDelivery({...delivery, isPickup: !delivery.isPickup});
                }}
              />
            </>
            <Text style={[Textstyles.text, Textstyles.title]}>Food types</Text>
            {/* delivery of establishment */}
            <>
              <TickButton
                title=" Halal"
                selected={foodType.isHalal}
                setSelected={() => {
                  setFoodType({...foodType, isHalal: !foodType.isHalal});
                }}
              />
              <TickButton
                title=" Vegan"
                selected={foodType.isVegan}
                setSelected={() => {
                  setFoodType({...foodType, isVegan: !foodType.isVegan});
                }}
              />
              <TickButton
                title=" Kosher"
                selected={foodType.isKosher}
                setSelected={() => {
                  setFoodType({...foodType, isKosher: !foodType.isKosher});
                }}
              />
            </>

            <Text style={[Textstyles.text, Textstyles.title]}>Open Hours</Text>
            <>
              {openHours?.map((day, index) => {
                return (
                  <View key={index}>
                    <Text style={Textstyles.text}>{day.day.toUpperCase()}</Text>
                    <TextInputPlainText
                      onClick={() => {
                        setLastClicked({day: day.day, isOpen: true});
                        showDatePicker();
                      }}
                      value={day.hours.open}
                      placeholder={'Open Hour'}
                      onChange={() => {}}
                    />
                    <TextInputPlainText
                      onClick={() => {
                        setLastClicked({day: day.day, isOpen: false});

                        showDatePicker();
                      }}
                      value={day.hours.close}
                      placeholder={'Close Hour'}
                      onChange={() => {}}
                    />
                  </View>
                );
              })}
            </>
            <SubmitButton
              onPress={() => {
                handleRegister();
              }}
              title={'Create establishment'}
              style={{marginTop: 20}}
            />
            <View style={{height: 100}} />
            <DateTimePickerModal
              is24Hour={true}
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={date => handleConfirm(date)}
              onCancel={hideDatePicker}
              minuteInterval={30}
            />
          </ScrollView>
        )}
      </LoggedInBackground>
    </KeyboardAwareScrollView>
  );
};

export default CreateEstablishment;

const styles = StyleSheet.create({});

export const TextInputPlainText = ({
  placeholder,
  onChange,
  value,
  disabled,
  onClick,
}: {
  placeholder: string;
  onChange: (text: string) => void;
  value: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      activeOpacity={1}
      style={{
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 5,
      }}>
      <TextInput
        pointerEvents={onClick ? 'none' : 'auto'}
        editable={disabled ? false : true}
        accessible
        placeholder={placeholder}
        onChangeText={onChange}
        style={[Textstyles.text, {fontSize: 16}]}
        value={value}></TextInput>
    </TouchableOpacity>
  );
};
