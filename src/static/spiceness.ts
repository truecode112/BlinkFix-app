export const SpicenessList = () => {
  const resArr: {
    id: number;
    name: 'extra hot' | 'Hot' | 'Mild' | 'normal';
    icon?: any;
  }[] = [
    {
      id: 0,
      name: 'normal',
      icon: require('../assets/utilityIcons/Spicenes/1.png'),
    },
    {
      id: 1,
      name: 'Mild',
      icon: require('../assets/utilityIcons/Spicenes/2.png'),
    },
    {
      id: 2,
      name: 'Hot',
      icon: require('../assets/utilityIcons/Spicenes/3.png'),
    },
    {
      id: 3,
      name: 'extra hot',
      icon: require('../assets/utilityIcons/Spicenes/4.png'),
    },
  ];
  return resArr;
};
