import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenProp} from '../../navigation/types';

const LoggedOutBackground = ({
  children,
  style,
  backButton,
}: {
  children?: ReactNode;
  style?: ViewStyle;
  backButton?: boolean;
}) => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<AuthScreenProp>();
  return (
    <View style={[styles.mainContainer, {height}]}>
      <ImageBackground
        style={styles.loggedOutBackground}
        source={require('../../../src/assets/background.png')}>
        <Image
          style={styles.logoFull}
          source={require('../../assets/BLINKFIX.png')}
        />

        {backButton && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{zIndex: 100, position: 'absolute', top: 50, left: 10}}>
            <Image
              style={{height: 40, width: 40}}
              source={require('../../assets/utilityIcons/BackArrow.png')}
            />
          </TouchableOpacity>
        )}
        <KeyboardAvoidingView style={[styles.innerContainer, style]}>
          <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              width: '100%',
            }}
            keyboardShouldPersistTaps="always">
            {children ? children : <Text>hello</Text>}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default LoggedOutBackground;
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
    position: 'relative',
  },
  logoFull: {
    width: '70%',
    height: 100,
    resizeMode: 'contain',
    top: 20,
    marginBottom: '10%',
  },
  innerContainer: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    width: '95%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: '50%',
    flex: 0.7,
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
