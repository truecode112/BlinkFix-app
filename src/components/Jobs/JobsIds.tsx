import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleSection from '../Profile/Sections/infoScetion/SimpleSection';
import {Textstyles} from '../../Pages/signedIn/menupages/contact';
import Clipboard from '@react-native-clipboard/clipboard';
import {Tip} from 'react-native-tip';
const CopyImage = require('../../assets/utilityIcons/copy.png');

const JobsIds = ({id}: {id: string}) => {
  const copyToClipboard = (text: string | undefined) => {
    if (text) return Clipboard.setString(text);
  };

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  useEffect(() => {
    if (isPopupVisible) {
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 1500);
    }
  }, [isPopupVisible]);

  return (
    <View style={{position: 'relative'}}>
      <SimpleSection
        title={'Establishment id'}
        ExtraButton={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                copyToClipboard(id);
                setIsPopupVisible(true);
              }}
              style={{
                borderRadius: 40,
              }}>
              <Image
                source={CopyImage}
                style={{width: 18, height: 18, margin: 3}}
              />
            </TouchableOpacity>
          );
        }}>
        <Text style={[Textstyles.text, {marginRight: 10}]}> {id} </Text>
      </SimpleSection>
      <Tip
        id="copy"
        title="Do you liked it?"
        body="Remember to hit the heart if you enjoyed the content"
        showItemPulseAnimation
        pulseColor="#ff8080"
        style={{
          position: 'absolute',
          height: '100%',
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isPopupVisible ? 1 : 0,
        }}
        overlayOpacity={0.5}
        active={false}>
        <TouchableOpacity
          onPress={() => {
            // setShowTip(false);
          }}
          style={{
            padding: 10,
            borderRadius: 50,
            position: 'absolute',
            top: 0,
            zIndex: 100,
          }}>
          <View
            style={{
              position: 'absolute',
              paddingVertical: 10,
              paddingHorizontal: 40,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignSelf: 'center',
              left: '20%',
            }}>
            <Text>Id copied</Text>
          </View>
        </TouchableOpacity>
      </Tip>
    </View>
  );
};

export default JobsIds;

const styles = StyleSheet.create({});
