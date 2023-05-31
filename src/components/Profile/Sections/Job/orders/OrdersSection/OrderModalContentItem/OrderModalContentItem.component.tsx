import React from 'react';

import {Image, Text, View} from 'react-native';
import {WEBCONST} from '../../../../../../../constants/webConstants';
import {Textstyles} from '../../../../../../../Pages/signedIn/menupages/contact';
import {IOrderModalContentProps} from './OrderModalContentItem.types';
import {OrderModalContentStyles} from './OrderModalContentItemStyle';
const bxImagePath = require('../../../../../../../assets/BX.png');

const OrderModalContent = ({orderItem, number}: IOrderModalContentProps) => {
  const styles = OrderModalContentStyles;
  return (
    <View style={styles.Container}>
      <Text style={[Textstyles.text, {fontSize: 15, marginRight: 10}]}>
        #{number.toString()}
      </Text>
      <View style={[styles.SingleOrderItem]}>
        {orderItem.itemId.image ? (
          <Image
            style={[styles.ImageStyle, {}]}
            source={{
              uri: `${WEBCONST().STORAGEURLNEW}/${orderItem.itemId.image.path}`,
            }}
          />
        ) : (
          <Image style={[styles.ImageStyle, {}]} source={bxImagePath} />
        )}

        <Text style={Textstyles.text}>{orderItem.itemId.dishName}</Text>
      </View>
    </View>
  );
};

export default OrderModalContent;
