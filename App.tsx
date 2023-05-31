/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';

import AuthNavigation from './src/navigation/auth/authNavigation';
import {StatusBar, LogBox, Linking} from 'react-native';
import {getStatus} from './src/redux/Auth/loginReducer';
import './src/redux/interceptors';
import {StripeProvider} from '@stripe/stripe-react-native';
import {EventProvider} from 'react-native-outside-press';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getLocalStorageLanguage,
  setLocalStorageLanguage,
} from './src/utils/localStorage';
import * as RNLocalize from 'react-native-localize';
import {useAppDispatch} from './src/redux/hooks';
import {setLanguage} from './src/redux/App/setup.slice';

const App = () => {
  const authSucces = getStatus();

  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const language = await getLocalStorageLanguage();
      if (!language) {
        const newLang = RNLocalize.getLocales()[0].languageCode;
        await setLocalStorageLanguage(newLang);
        dispatch(setLanguage(newLang));
      } else {
        dispatch(setLanguage(language));
      }
    })();
  }, []);

  return (
    <>
      <EventProvider style={{flex: 1}}>
        <StripeProvider
          publishableKey="pk_test_51KEGezEn6xUPj18MtUQIUTrP4GpPySC5MLphN98WScc3sA1UV6nKSEYvVipch7l9dlNlaBiQl4AwomCmcscoXRKg00lDIcg5HP"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.me.fix.blink" // required for Apple Pay
        >
          <AuthNavigation isAuth={authSucces} />
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'rgba(0,0,0,0.15)'}
          />
        </StripeProvider>
      </EventProvider>
    </>
  );
};

export default App;
