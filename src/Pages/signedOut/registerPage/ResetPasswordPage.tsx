import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedOutBackground from '../../../components/background/loggedOutBackground';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenProp} from '../../../navigation/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  cleanUpResetPasswordrequest,
  responseResetPassword,
} from '../../../redux/Auth/resetPasswordReducer';

const ResetPasswordPage = () => {
  const navigation = useNavigation<AuthScreenProp>();

  const inputref1 = useRef<TextInput>(null);
  const inputref2 = useRef<TextInput>(null);
  const inputref3 = useRef<TextInput>(null);
  const inputref4 = useRef<TextInput>(null);
  const inputref5 = useRef<TextInput>(null);
  const inputref6 = useRef<TextInput>(null);
  const inputrefpassword = useRef<TextInput>(null);

  const [passwordsForm, setPasswordsForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const isPasswordsMatch = (): boolean => {
    if (passwordsForm.confirmPassword === passwordsForm.password) {
      return true;
    } else return false;
  };

  const [codeArray, setcodeArray] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [resetPasswordForm, setResetPasswordForm] = useState({
    resetCode: '',
    password: '',
    confirmPassword: '',
  });

  const [stringCode, setStringCode] = useState<string>('');
  useEffect(() => {
    const joined = codeArray.join('');
    setStringCode(joined);
  }, [codeArray]);

  useEffect(() => {
    setResetPasswordForm({
      ...resetPasswordForm,
      resetCode: stringCode,
      password: passwordsForm.password,
      confirmPassword: passwordsForm.confirmPassword,
    });
  }, [stringCode, passwordsForm]);
  const dispatch = useAppDispatch();

  const {data, succes, error, message} = useAppSelector(state => state.forgot);

  useEffect(() => {
    if (message === 'Password changed successfully') {
      Alert.alert('success', 'Password changed successfully');
      dispatch(cleanUpResetPasswordrequest());
      navigation.navigate('Login');
    }
  }, [data, succes, message]);

  const cleanAndNavigate = () => {
    dispatch(cleanUpResetPasswordrequest());
    navigation.navigate('ForgotPassword');
  };
  useEffect(() => {
    if (error) {
      if (error === 'resetCodeFromDb undefined does not exist') {
        Alert.alert('error', 'Reset code is not up to date', [
          {text: 'OK', onPress: () => cleanAndNavigate()},
        ]);
      } else {
        Alert.alert('error', error, [
          {
            onPress: () => {
              dispatch(cleanUpResetPasswordrequest());
            },
          },
        ]);
      }
    }
  }, [error]);
  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      keyboardShouldPersistTaps="always">
      <LoggedOutBackground style={{maxHeight: '50%'}} backButton>
        <View
          style={{
            height: '80%',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <ScrollView>
            <Text style={[styles.title, {}]}>Forgot password?</Text>
            <ScrollView style={{maxHeight: '80%'}}>
              <Text style={styles.text}>Reset Code</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#00000010',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  }}>
                  <TextInput
                    ref={inputref1}
                    style={[
                      styles.input,
                      {aspectRatio: 1, textAlign: 'center'},
                    ]}
                    value={codeArray[0]}
                    keyboardType="phone-pad"
                    clearTextOnFocus
                    onChangeText={text => {
                      const newArray = [...codeArray];
                      newArray[0] = text;
                      setcodeArray(newArray);
                      if (text.length === 1 && inputref2.current) {
                        inputref2.current.focus();
                      }
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#00000010',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  }}>
                  <TextInput
                    ref={inputref2}
                    style={[
                      styles.input,
                      {aspectRatio: 1, textAlign: 'center'},
                    ]}
                    keyboardType="phone-pad"
                    value={codeArray[1]}
                    clearTextOnFocus
                    onChangeText={text => {
                      const newArray = [...codeArray];
                      newArray[1] = text;
                      setcodeArray(newArray);
                      if (text.length === 1 && inputref3.current) {
                        inputref3.current.focus();
                      }
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#00000010',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  }}>
                  <TextInput
                    ref={inputref3}
                    style={[
                      styles.input,
                      {aspectRatio: 1, textAlign: 'center'},
                    ]}
                    keyboardType="phone-pad"
                    value={codeArray[2]}
                    clearTextOnFocus
                    onChangeText={text => {
                      const newArray = [...codeArray];
                      newArray[2] = text;
                      setcodeArray(newArray);
                      if (text.length === 1 && inputref4.current) {
                        inputref4.current.focus();
                      }
                    }}
                  />
                </View>
                <Text style={styles.text}>-</Text>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#00000010',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  }}>
                  <TextInput
                    ref={inputref4}
                    style={[
                      styles.input,
                      {aspectRatio: 1, textAlign: 'center'},
                    ]}
                    keyboardType="phone-pad"
                    value={codeArray[3]}
                    clearTextOnFocus
                    onChangeText={text => {
                      const newArray = [...codeArray];
                      newArray[3] = text;
                      setcodeArray(newArray);
                      if (text.length === 1 && inputref5.current) {
                        inputref5.current.focus();
                      }
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#00000010',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  }}>
                  <TextInput
                    ref={inputref5}
                    style={[
                      styles.input,
                      {aspectRatio: 1, textAlign: 'center'},
                    ]}
                    keyboardType="phone-pad"
                    value={codeArray[4]}
                    clearTextOnFocus
                    onChangeText={text => {
                      const newArray = [...codeArray];
                      newArray[4] = text;
                      setcodeArray(newArray);
                      if (text.length === 1 && inputref6.current) {
                        inputref6.current.focus();
                      }
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#00000010',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  }}>
                  <TextInput
                    ref={inputref6}
                    style={[
                      styles.input,
                      {aspectRatio: 1, textAlign: 'center'},
                    ]}
                    keyboardType="phone-pad"
                    value={codeArray[5]}
                    clearTextOnFocus
                    onChangeText={text => {
                      const newArray = [...codeArray];
                      newArray[5] = text;
                      setcodeArray(newArray);
                      if (text.length === 1) {
                        inputrefpassword.current?.focus();
                      }
                    }}
                  />
                </View>
              </View>
              <Text style={styles.text}>Password</Text>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  backgroundColor: '#00000010',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: isPasswordsMatch() ? 'transparent' : 'red',
                }}>
                <TextInput
                  ref={inputrefpassword}
                  secureTextEntry
                  placeholder="type password"
                  style={styles.input}
                  onChangeText={text => {
                    setPasswordsForm({...passwordsForm, password: text});
                  }}
                />
              </View>
              <Text style={styles.text}>Confirm Password</Text>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  backgroundColor: '#00000010',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: isPasswordsMatch() ? 'transparent' : 'red',
                }}>
                <TextInput
                  secureTextEntry
                  placeholder="confirm password"
                  style={styles.input}
                  onChangeText={text => {
                    setPasswordsForm({...passwordsForm, confirmPassword: text});
                  }}
                />
              </View>
            </ScrollView>
            {!isPasswordsMatch() ? (
              <Text style={styles.text}>passwords must match</Text>
            ) : (
              <Text style={styles.text}></Text>
            )}
          </ScrollView>
          <SubmitButton
            title="Change password"
            onPress={() => {
              dispatch(responseResetPassword(resetPasswordForm));
            }}
          />
        </View>
      </LoggedOutBackground>
    </KeyboardAwareScrollView>
  );
};

export default ResetPasswordPage;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'white',
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
    fontFamily: 'Handlee-Regular',
  },
  input: {
    fontFamily: 'Handlee-Regular',
    color: '#fff',
    fontSize: 17,
  },
});
