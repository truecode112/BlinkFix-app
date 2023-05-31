import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Linking,
} from 'react-native';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {cleanUpLogin, setAuthState} from '../../redux/Auth/loginReducer';
import {useNavigation} from '@react-navigation/native';
import MenuButtonsList from '../SideMenu/MenuButtonsList';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import icons from '../../assets/SocialMediaIcons/socials';
import {Sociallinks} from '../../static/socialsLinks';

const LoggedInBackground = ({
  children,
  stickyButton,
  disabledScroll,
  notGoingBack,
  withIcons,
  withoutBottom,
}: {
  children?: ReactNode;
  disabledScroll?: boolean;
  stickyButton?: () => JSX.Element;
  notGoingBack?: boolean;
  withoutBottom?: boolean;
  withIcons?: boolean;
}) => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: !isMenuOpen
            ? withTiming(offset.value, {duration: 200})
            : withDelay(300, offset.value),
        },
      ],
    };
  });

  const navigation = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dim = Dimensions.get('screen');

  const {width, height} = useWindowDimensions();
  useEffect(() => {
    if (!isMenuOpen) {
      offset.value = width;
    } else {
      offset.value = 0;
    }
  }, [isMenuOpen]);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  const scrollref = useRef<ScrollView>(null);

  const getWebUrl = (appname: string): string => {
    switch (appname) {
      case 'instagram':
        return Sociallinks.instagram;
      case 'fb':
        return Sociallinks.facebook;
        return '';
      case 'linkedin':
        return Sociallinks.linkedin;
        return '';
      case 'twitter':
        return Sociallinks.twitter;
        return '';
      case 'youtube':
        return Sociallinks.youtube;
        return '';
      case 'snapchat':
        return Sociallinks.snapchat;
        return '';
      case 'tiktok':
        return Sociallinks.tiktok;
        return '';

      default:
        return '';
    }
  };
  const openAppStore = async (appId: string) => {
    const url = `itms-apps://itunes.apple.com/app/id${appId}`;

    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening App Store:', error);
    }
  };

  const getAppstoreId = (appname: string): string => {
    switch (appname) {
      case 'instagram':
        return Sociallinks.idInstagram;
      case 'fb':
        return Sociallinks.idFacebook;
      case 'linkedin':
        return Sociallinks.idLinkedIn;
      case 'twitter':
        return Sociallinks.idTwitter;
      case 'youtube':
        return Sociallinks.idYouTube;
      case 'snapchat':
        return Sociallinks.idSnapchat;
      case 'tiktok':
        return Sociallinks.idTikTok;
      default:
        return '';
    }
  };

  const openApp = (appUrl: string) => {
    const appname = appUrl.toLowerCase().split(':')[0];
    Linking.canOpenURL(appUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            `${appname.toString()} is not available`,
            'download app or use browser',
            [
              {
                text: 'go to store',
                onPress: async () => {
                  await openAppStore(getAppstoreId(appname));
                },
              },
              {
                text: 'open web',
                onPress: () => {
                  Linking.openURL(getWebUrl(appname));
                },
              },
              {text: 'cancel', onPress: () => {}, style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else {
          return Linking.openURL(appUrl);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const {cartItems} = useAppSelector(state => state.ShoppingCart);

  const [isRedCircleVisible, setIsRedCircleVisible] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setIsRedCircleVisible(false);
    if (cartItemsCount !== 0) {
      setIsRedCircleVisible(true);
    }
  }, [cartItemsCount]);

  useEffect(() => {
    let countArr = cartItems
      ? cartItems.map(cartItem => cartItem.orderItems.length)
      : [];
    const sum = countArr ? countArr.reduce((sum, item) => sum + item, 0) : 0;
    setCartItemsCount(sum);
  }, [cartItems]);

  const newLocal = require('../../../src/assets/background.png');
  return (
    <ImageBackground style={styles.loggedOutBackground} source={newLocal}>
      <SafeAreaView style={styles.mainContainer}>
        {/*  */}
        <Animated.View
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            setContainerHeight(height);
          }}
          style={[
            {
              maxHeight: dim.height * (withoutBottom ? 1 : 0.95),
              position: 'absolute',
              width: '100%',
              zIndex: 999,
              top: 0,
              bottom: 0,
              backgroundColor: '#00000025',
            },
            animatedStyles,
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              marginBottom: withoutBottom ? 0 : 50,
              paddingRight: 20,
              marginTop: '25%',
            }}>
            <View>
              {scrollEnabled && (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ea3651',
                    width: 50,
                    aspectRatio: 1,
                    position: 'absolute',
                    alignSelf: 'center',
                    zIndex: 100,
                    bottom: 0,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    scrollref.current?.scrollToEnd({animated: true});
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 20,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      transform: [{rotateX: '180deg'}],
                    }}
                    source={require('../../assets/utilityIcons/arrowup.png')}
                  />
                </TouchableOpacity>
              )}
              <ScrollView
                ref={scrollref}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={contentHeight => {
                  if (contentHeight > containerHeight) {
                    setScrollEnabled(true);
                  } else {
                    setScrollEnabled(false);
                  }
                }}
                style={{
                  overflow: 'hidden',
                }}
                contentContainerStyle={{
                  height: dim.height,
                }}>
                <MenuButtonsList
                  numberOfCartItems={cartItemsCount}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  offset={offset}
                />
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.logoFull}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                zIndex: 1000,
                position: 'absolute',
                top: 0,
                left: 10,
                display: notGoingBack ? 'none' : 'flex',
              }}>
              <Image
                style={{height: 40, width: 40}}
                source={require('../../assets/utilityIcons/BackArrow.png')}
              />
            </TouchableOpacity>
          )}
          <View style={{width: '100%'}}>
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                alignSelf: 'center',
                maxHeight: 50,
                maxWidth: width - 100,
              }}
              source={require('../../assets/BLINKFIX.png')}
            />
          </View>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              zIndex: 1000,
              position: 'absolute',
              top: 0,
              right: 10,
            }}
            onPress={() => {
              setIsMenuOpen(!isMenuOpen);
            }}>
            <Image
              source={
                isMenuOpen
                  ? require('../../assets/utilityIcons/menuIcons/menuOpen.png')
                  : require('../../assets/utilityIcons/menuIcons/menuClose.png')
              }
            />
            {isRedCircleVisible && (
              <View
                style={{
                  position: 'absolute',
                  width: 10,
                  borderRadius: 10,
                  height: 10,
                  top: 10,
                  right: 8,
                  backgroundColor: '#ea3651',
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <>
          {withIcons && (
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  // Alert.alert('instagram');
                  openApp(Sociallinks.appinstagram);
                }}>
                <Image
                  style={{width: 40, height: 40}}
                  source={icons.instagram}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  // Alert.alert('facebook');
                  openApp(Sociallinks.appfacebook);
                }}>
                <Image
                  style={{width: 40, height: 40}}
                  source={icons.facebook}
                />
              </TouchableOpacity>
              <TouchableOpacity // linkedin
                activeOpacity={1}
                onPress={() => {
                  // Alert.alert('linkedin');
                  openApp(Sociallinks.applinkedin);
                }}>
                <Image
                  style={{width: 40, height: 40}}
                  source={icons.linkedin}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  openApp(Sociallinks.apptwitter);

                  // Alert.alert('twitter');
                }}>
                <Image style={{width: 40, height: 40}} source={icons.twitter} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  openApp(Sociallinks.appyoutube);

                  // Alert.alert('youtube');
                }}>
                <Image style={{width: 40, height: 40}} source={icons.youtube} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  // Alert.alert('snapchat');
                  openApp(Sociallinks.appsnapchat);
                }}>
                <Image
                  style={{width: 40, height: 40}}
                  source={icons.snapchat}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  openApp(Sociallinks.apptiktok);
                  // Alert.alert('tiktok');
                }}>
                <Image style={{width: 40, height: 40}} source={icons.tiktok} />
              </TouchableOpacity>
            </View>
          )}
        </>

        <KeyboardAvoidingView
          style={[
            styles.innerContainer,
            {marginBottom: !withoutBottom ? 50 : 0},
          ]}>
          <ScrollView
            scrollEventThrottle={16}
            style={{
              width: '100%',
            }}
            keyboardShouldPersistTaps={'always'}
            scrollEnabled={disabledScroll}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              paddingBottom: withoutBottom ? 0 : -150,
            }}>
            {children ? children : <Text>hello</Text>}
          </ScrollView>
          {stickyButton && (
            <View
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                margin: 5,
                bottom: 10,
                right: 10,
                borderRadius: 500,
                overflow: 'hidden',
              }}>
              {stickyButton()}
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoggedInBackground;
const styles = StyleSheet.create({
  loggedOutBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    zIndex: 1000,
  },
  logoFull: {
    maxHeight: 30,
    width: '100%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },

  innerContainer: {
    width: '98%',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
