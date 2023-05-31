import {IOrderListItem} from './../../../../../../../redux/Order/EstablishmentOrder/EstablishmentOrder.types';

export interface ISingleOrderInProfileProps {
  order: IOrderListItem;
  full?: boolean;
  forwardedToChef?: boolean;
}
