import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InsetShadow from 'react-native-inset-shadow';
import {Shadow} from 'react-native-shadow-2';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SingleItem = ({
  title,
  icon,
  selected,
  setSelected,
  id,
}: {
  id: 0 | 1 | 2 | 3 | 4;
  title: string;
  icon: ImageSourcePropType;
  selected: 0 | 1 | 2 | 3 | 4;
  setSelected: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3 | 4>>;
}) => {
  if (selected === id)
    return (
      <View
        style={{
          aspectRatio: 1,
          borderRadius: 5,
          flex: 1,
          marginHorizontal: 4,
        }}>
        <InsetShadow
          containerStyle={styles.shadow}
          shadowRadius={10}
          shadowOffset={10}
          elevation={100}
          shadowOpacity={0.5}
          color="rgba(128,128,128,1)">
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <Image source={icon} style={{width: 30, height: 30, margin: 0}} />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: 10,
              }}>
              {title}
            </Text>
          </View>
        </InsetShadow>
      </View>
    );
  else {
    return (
      <Shadow containerStyle={styles.shadowouter}>
        <TouchableOpacity
          onPress={() => setSelected(id)}
          style={{
            alignItems: 'center',
            flex: 1,
            borderRadius: 5,
          }}>
          <View
            style={{
              aspectRatio: 1,
              borderRadius: 5,
              flex: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                flex: 1,
              }}>
              <Image source={icon} style={{width: 30, height: 30, margin: 0}} />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: 10,
                }}>
                {title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Shadow>
    );
  }
};

export default SingleItem;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    borderRadius: 5,
  },
  shadowouter: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginHorizontal: 10,

    elevation: 6,
    flex: 1,
    aspectRatio: 1,
  },
});
