import React, {useEffect, useRef, useState} from 'react';
import {Shadow} from 'react-native-shadow-2';

import {
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Textstyles} from '../../../../../../../Pages/signedIn/menupages/contact';
import {ISingleOrderInProfileProps} from './SingleOrderInProfile.types';
import {SingleOrderInProfileStyles} from './SingleOrderInProfileStyle';
import ScrollContainer from '../../../../../../ScrollContainer';
import OrderModalContent from '../OrderModalContentItem/OrderModalContentItem.component';
import OutsidePressHandler from 'react-native-outside-press';
const backgroundImage = require('../../../../../../../assets/background.png');

const SingleOrderInProfile = (props: ISingleOrderInProfileProps) => {
  const closeIcon = require('../../../../../../../assets/utilityIcons/close.png');
  const styles = SingleOrderInProfileStyles;
  const order = props.order;
  const full = props.full;
  const orderDate = new Date(order.orderDate);
  const updateDate = new Date(order.orderUpdateDate);

  const {width} = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openPopUp = (orderId: string) => {
    if (!props.forwardedToChef) setIsModalVisible(!isModalVisible);
  };

  const modalRef = useRef<Modal>(null);
  const heightRef = useRef<View>(null);

  useEffect(() => {
    //
  }, [modalRef]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            width: full ? '100%' : width * 0.9,
            // height: full ? width * 1.5 : undefined,
          },
        ]}
        ref={heightRef}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => openPopUp(order._id)}>
          <Shadow
            style={{
              width: '100%',
              borderRadius: 5,
              padding: 5,
              paddingVertical: 20,
              paddingTop: 50,
              alignItems: 'center',
              // height: full ? width * 1.4 : undefined,
            }}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 18, flexShrink: 1, paddingRight: 20},
                ]}>
                Order:
              </Text>

              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[
                  Textstyles.text,
                  {fontSize: 18, flexShrink: 1, paddingRight: 20},
                ]}
                lineBreakMode={'tail'}>
                {order._id}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Order for:
              </Text>
              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 15, textTransform: 'uppercase'},
                ]}>
                {order.orderBy.first_name}
                {' ('}
                {order.orderBy.name}
                {')'}
              </Text>
            </View>
            <View style={[styles.titleContainer]}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Order date:
              </Text>

              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 15, top: 0, right: 5, marginRight: 10},
                ]}>
                {orderDate.toLocaleDateString()}
              </Text>
              <Text style={[Textstyles.text, {fontSize: 15, top: 0, right: 5}]}>
                {orderDate.toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Update date:
              </Text>

              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 15, top: 0, right: 5, marginRight: 10},
                ]}>
                {updateDate.toLocaleDateString()}
              </Text>
              <Text style={[Textstyles.text, {fontSize: 15, top: 0, right: 5}]}>
                {updateDate.toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Currently assigned to:
              </Text>
              {order.assignedTo ? (
                <Text style={[Textstyles.text, {fontSize: 15}]}>
                  {order.assignedTo.workerId?.name} {' ('}
                  {order.assignedTo.typeOfWork}
                  {')'}
                </Text>
              ) : (
                <Text style={[Textstyles.text, {fontSize: 15}]}>
                  unassinged
                </Text>
              )}
            </View>
            <View style={styles.titleContainer}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Forwarder to:
              </Text>
              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 15, textTransform: 'uppercase'},
                ]}>
                {order.forwardedTo}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Status:
              </Text>
              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 15, textTransform: 'uppercase'},
                ]}>
                {order.orderStatus}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Total price:
              </Text>
              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 15, textTransform: 'uppercase'},
                ]}>
                {order.totalAmount?.toString()}
                {order.currency}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[Textstyles.text, {fontSize: 18, paddingRight: 15}]}>
                Type of delivery:
              </Text>
              <Text
                style={[
                  Textstyles.text,
                  {fontSize: 15, textTransform: 'uppercase'},
                ]}>
                {order.isPickup ? 'pickup' : 'delivery'}
                {order.currency}
              </Text>
            </View>
          </Shadow>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent ref={modalRef}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            paddingVertical: '30%',
            backgroundColor: '#00000055',
          }}>
          <Image
            source={backgroundImage}
            style={{
              position: 'absolute',
              flex: 1,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              alignSelf: 'center',
              borderRadius: 5,
            }}
          />
          <OutsidePressHandler
            disabled={false}
            onOutsidePress={() => {
              setIsModalVisible(false);
            }}>
            <View style={{height: '100%', position: 'relative'}}>
              <ScrollContainer>
                <ScrollView style={{marginTop: 50}}>
                  <View
                    style={{
                      paddingBottom: 20,
                      paddingHorizontal: 10,
                      width: '100%',
                    }}>
                    <Text style={[Textstyles.text, Textstyles.title]}>
                      Items in order
                    </Text>
                    {order.orderItems.map((item, i) => {
                      return (
                        <OrderModalContent
                          number={i + 1}
                          orderItem={item}
                          key={i}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
              </ScrollContainer>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('');
                  setIsModalVisible(false);
                }}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                }}>
                <Image source={closeIcon} style={{height: 30, width: 30}} />
              </TouchableOpacity>
            </View>
          </OutsidePressHandler>
        </View>
      </Modal>
    </>
  );
};

export default SingleOrderInProfile;
