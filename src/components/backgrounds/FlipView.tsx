import {
  Animated,
  Image,
  ImageURISource,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const FlipView = ({
  shouldFlip,
  onPress,
  image,
}: {
  shouldFlip?: boolean;
  onPress?: () => void;
  image:
    | number
    | Animated.Value
    | Animated.AnimatedInterpolation
    | Animated.WithAnimatedObject<ImageURISource>
    | Animated.WithAnimatedArray<ImageURISource>;
}) => {
  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  const flipAnimation = () => {
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    }
  };

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const rotateYAnimatedStyle = {
    transform: [{rotateY: setInterpolate}],
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <AnimatedTouchable
          onPress={() =>
            shouldFlip === false && onPress ? onPress() : flipAnimation()
          }
          style={{width: '100%'}}
          activeOpacity={1}>
          <Animated.Image
            source={image}
            style={[rotateYAnimatedStyle, styles.imageStyle]}
          />
        </AnimatedTouchable>
      </View>
    </SafeAreaView>
  );
};

export default FlipView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  imageStyle: {
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 6,
  },
});
