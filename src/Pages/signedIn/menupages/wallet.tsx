import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LoggedInBackground from '../../../components/background/loggedInBackground';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  createNewWallet,
  getMyWallet,
} from '../../../redux/Profile/wallet/wallet.thunks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import TipProvider, {showTip, Tip} from 'react-native-tip';
import Clipboard from '@react-native-clipboard/clipboard';
import Spinner from 'react-native-spinkit';
import {Textstyles} from './contact';
import {HomePageScreenProp} from '../../../navigation/types';
import {cleanUpWalletRequests} from '../../../redux/Profile/wallet/walet.slice';
import {cleanUpCreateStripeAccount} from '../../../redux/Order/Order/stripe/CreateStripeAccount.slice';

const Wallet = () => {
  const navigation = useNavigation<HomePageScreenProp>();
  const walletData = useAppSelector(state => state.wallet);
  const transactions = walletData?.data?.transactions;
  const [_showTip, setShowTip] = useState(false);
  const dispatch = useAppDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getMyWallet());
    }, []),
  );

  useEffect(() => {
    setIsLoading(false);
    if (walletData?.error && walletData?.error === 'Wallet not found') {
      dispatch(createNewWallet());
      dispatch(cleanUpWalletRequests());
    }
  }, [walletData]);

  const copyToClipboard = (text: string | undefined) => {
    if (text) return Clipboard.setString(text);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowTip(false);
    }, 700);
  }, [_showTip]);

  const [isLoading, setIsLoading] = useState(true);
  return (
    <LoggedInBackground withoutBottom>
      <>
        {isLoading === false && walletData?.error !== null && (
          <>
            <Text
              style={[
                Textstyles.text,
                Textstyles.title,
                {textAlign: 'center'},
              ]}>
              {walletData?.error}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(cleanUpCreateStripeAccount());
                navigation.navigate('stripeAccountcreate');
              }}>
              <Text style={[styles.text, {color: '#ffffff95'}]}>
                If you want to fix it now, click there.
              </Text>
            </TouchableOpacity>
          </>
        )}
        {walletData && walletData?.data && !isLoading && !walletData?.error && (
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                const test = copyToClipboard(walletData?.data?._id);
                setShowTip(true);
              }}>
              <View
                style={{
                  backgroundColor: '#EA3651',
                  width: '100%',
                  aspectRatio: 1.8,
                  borderRadius: 15,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                <Image
                  source={require('../../../assets/paper/slash.png')}
                  style={{
                    height: '100%',
                    position: 'absolute',
                    resizeMode: 'contain',
                    width: '100%',
                    top: 0,
                    bottom: 0,
                    left: 50,
                    right: 0,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontFamily: 'Handlee-Regular',
                    paddingRight: 30,
                    paddingBottom: 30,
                  }}>
                  {walletData?.data?._id}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontFamily: 'Handlee-Regular',
                    paddingRight: 30,
                    paddingBottom: 30,
                    position: 'absolute',
                    top: 20,
                    right: 0,
                  }}>
                  {walletData?.data?.currency}{' '}
                  {walletData?.data?.balance.availableBalance} {'( '}
                  {walletData?.data?.balance.pendingBalance}
                  {`${walletData?.data?.currency} pending )`}
                </Text>

                {_showTip && (
                  <Tip
                    id="heart"
                    title="Do you liked it?"
                    body="Remember to hit the heart if you enjoyed the content"
                    showItemPulseAnimation
                    pulseColor="#ff8080"
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    overlayOpacity={0.5}
                    active={false}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowTip(false);
                      }}
                      style={{padding: 10, borderRadius: 50}}>
                      <View
                        style={{
                          position: 'absolute',
                          paddingVertical: 10,
                          paddingHorizontal: 40,
                          backgroundColor: '#fff',
                          borderRadius: 15,
                          alignSelf: 'center',
                          left: '20%',
                        }}>
                        <Text>Copied number</Text>
                      </View>
                    </TouchableOpacity>
                  </Tip>
                )}
              </View>
            </TouchableOpacity>

            {transactions && (
              <View>
                {transactions?.map(transaction => {
                  const transactionDate = new Date(transaction.transferAt);
                  return (
                    <View key={transaction._id} style={styles.transaction}>
                      <Text style={styles.text}>
                        {transactionDate.toLocaleDateString()}{' '}
                        {transactionDate.toLocaleTimeString()}
                      </Text>
                      <Text style={styles.text}>
                        {transaction.type} transaction:{' '}
                        {walletData?.data?.currency} {transaction.amount}
                      </Text>
                      <Text style={styles.text}>{transaction.description}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
        {isLoading && (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner type="Circle" color="#ea3651" />
          </View>
        )}
      </>
    </LoggedInBackground>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Handlee-Regular',
    textTransform: 'capitalize',
  },
  transaction: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
});
