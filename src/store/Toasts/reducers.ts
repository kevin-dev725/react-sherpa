import { ADD_TOAST, RESET_TOAST_ARRAY } from './actionTypes';
import { IAction, IToast } from './actions';

export interface IState {
  list: IToast[];
}

const initialState: IState = {
  list: []
};

export default function toastsReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case ADD_TOAST: {
      const toast = action.toast;
      const newToast = { ...toast, id: new Date().toISOString() };
      return {
        ...state,
        list: [...state.list, newToast]
      };
    }
    case RESET_TOAST_ARRAY:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
}
