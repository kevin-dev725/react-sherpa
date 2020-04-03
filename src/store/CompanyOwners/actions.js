import AxiosInstance from '../../axiosConfig';
import {
  FETCH_COMPANY_OWNERS,
  SET_FETCH_COMPANY_OWNERS,
  SET_FETCH_COMPANY_OWNERS_ERROR
} from './actionTypes';
import { Fetching } from '../../helpers/variables';

export const setFetchedCompanyOwnersStatus = status => ({
  type: FETCH_COMPANY_OWNERS,
  status
});

export const setFetchedCompanyOwners = owners => ({
  type: SET_FETCH_COMPANY_OWNERS,
  owners
});

export const setFetchedCompanyOwnersError = error => ({
  type: SET_FETCH_COMPANY_OWNERS_ERROR,
  error
});

export const fetchCompanyOwners = id => (dispatch, _) => {
  dispatch(setFetchedCompanyOwnersStatus(Fetching));

  AxiosInstance.get(`/companies/${id}/`)
    .then(({ data }) => {
      const { profiles } = data;
      dispatch(setFetchedCompanyOwners(profiles));
    })
    .catch(error => {
      console.log('Error owners', error);
      dispatch(setFetchedCompanyOwnersError('Error when fetching owners'));
    });
};
