import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoggedInBackground from '../../../../../../components/background/loggedInBackground';
import {useRoute} from '@react-navigation/native';
import {ChefsActiveOrdersProps} from '../../../../../../navigation/Profile/ProfileNavigator.types';
import SingleOrderInProfile from '../../../../../../components/Profile/Sections/Job/orders/OrdersSection/SingleOrderInProfile/SingleOrderInProfile.component';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ScrollContainer from '../../../../../../components/ScrollContainer';
import OutsidePressHandler from 'react-native-outside-press';
import {Textstyles} from '../../../../menupages/contact';
import {IOrderListItem} from '../../../../../../redux/Order/EstablishmentOrder/EstablishmentOrder.types';
import SubmitButton from '../../../../../../components/touchables/SubmitButton';
import {uniqueId} from 'lodash';
import {IRequestOrderItem} from '../../../../../../redux/Order/Order/types';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {ForwardedToJobTypeThunk} from '../../../../../../redux/Profile/Jobs/ForwardedToJobType/ForwardedToJobType.thunk';
import {ForwardToJobTypeThunk} from '../../../../../../redux/Profile/Jobs/ForwardToJobType/ForwardToJobType.thunk';
import {cleanUpForwardToJobTypeSlice} from '../../../../../../redux/Profile/Jobs/ForwardToJobType/ForwardToJobType.slice';

