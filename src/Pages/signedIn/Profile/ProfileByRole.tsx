import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StudentProfile from './StudentProfile';
import EstablishmentProfile from './EstablishmentProfile';

const ProfileByRole = ({
  role,
  selected,
  setSelected,
}: {
  role: string | undefined;
  selected: 0 | 1 | 2 | 3 | 4;
  setSelected: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3 | 4>>;
}) => {
  switch (role) {
    case 'End User':
      return <StudentProfile />;
    case 'Student':
      return <StudentProfile />;
    case 'Local Cook':
      return <EstablishmentProfile />;
    case 'Restaurant':
      return <EstablishmentProfile />;
    case 'Food trucks':
      return <EstablishmentProfile />;
    case 'Shop':
      return <EstablishmentProfile />;

    default:
      return (
        <View>
          <Text>{role}</Text>
        </View>
      );
  }
};

export default ProfileByRole;

const styles = StyleSheet.create({});
