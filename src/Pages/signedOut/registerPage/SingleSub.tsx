import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';

const SingleSub = ({
  sub,
  selected,
  setSelected,
  setSubName,
}: {
  sub: {
    id: number;
    name: string;
    icon: string;
    pricing: string;
    options: string[];
  };
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  setSubName: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const isSelectedComparer = selected === sub.id;

  const ReturnImage = (selected: boolean) => {
    let ImageValue;

    switch (sub.id) {
      case 0:
        ImageValue = (
          <Image
            style={[
              styles.image,
              {backgroundColor: selected ? '#00000015' : 'transparent'},
            ]}
            source={require('../../../assets/sub/0.png')}
          />
        );
        break;
      case 1:
        ImageValue = (
          <Image
            style={[
              styles.image,
              {backgroundColor: selected ? '#00000015' : 'transparent'},
            ]}
            source={require('../../../assets/sub/1.png')}
          />
        );
        break;
      case 2:
        ImageValue = (
          <Image
            style={[
              styles.image,
              {backgroundColor: selected ? '#00000015' : 'transparent'},
            ]}
            source={require('../../../assets/sub/2.png')}
          />
        );
        break;
      case 3:
        ImageValue = (
          <Image
            style={[
              styles.image,
              {backgroundColor: selected ? '#00000015' : 'transparent'},
            ]}
            source={require('../../../assets/sub/3.png')}
          />
        );
        break;
      case 4:
        ImageValue = (
          <Image
            style={[
              styles.image,
              {backgroundColor: selected ? '#00000015' : 'transparent'},
            ]}
            source={require('../../../assets/sub/4.png')}
          />
        );
        break;
      case 5:
        ImageValue = (
          <Image
            style={[
              styles.image,
              {backgroundColor: selected ? '#00000015' : 'transparent'},
            ]}
            source={require('../../../assets/sub/5.png')}
          />
        );
        break;

      default:
        break;
    }
    return ImageValue;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setSelected(sub.id);
        setSubName(sub.name);
      }}>
      <View>{ReturnImage(isSelectedComparer)}</View>
    </TouchableOpacity>
  );
};

export default SingleSub;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
    width: 300,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
});
