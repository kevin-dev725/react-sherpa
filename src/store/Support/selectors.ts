import { IState } from './reducers';

interface ISupportState {
  supportItems: IState;
}

export const supportItemsArray = ({ supportItems }: ISupportState) => supportItems.items || [];
export const supportItemsError = ({ supportItems }: ISupportState) => supportItems.error;
export const supportItemsStatus = ({ supportItems }: ISupportState) => supportItems.status;
