import {
  FETCH_PHONE_NUMBERS,
  FETCH_PHONE_NUMBERS_SUCCESS,
  FETCH_PHONE_NUMBERS_ERROR,
  UPDATE_PHONE_NUMBER
} from './actionTypes';
import { createAction } from '../../redux-helpers';

export const fetchPhoneNumbers = createAction(FETCH_PHONE_NUMBERS);
export const fetchPhoneNumbersSuccess = createAction(FETCH_PHONE_NUMBERS_SUCCESS);
export const fetchPhoneNumbersError = createAction(FETCH_PHONE_NUMBERS_ERROR);

export const updatePhoneNumber = createAction(UPDATE_PHONE_NUMBER);
