import React from 'react';
import {IRequestOrderItem} from '../../../../../../../redux/Order/Order/types';

export interface IOrderModalContentProps {
  orderItem: IRequestOrderItem;
  number: number;
}
