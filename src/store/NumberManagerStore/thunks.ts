import Axios from '../../axiosConfig';
import { arrayToMapIndex } from '../utils';
import { parsePhoneNumbers } from './transformers';
import { roles } from '../../permissions/permission';

import {
  fetchPhoneNumbers,
  fetchPhoneNumbersError,
  fetchPhoneNumbersSuccess,
  updatePhoneNumber
} from './actions'
import { getUserData } from '../Auth/selectors';
import { userHasPermission } from '../../components/WithPermissions';
import { NUMBER_MANAGER_RELEASE_ACTION } from '../../permissions/phoneNumberManager';
import { addNewToast } from '../Toasts/actions';

export const getPhoneNumbersList = () => (dispatch: any) => {
  dispatch(fetchPhoneNumbers(true));
  return Axios
    .get('/phone-numbers/')
    .then(({ data }) => {
      dispatch(fetchPhoneNumbers(false));
      dispatch(fetchPhoneNumbersSuccess(arrayToMapIndex('id', parsePhoneNumbers(data))));
      return data;
    })
    .catch(_ => {
      dispatch(fetchPhoneNumbersError(true))
    });
};

export const release_phone_number =
  (phoneNumber: any) => (dispatch: any, getState: any) => {
    const state = getState();
    const { profile } = getUserData(state);
    const { permissions } = roles[profile.role] || [];

    // guard against any dom-manipulation from client-side
    if (userHasPermission(permissions, NUMBER_MANAGER_RELEASE_ACTION)) {
      dispatch(updatePhoneNumber({ ...phoneNumber, status: 'released' }));
      dispatch(addNewToast({ message: 'Number has been released.', color: 'success' }));
      return Axios
        .post(`/phone-numbers/${phoneNumber.id}/release/`)
        .then(({ data }) => {
          return data;
        })
        .catch(_ => {
          dispatch(addNewToast({
            message: 'Could not release number. Please try again later.', color: 'danger'
          }));
          dispatch(updatePhoneNumber(phoneNumber))
        });
    }

    return new Promise((resolve: Function) => resolve(null));
  }

export const updatePhoneStatus =
  (phoneNumber: any, payload: any) => (dispatch: any, getState: any) => {
    dispatch(updatePhoneNumber({ ...phoneNumber, ...payload }));
    dispatch(addNewToast({ message: 'Updated Number Status.', color: 'success' }))
    return Axios
      .patch(`/phone-numbers/${phoneNumber.id}/`, payload)
      .then(({ data }) => {
        return data;
      })
      .catch(_ => {
        dispatch(addNewToast({
          message: 'Something went wrong while updating phone status.',
          color: 'danger'
        }));
        dispatch(updatePhoneNumber(phoneNumber));
      });
  };
