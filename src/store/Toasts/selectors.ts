import { IToast } from './actions';
import { IState } from './reducers';

interface IToastsReducer {
  toastsReducer: IToast & IState;
}

export const getToasts = ({ toastsReducer }: IToastsReducer) => toastsReducer.list || [];
