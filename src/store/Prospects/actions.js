import AxiosInstance, { delayedRequest } from '../../axiosConfig';
import {
  SET_PROSPECTS_SEARCH_STATUS,
  SET_SEARCH_PROSPECTS_ERROR,
  SET_SEARCHED_PROSPECTS,
  SET_MORE_PROSPECTS,
  RESET_PROSPECT_DATA,
  SET_PROSPECTS_FETCH_MORE_STATUS
} from './actionTypes';
import { Fetching } from '../../helpers/variables';
import { getLeadStages } from '../leadstages/selectors';
import { mergeLeadStageTitle } from './transformers';

export const setProspectSearchStatus = status => ({
  type: SET_PROSPECTS_SEARCH_STATUS,
  status
});

export const setProspectFetchMoreStatus = status => ({
  type: SET_PROSPECTS_FETCH_MORE_STATUS,
  status
});

export const setProspectSearchError = error => ({
  type: SET_SEARCH_PROSPECTS_ERROR,
  error
});
export const setProspectSearchResults = data => ({
  type: SET_SEARCHED_PROSPECTS,
  data
});

export const setMoreProspects = data => ({
  type: SET_MORE_PROSPECTS,
  data
});

export const resetProspectData = () => ({
  type: RESET_PROSPECT_DATA
});

const doSearchProspect = url => {
  return AxiosInstance.get(url)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log('Error fetching prospects', error.response);
      return error.response;
    });
};

export const searchProspects = term => (dispatch, getState) => {
  const url = `/prospects/?search=${term}&page_size=20`;
  const leadStages = getLeadStages(getState());

  dispatch(resetProspectData());
  dispatch(setProspectSearchStatus(Fetching));

  return delayedRequest(doSearchProspect(url), 250)
    .then(data => {
      dispatch(setProspectSearchResults(mergeLeadStageTitle(data, leadStages)));
      return data;
    })
    .catch(error => {
      console.log('ERROR', error);
    });
};

export const searchProspectNextPage = () => (dispatch, getState) => {
  let {
    prospects: { next = null, status = null },
    leadStages: { leadStages }
  } = getState();

  if (next && status !== Fetching) {
    dispatch(setProspectFetchMoreStatus(Fetching));
    return doSearchProspect(next).then(data => {
      dispatch(setMoreProspects(mergeLeadStageTitle(data, leadStages)));
    });
  }

  return new Promise((resolve, __) => resolve({}));
};
