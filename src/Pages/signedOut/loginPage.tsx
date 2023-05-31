import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LoggedOutBackground from '../../components/background/loggedOutBackground';
import {TextInputCustom} from '../../components/TextInputs';
import {ILoginForm, initialLoginForm} from '../../redux/Auth/AuthTypes';
import {useEffect} from 'react';
import {loginThunk} from '../../redux/Auth/thunks';
import {
  cleanUpLogin,
  getAuthStateState,
  getLoginErrors,
  setAuthState,
  setAuthStatus,
} from '../../redux/Auth/loginReducer';
import Spinner from 'react-native-spinkit';
import * as Keychain from 'react-native-keychain';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenProp} from '../../navigation/types';
import {useAppDispatch} from '../../redux/hooks';
import {Textstyles} from '../signedIn/menupages/contact';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WebView} from 'react-native-webview';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthScreenProp>();
  const [loginForm, setLoginForm] = useState<ILoginForm>(initialLoginForm);
  const loginState = getAuthStateState();
  const errors = getLoginErrors();
  useEffect(() => {
    (async function () {
      try {
        await Keychain.getGenericPassword().then(data => {
          if (data) {
            const v = data.password;
            const jwt = JSON.parse(v);
            dispatch(setAuthState(jwt));
            dispatch(setAuthStatus(true));
          } else {
            dispatch(cleanUpLogin());
            dispatch(setAuthStatus(false));
          }
        });
      } catch (error) {
        dispatch(setAuthStatus(false));
        dispatch(cleanUpLogin());
      }
    })();
  }, []);

  const LoginFunc = () => {
    dispatch(loginThunk(loginForm));
  };
  return (
    // <WebView
    //   source={{uri: 'https://reactnative.dev/'}}
    //   style={{flex: 1, marginTop: 60}}
    // />
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled>
      <LoggedOutBackground>
        {/* < */}

        {loginState === true ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner
              // style={styles.spinner}
              isVisible={loginState}
              size={70}
              type={'ThreeBounce'}
              color={'#EA3651'}
            />
          </View>
        ) : (
          <>
            <Text
              style={[
                Textstyles.text,
                Textstyles.title,
                styles.title,
                {marginLeft: 20},
              ]}>
              Sign in.
            </Text>
            <TextInputCustom
              placeholder="e-mail addres"
              onChange={setLoginForm}
              name="email"
              state={loginForm}
              value={loginForm.email}
            />
            <TextInputCustom
              placeholder="password"
              onChange={setLoginForm}
              state={loginForm}
              name="password"
              isSecure={true}
              value={loginForm.password}
            />
            {errors && (
              <Text style={[Textstyles.text, {alignSelf: 'center'}]}>
                {errors}
              </Text>
            )}
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}>
              <Text style={[Textstyles.text, styles.textButton]}>
                Forgot your password? Click there.
              </Text>
            </TouchableOpacity>
            <View style={styles.DumbContainer}>
              <TouchableOpacity style={styles.LoginButton} onPress={LoginFunc}>
                <Text style={[Textstyles.text, styles.textButton]}>Login</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.redirectButton}
              onPress={() => navigation.navigate('Register')}>
              <Text style={[Textstyles.text, styles.textRedirect]}>
                Do not have an account?{'\n'} Click there to sign up.
              </Text>
            </TouchableOpacity>
          </>
        )}
      </LoggedOutBackground>
    </KeyboardAwareScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    widths: '100%',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
  },
  LoginButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#EA3651',
    width: '50%',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  DumbContainer: {
    alignItems: 'flex-end',
  },
  forgotButton: {
    alignItems: 'center',
    marginVertical: 5,
  },
  textRedirect: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  redirectButton: {
    alignItems: 'center',
    marginVertical: 15,
  },
});
