// TODO(Diego): Finish up defining selectors
import { createSelectorContext } from '../../redux-helpers';
import { path } from './reducer';

const createSelector = createSelectorContext(path);

export const phoneNumbersList = createSelector(
  'numbers',
  (numbers: { [key: string]: any }) => Object.entries(numbers).map(([_, value]) => value)
);
export const isLoadingPhoneNumbers = createSelector('loading');
