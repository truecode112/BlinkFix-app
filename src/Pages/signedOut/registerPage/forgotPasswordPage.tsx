import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedOutBackground from '../../../components/background/loggedOutBackground';
import {TextInput} from 'react-native-gesture-handler';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenProp} from '../../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  cleanUpResetPasswordrequest,
  requestResetPassword,
} from '../../../redux/Auth/resetPasswordReducer';

const ForgotPasswordPage = () => {
  const navigation = useNavigation<AuthScreenProp>();
  const dispatch = useAppDispatch();

  const emailref = useRef<TextInput>(null);

  const regex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
  );
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [email, setEmail] = useState('');

  const {succes, data, error} = useAppSelector(state => state.forgot);

  useEffect(() => {
    if (succes) {
      navigation.push('ResetPassword');
      dispatch(cleanUpResetPasswordrequest());
    }
  }, [succes]);

  return (
    <LoggedOutBackground style={{maxHeight: '50%'}} backButton>
      <View
        style={{
          height: '80%',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={[styles.title, {}]}>Forgot password?</Text>
          <View style={{}}>
            <Text style={styles.text}>Email</Text>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: '#00000010',
                borderRadius: 5,
                borderColor: isEmailValid ? 'transparent' : 'red',
                borderWidth: 1,
              }}>
              <TextInput
                value={email}
                ref={emailref}
                textContentType="emailAddress"
                placeholder="type your email address"
                style={{
                  fontFamily: 'Handlee-Regular',
                  color: '#fff',
                  fontSize: 17,
                }}
                onChangeText={text => {
                  setEmail(text);
                  const test = regex.test(text);
                  setIsEmailValid(test);
                }}
              />
            </View>
          </View>
        </View>
        <SubmitButton
          title="Send Reset Password Request"
          onPress={() => {
            if (email.length !== 0 && isEmailValid) {
              dispatch(requestResetPassword(email));
            } else {
              if (emailref) emailref.current?.focus();
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}>
          <Text style={[styles.text, {alignSelf: 'center'}]}>
            I Already have code
          </Text>
        </TouchableOpacity>
      </View>
    </LoggedOutBackground>
  );
};

export default ForgotPasswordPage;

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
});
