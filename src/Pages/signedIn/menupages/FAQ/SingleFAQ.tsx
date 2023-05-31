import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  measure,
  RotateOutUpLeft,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SingleFAQ = ({
  faq,
}: {
  faq: {id: number; question: string; answer: string};
}) => {
  const animatedRotation = useSharedValue(0);
  const [isRotated, setIsRotated] = useState(false);
  const [elementHeight, setElementHeight] = useState(0);
  const animatedHeight = useSharedValue(elementHeight);

  const animationStyleRotate = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: withTiming(`${animatedRotation.value}deg`, {duration: 200})},
      ],
    };
  });
  const animationStyleHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(animatedHeight.value, {duration: 200}),
    };
  });

  return (
    <View style={styles.faqContainer}>
      <View style={{width: '100%'}}>
        <TouchableOpacity
          onPress={() => {
            animatedRotation.value = isRotated ? 0 : 3420;
            animatedHeight.value = isRotated ? 0 : 100;
            setIsRotated(!isRotated);
          }}>
          <Text style={[styles.text, {marginBottom: 10, fontWeight: '900'}]}>
            Q: {faq.question}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[animationStyleHeight]}
          onLayout={event => {
            if (elementHeight === 0)
              setElementHeight(event.nativeEvent.layout.height);
          }}>
          <Text style={[styles.text, {marginBottom: 10}]}>A: {faq.answer}</Text>
        </Animated.View>
      </View>
      <TouchableOpacity
        onPress={() => {
          animatedRotation.value = isRotated ? 0 : 3420;
          animatedHeight.value = isRotated ? 0 : 100;

          setIsRotated(!isRotated);
        }}
        style={{
          alignSelf: 'flex-start',
          padding: 10,
          borderRadius: 100,
        }}>
        <Animated.Image
          style={[animationStyleRotate, {width: 15, height: 12}]}
          source={require('../../../../assets/utilityIcons/triangleUp.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SingleFAQ;

const styles = StyleSheet.create({
  faqContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Handlee-Regular',
    color: '#fff',
    fontSize: 20,
  },
});
