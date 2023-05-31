import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const MenuButtonItem = ({
  name,
  icon,
  onPress,
  offset,
  isMenuOpen,
}: {
  name?: string;
  icon?: ImageSourcePropType;
  onPress?: () => void;
  offset: number;
  isMenuOpen: boolean;
}) => {
  const offsetButton = useSharedValue(0);

  const {width} = useWindowDimensions();
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withTiming(offsetButton.value, {duration: offset * 50})},
      ],
    };
  });

  useEffect(() => {
    if (isMenuOpen) {
      offsetButton.value = 0;
    } else {
      offsetButton.value = width;
    }
  }, [isMenuOpen]);

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : undefined}
      activeOpacity={0.9}>
      <Animated.View
        style={[
          styles.buttonContainer,
          animatedStyles,
          {justifyContent: 'flex-start'},
        ]}>
        <Animated.Image
          style={styles.icon}
          source={icon ? icon : require('../../assets/BX.png')}
        />
        <Text style={styles.buttonText}>{name ? name : 'placeholder'}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default MenuButtonItem;

const styles = StyleSheet.create({
  icon: {
    width: 40,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#464646',
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
