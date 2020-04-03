import {
  FETCH_PHONE_NUMBERS,
  FETCH_PHONE_NUMBERS_SUCCESS,
  FETCH_PHONE_NUMBERS_ERROR,
  UPDATE_PHONE_NUMBER
} from './actionTypes';

// TODO(Diego): Finish up defining reducers
const initialState: any = {
  numbers: {},
  loading: false,
  error: false
};

export const path = ['numberManagerStore'];

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_PHONE_NUMBERS: {
      return {
        ...state,
        loading: action.payload
      }
    };
    case FETCH_PHONE_NUMBERS_SUCCESS: {
      return {
        ...state,
        numbers: action.payload
      };
    };
    case FETCH_PHONE_NUMBERS_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    };
    case UPDATE_PHONE_NUMBER: {
      const id = action.payload.id;
      return {
        ...state,
        numbers: {
          ...state.numbers,
          [id]: { ...state.numbers[id], ...action.payload }
        }
      }
    }
    default:
      return state;
  }
}
