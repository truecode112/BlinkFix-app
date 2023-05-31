import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {MenuOrderNavigation} from '../../navigation/order/types';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';

const MenuSquareCartContainerOrder = (props: {
  name?: 'restaurants' | 'shops' | 'foodTrucks' | 'localCooks';
  image: any;
  displayName: string;
  onPress?: () => void;
}) => {
  const navigation = useNavigation<MenuOrderNavigation>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        } else {
          try {
            if (props.name)
              navigation.navigate('OrderPage', {screen: props.name});
          } catch (error) {
            console.error(error);
          }
        }
      }}>
      <DropShadow style={styles.MenuSquareCartContainer}>
        <Image
          source={props.image}
          style={{width: 60, height: 60, resizeMode: 'cover'}}
        />
        <Text style={[Textstyles.text, {color: '#fff'}]}>
          {props.displayName}
        </Text>
      </DropShadow>
    </TouchableOpacity>
  );
};

export default MenuSquareCartContainerOrder;
const styles = StyleSheet.create({
  container: {
    width: '50%',
    aspectRatio: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.11)',
    borderRadius: 10,
  },
  MenuSquareCartContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 2,
    borderRadius: 10,
  },
});
