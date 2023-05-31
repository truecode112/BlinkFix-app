import {Image, Text, StyleSheet} from 'react-native';
export const convertAdvancement = (advancement: 1 | 2 | 3 | 4 | 5 | null) => {
  switch (advancement) {
    case 1:
      return (
        <>
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/advancement/easy.png')}
          />
          <Text style={styles.title}>Easy</Text>
        </>
      );
    case 2:
      return (
        <>
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/advancement/medium.png')}
          />
          <Text style={styles.title}>Medium</Text>
        </>
      );
    case 3:
      return (
        <>
          <Image
            style={styles.imageIcon}
            source={require('../../static/icons/advancement/hard.png')}
          />
          <Text style={styles.title}>Hard</Text>
        </>
      );

    default:
      break;
  }
};
const styles = StyleSheet.create({
  title: {fontSize: 12, width: '100%', textAlign: 'center', color: '#fff'},
  ContainerSmall: {
    width: 50,

    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  imageIcon: {
    height: '60%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
