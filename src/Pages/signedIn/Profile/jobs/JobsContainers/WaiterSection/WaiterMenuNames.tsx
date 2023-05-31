import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Textstyles} from '../../../../menupages/contact';

const WaiterMenuNames = ({
  menuNames,
  selectedMenuName,
  setSelectedMenuName,
}: {
  menuNames: string[];
  selectedMenuName: string;
  setSelectedMenuName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    if (menuNames) setSelectedMenuName(menuNames[0]);
  }, []);
  const {width} = useWindowDimensions();

  return (
    <ScrollView
      horizontal
      snapToInterval={width * 0.8 + 20}
      snapToStart
      snapToEnd
      decelerationRate={'fast'}
      style={{
        minWidth: width - 40,
        alignSelf: 'center',
        maxHeight: 50,
      }}
      contentContainerStyle={{justifyContent: 'space-evenly'}}>
      {menuNames.map((menuName, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedMenuName(menuName);
            }}>
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 30,
                backgroundColor:
                  selectedMenuName === menuName ? '#00000035' : '#00000015',
                borderRadius: 5,
                marginHorizontal: 5,
              }}>
              <Text style={[Textstyles.text]}>{menuName}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default WaiterMenuNames;

const styles = StyleSheet.create({});
