import AxiosInstance from '../../axiosConfig';
import { SET_SUPPORT_ITEMS, SET_SUPPORT_ITEMS_ERROR, SET_SUPPORT_ITEMS_STATUS } from './actionTypes';
import { Fetching } from '../../helpers/variables';

export interface ISupportItems {
  id: number;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export const setFetchedSupportItems = (items: ISupportItems[]) => ({
  type: SET_SUPPORT_ITEMS,
  items
});

export const setSupportItemsStatus = (status: string) => ({
  type: SET_SUPPORT_ITEMS_STATUS,
  status
});

export const setFetchedSupportItemsError = (error: string) => ({
  type: SET_SUPPORT_ITEMS_ERROR,
  error
});

const handleError = (message: string, error: string, dispatch: any) => {
  console.log(message, error);
  dispatch(setFetchedSupportItemsError('Error when fetching support'));
};

export const fetchSupportItems = () => (dispatch: any) => {
  dispatch(setSupportItemsStatus(Fetching));
  AxiosInstance.get('/support-links/')
    .then(({ data }) => {
      dispatch(setFetchedSupportItems(data.results));
    })
    .catch(error => handleError('Support pages GET error', error.results, dispatch));
};
