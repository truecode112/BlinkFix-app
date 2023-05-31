import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {TextInputCustom} from '../../../components/TextInputs';
import {
  initialRegosterForm,
  IStripeDetails,
  IStripeRegister,
} from '../../../redux/Auth/AuthTypes';
import {Textstyles} from './contact';
import SubmitButton from '../../../components/touchables/SubmitButton';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetEstablishment} from '../../../redux/Order/order.thunk';
import {getMyProfile} from '../../../redux/Profile/core/profileCore.thunk';
import {HomePageScreenProp} from '../../../navigation/types';
import {
  CreateStripeAccount,
  IRequestStripeCreate,
} from '../../../redux/Order/Order/stripe/createStripeAccount.thunk';
import {cleanUpCreateStripeAccount} from '../../../redux/Order/Order/stripe/CreateStripeAccount.slice';
import {getStripeAccountLink} from '../../../redux/Auth/AuthStripeLink.thunk';
import WebView from 'react-native-webview';

const StripeCreate = () => {
  const navigation = useNavigation<HomePageScreenProp>();
  const [stripeDetails, setStripeDetails] = useState<IRequestStripeCreate>({
    countryCode: initialRegosterForm.stripe.stripe_country,
    account_number: initialRegosterForm.stripe.stripe_account_number,
    currency: initialRegosterForm.stripe.stripe_currency,
    ssn_last_4: initialRegosterForm.stripe.stripe_routing_number,
    routing_number: initialRegosterForm.stripe.ssn_last4,
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.profile.data);
  const StripeLink = useAppSelector(state => state.registerStripeLink.data);
  const stripeAccountId = user?.stripe_id;

  useEffect(() => {
    if (stripeAccountId) dispatch(getStripeAccountLink(stripeAccountId));
  }, [stripeAccountId]);

  useEffect(() => {
    if (!StripeLink) {
      if (stripeAccountId) dispatch(getStripeAccountLink(stripeAccountId));
    }
  }, [StripeLink]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyProfile());
    }, []),
  );

  const {width, height} = useWindowDimensions();
  const mainRef = useRef<WebView>(null);

  const script = `
    var element = document.querySelector('[data-test-id="return-to-platform-link"]');

    // Do something with the element
    if (element) {
      element.style.display = 'none';
    }


  var elements = document.getElementsByTagName('*');
    // Loop through all the elements and set their background color to transparent
    setTimeout(()=>{

      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = 'transparent';
        elements[i].style.color = '#fff';
      }
    },1000)
`;
  const [isFinished, setIsFinished] = useState(false);
  return (
    <LoggedInBackground withoutBottom>
      {/*  */}
      {!isFinished && StripeLink?.url ? (
        <WebView
          ref={mainRef}
          source={{uri: StripeLink.url}}
          onLoadEnd={() => {
            mainRef.current?.injectJavaScript(script);
          }}
          style={[
            styles.video,
            {
              width: width,
              maxHeight: height - 50,
              backgroundColor: 'transparent',
            },
          ]}
        />
      ) : (
        <Text>Loading</Text>
      )}
    </LoggedInBackground>
  );
};

export default StripeCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  video: {
    marginTop: 0,
  },
});
