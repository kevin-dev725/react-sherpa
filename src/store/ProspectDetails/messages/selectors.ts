import { IState } from './reducers';
import { IResults } from './actions';
import { prospectDetailsReducer } from '../../../helpers/variables';
import { createSelectorContext } from '../../../redux-helpers';
import { path } from './reducers';
import { mapIndexToArray } from '../../utils';

const reducer = prospectDetailsReducer;
const createSelector = createSelectorContext(path);

export const prospectMessagesList =
  (prospectId: number) =>
    createSelector(
      ['list', prospectId],
      (messages: any) => mapIndexToArray(messages || {})
    );

export const prospectMessgesStatus = createSelector('status');
