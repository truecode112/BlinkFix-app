import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../components/background/loggedInBackground';
import {Textstyles} from './menupages/contact';

const BuddyProgram = () => {
  return (
    <LoggedInBackground>
      <Text style={[Textstyles.text, Textstyles.title]}>
        We are still developing, This screen will be available soon. Tank you
        for beeing with us
      </Text>
    </LoggedInBackground>
  );
};

export default BuddyProgram;

const styles = StyleSheet.create({});
