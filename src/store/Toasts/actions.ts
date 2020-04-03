import { ADD_TOAST, RESET_TOAST_ARRAY } from './actionTypes';

export interface IToast {
  message?: string;
  id?: string;
  color?: string;
}

export interface IAction {
  type: string;
  toast?: IToast;
}

export const addNewToast = (toast: IToast) => ({
  type: ADD_TOAST,
  toast
});

export const emptyToastArray = () => ({
  type: RESET_TOAST_ARRAY
});
