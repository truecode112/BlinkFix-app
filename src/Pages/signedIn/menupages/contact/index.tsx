import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoggedInBackground from '../../../../components/background/loggedInBackground';
import ContactData from '../../../../static/contactData';

const ContactPage = () => {
  return (
    <LoggedInBackground>
      <Text style={[Textstyles.text, Textstyles.title]}>Contact</Text>
      <Text style={Textstyles.text}>email:{ContactData.email} </Text>
      <Text style={[Textstyles.text, Textstyles.title]}> Address </Text>
      <Text style={Textstyles.text}>
        country:{ContactData.address.country}{' '}
      </Text>
      <Text style={Textstyles.text}>state:{ContactData.address.state} </Text>
      <Text style={Textstyles.text}>
        postCode:{ContactData.address.postCode}{' '}
      </Text>
      <Text style={Textstyles.text}>city:{ContactData.address.city} </Text>
      <Text style={Textstyles.text}>streat:{ContactData.address.streat} </Text>
      <Text style={Textstyles.text}>
        buildingNumber:{ContactData.address.buildingNumber}{' '}
      </Text>
    </LoggedInBackground>
  );
};

export default ContactPage;

export const Textstyles = StyleSheet.create({
  text: {
    fontFamily: 'Handlee-Regular',
    color: '#fff',
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
});