const ChefsActiveOrders = () => {
  const {params} = useRoute<ChefsActiveOrdersProps['route']>();
  const {activeOrders, jobId} = params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const backgroundImage = require('../../../../../../assets/background.png');
  const closeIcon = require('../../../../../../assets/utilityIcons/close.png');
  function openPopUp(_id: any) {
    setIsModalVisible(!isModalVisible);
  }

  const [lastItem, setlastItem] = useState<IOrderListItem | null>();
  const [isFinished, setIsFinished] = useState<
    {finished: boolean; item: IRequestOrderItem; key: number}[]
  >([]);
  const checkIfAllItemsAreFinished = () => {
    const allItemsLength = lastItem?.orderItems.length;
    const lastItemsFinishedOnes = isFinished?.filter((item, index) =>
      lastItem?.orderItems.find((item, i) => i === index),
    );
    const onlyFinishedLength = lastItemsFinishedOnes.filter(
      item => item.finished === true,
    ).length;
    if (onlyFinishedLength === allItemsLength) return true;
    else return false;
  };

  useEffect(() => {
    if (activeOrders && isFinished.length === 0) {
      console.log({actlen: lastItem?.orderItems.length});
      const isFinishedMap = lastItem?.orderItems.map((activeOrd, key) => {
        return {
          finished: false,
          item: activeOrd,
          key,
        };
      });
      if (isFinishedMap) setIsFinished(isFinishedMap);
    }
  }, [isModalVisible]);

  const {data, isLoading, succes} = useAppSelector(
    state => state.ForwardToJobType,
  );
  const forwardedData = useAppSelector(
    state => state.ForwardedOrderToJobType.data,
  );

  const [ordersToMap, setOrdersToMap] = useState(activeOrders);

  useEffect(() => {
    console.log({len: forwardedData?.length});
    if (forwardedData) setOrdersToMap(forwardedData);
  }, [forwardedData]);
  useEffect(() => {
    setlastItem(null);
    setIsFinished([]);
  }, [forwardedData]);

  const dipsatch = useAppDispatch();
  useEffect(() => {
    if (isLoading === false && succes === true) {
      dipsatch(cleanUpForwardToJobTypeSlice());
      setIsModalVisible(false);
      setIsFinished([]);
    }
  }, [data, isLoading, succes]);

  return (
    <LoggedInBackground disabledScroll={false}>
      <View style={styles.fixedContainer}>
        {ordersToMap.length === 0 && (
          <Text
            style={[Textstyles.text, Textstyles.title, {alignSelf: 'center'}]}>
            Nothing to show there yet
          </Text>
        )}
        <ScrollView style={{height: 500, width: '100%'}}>
          {ordersToMap.map(item => (
            <TouchableOpacity
              key={uniqueId()}
              onPress={() => {
                setlastItem(item);
                openPopUp(item._id);
              }}>
              <SingleOrderInProfile order={item} full forwardedToChef={true} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Modal visible={isModalVisible} transparent>
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
              setlastItem(null);
              setIsFinished([]);
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                top: 0,
                right: 0,
                height: 30,
                width: 30,
                margin: 10,
              }}
              onPress={() => {
                setIsModalVisible(false);
                setlastItem(null);
                setIsFinished([]);
              }}>
              <Image
                source={closeIcon}
                style={{
                  width: '100%',
                  height: '100%',
                  zIndex: 1000,
                }}
              />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <ScrollContainer>
                <ScrollView>
                  <View
                    style={{
                      paddingBottom: 20,
                      paddingHorizontal: 10,
                      width: '100%',
                    }}>
                    <Text style={[Textstyles.text, Textstyles.title]}>
                      {isFinished.map(({item, finished, key}, index) => {
                        const singleFinished = isFinished.find(
                          finished => index === finished.key,
                        );
                        return (
                          <View key={uniqueId()}>
                            <Text
                              style={[
                                Textstyles.text,
                                Textstyles.title,
                                {textTransform: 'capitalize'},
                              ]}>
                              {index + 1}
                              {')'} {item.itemId.dishName}
                            </Text>

                            <View style={{flexDirection: 'column'}}>
                              {item.itemId.dishIngredients.map((ing, index) => {
                                return (
                                  <View
                                    key={uniqueId()}
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-around',
                                      width: '100%',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                      }}>
                                      <Text style={[Textstyles.text]}>
                                        {ing.qtt}{' '}
                                      </Text>
                                      <Text style={[Textstyles.text]}>
                                        {ing.unit}
                                      </Text>
                                    </View>
                                    <Text style={[Textstyles.text]}>
                                      {ing.name}
                                    </Text>
                                  </View>
                                );
                              })}
                            </View>
                            {singleFinished?.finished ? (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  justifyContent: 'flex-end',
                                  paddingRight: 50,
                                  paddingTop: 40,
                                }}>
                                <SubmitButton
                                  style={{backgroundColor: 'rgb(80,80,80)'}}
                                  title="Cancel"
                                  onPress={() => {
                                    const newIsfinished = isFinished.map(
                                      isFinishedS =>
                                        isFinishedS.key === singleFinished?.key
                                          ? {
                                              ...singleFinished,
                                              isFinished:
                                                !singleFinished.finished,
                                            }
                                          : isFinishedS,
                                    );
                                    setIsFinished(newIsfinished);
                                  }}
                                />
                              </View>
                            ) : (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  justifyContent: 'flex-end',
                                  paddingRight: 50,
                                  paddingTop: 40,
                                }}>
                                <SubmitButton
                                  title="Finish dish"
                                  onPress={() => {
                                    const newFinishedObject = isFinished?.map(
                                      finished => {
                                        if (index === finished.key) {
                                          return {
                                            ...finished,
                                            finished: !finished.finished,
                                          };
                                        } else {
                                          return finished;
                                        }
                                      },
                                    );
                                    setIsFinished(newFinishedObject);
                                  }}
                                />
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </Text>
                  </View>
                </ScrollView>
              </ScrollContainer>

              {checkIfAllItemsAreFinished() && (
                <SubmitButton
                  onPress={() => {
                    if (
                      lastItem &&
                      lastItem.assignedTo &&
                      lastItem.isPickup !== undefined
                    )
                      dipsatch(
                        ForwardToJobTypeThunk({
                          forwardTo: lastItem?.isPickup ? 'waiter' : 'driver',
                          jobId: jobId,
                          orderId: lastItem._id,
                        }),
                      );
                  }}
                  title={`Submit back to ${
                    lastItem?.isPickup ? 'Waiter' : 'Driver'
                  }`}
                />
              )}
            </View>
          </OutsidePressHandler>
        </View>
      </Modal>
    </LoggedInBackground>
  );
};

export default ChefsActiveOrders;

const styles = StyleSheet.create({
  fixedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
