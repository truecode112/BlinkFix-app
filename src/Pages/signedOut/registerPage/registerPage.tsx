import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import LoggedOutBackground from '../../../components/background/loggedOutBackground';
import {TextInputCustom} from '../../../components/TextInputs';
import {
  addressType,
  initialAddress,
  initialRegosterForm,
  IRegisterForm,
  IStripeDetails,
  IStripeRegister,
} from '../../../redux/Auth/AuthTypes';
import {registerThunk} from '../../../redux/Auth/thunks';
import {AuthScreenProp} from '../../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import Subscryptions from './subscryptions';
import {
  cleanUpRegister,
  getRegisterStateState,
} from '../../../redux/Auth/registerReducer';
import Spinner from 'react-native-spinkit';
import {RootState} from '../../../redux/store';
import {default as ccjson} from '../../../static/coutrycurrency.json';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Textstyles} from '../../signedIn/menupages/contact';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {TextInput} from 'react-native-gesture-handler';

const RegisterPage = () => {
  const isLoading = getRegisterStateState();

  const regState = useAppSelector((state: RootState) => state.register);

  const {height} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthScreenProp>();
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isPasswordMatch, setisPasswordMatch] = useState(false);
  const [selected, setSelected] = useState<null | number>(null);
  const [subName, setSubName] = useState<string | null>(null);

  const [registerForm, setRegisterForm] =
    useState<IRegisterForm>(initialRegosterForm);
  const [address, setAddress] = useState<addressType>(initialAddress);
  const [stripeDetails, setStripeDetails] = useState<IStripeDetails>({
    stripe_account_number: initialRegosterForm.stripe.stripe_account_number,
    stripe_currency: initialRegosterForm.stripe.stripe_currency,
    stripe_company_name: initialRegosterForm.stripe.stripe_company_name,
    stripe_country: initialRegosterForm.stripe.stripe_country,
    stripe_routing_number: initialRegosterForm.stripe.stripe_routing_number,
    ssn_last4: initialRegosterForm.stripe.ssn_last4,
  });

  const [ccList, setCcList] = useState<
    {
      country: string;
      countryCode: string;
      currencyCode: string;
      name?: string;
    }[]
  >([]);

  useEffect(() => {
    const newClist = ccjson.map(language => {
      const name = language.country;
      return {...language, name};
    });
    setCcList(newClist);
  }, [ccjson]);

  const [selectedCountry, setSelectedCountry] = useState<{
    country: string;
    countryCode: string;
    currencyCode: string;
    name: string;
  } | null>(null);

  const [stripeRegisterForm, setStripeRegisterForm] = useState<IStripeRegister>(
    {
      account_number: '',
      country: '',
      address: {city: '', country: '', line1: '', postal_code: '', state: ''},
      currency: '',
      dob: {day: '', month: '', year: ''},
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      routing_number: '',
      ssn_last_4: '',
    },
  );

  useEffect(() => {
    const dobsplited = registerForm.birth_year.split('-');
    const dob = {
      year: dobsplited[0],
      month: dobsplited[1],
      day: dobsplited[2],
    };
    setStripeRegisterForm({
      ...stripeRegisterForm,
      dob: dob,
      email: registerForm.email,
      first_name: registerForm.first_name,
      last_name: registerForm.last_name,
      phone_number: registerForm.phone_number,
      address: {
        city: registerForm.address.city,
        country: registerForm.address.country,
        postal_code: registerForm.address.postcode,
        line1: `${registerForm.address.street} ${registerForm.address.buildingnumber}`,
        state: registerForm.address.state,
      },
      account_number: stripeDetails.stripe_account_number,
      routing_number: stripeDetails.stripe_routing_number,
      ssn_last_4: stripeDetails.ssn_last4,
    });
  }, [registerForm, stripeDetails]);

  //#region effects

  useEffect(() => {
    if (selectedCountry) {
      setStripeDetails({
        ...stripeDetails,
        stripe_country: selectedCountry.countryCode,
        stripe_currency: selectedCountry.currencyCode,
      });
      setAddress({...address, country: selectedCountry?.country});
      setStripeRegisterForm({
        ...stripeRegisterForm,
        country: selectedCountry.countryCode,
        currency: selectedCountry.currencyCode,
      });
      setStripeDetails({
        ...stripeDetails,
        stripe_currency: selectedCountry.country,
        stripe_country: selectedCountry.countryCode,
      });
    }
  }, [selectedCountry]);
  const {succes, error, data} = useAppSelector(state => state.stripe);

  useEffect(() => {}, [data]);

  useEffect(() => {
    if (regState.error) {
      Alert.alert(
        'Hey There!',
        regState.error + ', Try Again from the begining.',
        [
          {
            text: 'Ok',
            onPress: async () => {
              dispatch(cleanUpRegister());
              setStep(0);
            },
          },
        ],
      );
    }
    if (regState.succes === true) {
      navigation.navigate('Login');
      dispatch(cleanUpRegister());
    }
  }, [regState]);

  useEffect(() => {
    setRegisterForm({...registerForm, address});
  }, [address]);

  useEffect(() => {
    if (registerForm.password === registerForm.confirmPassword)
      setisPasswordMatch(true);
    else setisPasswordMatch(false);
    return () => {};
  }, [registerForm.password, registerForm.confirmPassword]);

  useEffect(() => {
    if (subName !== null) {
      setRegisterForm({...registerForm, userRole: subName});
    }
  }, [subName]);
  //#endregion

  //#region Private Methods
  const increment = () => {
    switch (step) {
      case 0:
        selected || selected === 0
          ? setStep(1)
          : Alert.alert(
              'Validataion',
              'You have to choose type of your account first ',
            );
        return;
      case 1:
        return setStep(2);
      case 2:
        return setStep(3);
      case 3:
        return;
      default:
        break;
    }
  };
  const decrement = () => {
    switch (step) {
      case 0:
        return;
      case 1:
        return setStep(0);
      case 2:
        return setStep(1);
      case 3:
        return setStep(2);
      default:
        break;
    }
  };
  //#endregion

  async function registerFunction() {
    if (isPasswordMatch) {
      dispatch(registerThunk(registerForm));
    } else if (selected === null) {
      setStep(3);
    } else {
      setStep(1);
    }
  }

  const ref = useRef<TextInput>(null);

  return (
    <KeyboardAwareScrollView
      style={{height: height}}
      scrollEnabled={false}
      keyboardShouldPersistTaps="always">
      <LoggedOutBackground>
        {!isLoading ? (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="always">
            <Text style={[Textstyles.text, styles.title, {marginLeft: 20}]}>
              {step === 0 ? 'Sign Up.' : 'Add your data'}
            </Text>
            {step === 0 && (
              <Subscryptions
                selected={selected}
                setSelected={setSelected}
                setSubName={setSubName}
              />
            )}
            {step === 1 && (
              <>
                <TextInputCustom
                  placeholder="first_name"
                  onChange={setRegisterForm}
                  name="first_name"
                  state={registerForm}
                  value={registerForm.first_name}
                />
                <TextInputCustom
                  placeholder="last_name"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="last_name"
                  value={registerForm.last_name}
                />
                <TextInputCustom
                  placeholder="email"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="email"
                  value={registerForm.email}
                />
                <TextInputCustom
                  placeholder="name"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="name"
                  value={registerForm.name}
                />
              </>
            )}
            {step === 2 && (
              <>
                <TextInputCustom
                  placeholder="phone_number"
                  onChange={setRegisterForm}
                  name="phone_number"
                  state={registerForm}
                  value={registerForm.phone_number}
                />
                <TextInputCustom
                  placeholder="birth day (yyyy-mm-dd)"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="birth_year"
                  value={registerForm.birth_year}
                />
                <TextInputCustom
                  isSecure
                  placeholder="password"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="password"
                  value={registerForm.password}
                />
                {!isPasswordMatch && (
                  <Text style={{color: 'red'}}>password not match</Text>
                )}
                <TextInputCustom
                  isSecure
                  placeholder="confirmPassword"
                  onChange={setRegisterForm}
                  state={registerForm}
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                />
                {!isPasswordMatch && (
                  <Text style={{color: 'red'}}>password not match</Text>
                )}
              </>
            )}
            {step === 3 && (
              <ScrollView
                horizontal
                style={{width: '100%'}}
                contentContainerStyle={{
                  width: '100%',
                  margin: 0,
                  padding: 0,
                }}
                scrollEnabled={false}
                keyboardShouldPersistTaps="always">
                <View style={{width: '100%'}}>
                  <SearchableDropdown
                    keyboardShouldPersistTaps="always"
                    onItemSelect={(item: {
                      country: string;
                      countryCode: string;
                      currencyCode: string;
                      name: string;
                    }) => {
                      setSelectedCountry(item);
                      setTimeout(() => {
                        ref.current?.focus();
                      }, 100);
                    }}
                    containerStyle={{padding: 5}}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#00000015',
                      borderColor: '#bbbbbb15',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    itemTextStyle={{color: '#fff'}}
                    itemsContainerStyle={{
                      maxHeight: 140,
                      borderRadius: 5,
                    }}
                    items={ccList}
                    defaultIndex={0}
                    resetValue={true}
                    textInputProps={{
                      value: selectedCountry?.country,
                      placeholder: 'Search for Country',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderRadius: 5,
                        width: '103%',
                        alignSelf: 'center',
                        color: '#fff',
                        backgroundColor: '#rgba(0,0,0,.15)',
                      },
                      clearTextOnFocus: true,
                      onPress: () => {
                        setSelectedCountry(null);
                      },
                      onFocused: () => {
                        setSelectedCountry(null);
                      },
                      onTextChange: (text: string) => {
                        setSelectedCountry(null);

                        if (text.length === 0) {
                          const newClist = ccjson.map(language => {
                            const name = language.country;
                            return {...language, name};
                          });
                          setCcList(newClist);
                        }
                      },
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />

                  <TextInputCustom
                    ref={ref}
                    placeholder="city"
                    onChange={setAddress}
                    state={address}
                    name="city"
                    value={address.city}
                  />
                  <TextInputCustom
                    placeholder="state"
                    onChange={setAddress}
                    state={address}
                    name="state"
                    value={address.state}
                  />
                  <TextInputCustom
                    placeholder="postcode"
                    onChange={setAddress}
                    state={address}
                    name="postcode"
                    value={address.postcode}
                  />
                  <TextInputCustom
                    placeholder="street"
                    onChange={setAddress}
                    state={address}
                    name="street"
                    value={address.street}
                  />
                  <TextInputCustom
                    placeholder="buildingnumber"
                    onChange={setAddress}
                    state={address}
                    name="buildingnumber"
                    value={address.buildingnumber}
                  />
                </View>
              </ScrollView>
            )}

            <View style={{marginHorizontal: 20}}>
              <View style={styles.DumbContainer}>
                {step === 3 && (
                  <TouchableOpacity
                    style={styles.LoginButton}
                    onPress={registerFunction}>
                    <Text style={styles.textButton}>Register</Text>
                  </TouchableOpacity>
                )}
                {step !== 3 && (
                  <TouchableOpacity
                    style={styles.LoginButton}
                    onPress={increment}>
                    <Text style={styles.textButton}>Next</Text>
                  </TouchableOpacity>
                )}
                {step !== 0 && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={decrement}>
                    <Text
                      style={[
                        styles.textButton,
                        {textTransform: 'capitalize'},
                      ]}>
                      back
                    </Text>
                  </TouchableOpacity>
                )}
                {step === 0 && (
                  <View style={styles.emptyContainerButton}></View>
                )}
              </View>
              <TouchableOpacity
                style={styles.redirectButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[Textstyles.text, styles.textRedirect]}>
                  Already have an account?{'\n'} Click there.
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner
              // style={styles.spinner}
              isVisible={isLoading}
              size={100}
              type={'ThreeBounce'}
              color={'#EA3651'}
            />
          </View>
        )}
      </LoggedOutBackground>
    </KeyboardAwareScrollView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    widths: '100%',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginVertical: 20,
  },
  LoginButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#EA3651',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 10,

    marginHorizontal: 10,
    width: '45%',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgb(80,80,80)',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,

    marginHorizontal: 10,
    width: '45%',
  },
  emptyContainerButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,

    marginHorizontal: 10,
    width: '45%',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
  },
  DumbContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  textRedirect: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
  redirectButton: {
    alignItems: 'center',
    marginVertical: 15,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    height: 50,
  },
  input: {
    flex: 1,
    borderRadius: 0,
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    height: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 20,
    left: 0,
  },
});
