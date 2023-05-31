import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  RegisterPageNavigationProp,
  StripeLinkPageProps,
} from '../../../navigation/types';
import Spinner from 'react-native-spinkit';
import LoggedOutBackground from '../../../components/background/loggedOutBackground';

const StripeLink = () => {
  const {params} = useRoute<StripeLinkPageProps['route']>();
  const navigationToLink = useNavigation<RegisterPageNavigationProp>();

  const [isLoading, setIsLoading] = useState(false);
  const [navStateUrl, setNavStateUrl] = useState('');
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url === 'https://example.com/return') {
      //   setNavStateUrl(navState.url);
      params.onFinish
        ? params.onFinish
        : Alert.alert('success', 'successfully created stripe account');
      navigationToLink.goBack();
    }
    if (navState.url === 'http://example.com/reauth') {
      //   setNavStateUrl(navState.url);
      params.onError
        ? params.onError
        : Alert.alert(
            'failure',
            'there was an error while trying to create a new stripe account try again',
          );
      navigationToLink.goBack();
    }
  };

  return (
    <>
      {isLoading === true ? (
        <>
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              display: isLoading ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'lightGrey',
            }}>
            <Spinner color="#ea3651" isVisible={true} type={'Circle'} />
          </View>
        </>
      ) : (
        <WebView
          onNavigationStateChange={handleNavigationStateChange}
          source={{uri: params.link}}
          style={{
            marginTop: 50,
            backgroundColor: '#fff',
            // display: isLoading ? 'flex' : 'none',
          }}></WebView>
      )}
    </>
  );
};

export default StripeLink;

const styles = StyleSheet.create({});
