import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../../components/background/loggedInBackground';
import SingleFAQ from './SingleFAQ';
import FAQdata from '../../../../static/FAQ';

const FAQPage = () => {
  return (
    <LoggedInBackground>
      {FAQdata?.map(single => {
        return <SingleFAQ faq={single} key={single.id} />;
      })}
    </LoggedInBackground>
  );
};

export default FAQPage;

const styles = StyleSheet.create({});
