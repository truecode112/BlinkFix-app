import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useEffect} from 'react';
import SimpleSection from '../../../../../../components/Profile/Sections/infoScetion/SimpleSection';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {ForwardedToJobTypeThunk} from '../../../../../../redux/Profile/Jobs/ForwardedToJobType/ForwardedToJobType.thunk';
import {IOrder} from '../../../../../../redux/Order/tables/employees/getEmployeesToAccept.thunk';
import {RenderOrderList} from '../../../../../../components/Profile/Sections/Job/orders/OrdersSection';
import {IOrderListItem} from '../../../../../../redux/Order/EstablishmentOrder/EstablishmentOrder.types';

const ForwardedToYouSection = ({
  jobId,
  jobType,
  orders,
  establishmentId,
}: {
  jobId: string;
  jobType: string;
  orders: IOrderListItem[];
  establishmentId: string;
}) => {
  const dipsatch = useAppDispatch();
  useEffect(() => {
    dipsatch(ForwardedToJobTypeThunk({jobId, jobType}));
  }, [jobId, jobType]);
  const {width} = useWindowDimensions();
  return (
    <SimpleSection title={'Forwarded to ' + jobType}>
      <RenderOrderList
        forwardedToChef={jobType === 'chef'}
        width={width}
        establishmentWithOrders={{
          orders: orders,
          establishment: establishmentId,
        }}
      />
    </SimpleSection>
  );
};

export default ForwardedToYouSection;

const styles = StyleSheet.create({});
