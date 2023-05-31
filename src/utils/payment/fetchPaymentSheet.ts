import {instance} from './../../redux/interceptors';
export const fetchPaymentSheetParams = async ({
  totalItems,
  orderWhere,
  atoken,
}: {
  totalItems: number;
  orderWhere: string;
  atoken: string;
}) => {
  const response = await instance
    .post(
      `/order/payment/payment-sheet`,
      {totalCosts: totalItems, orderWhereId: orderWhere},
      {
        headers: {Authorization: 'Bearer ' + atoken},
      },
    )
    .then(response => response.data);
  const {paymentIntent, ephemeralKey, customer} = await response;

  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};
