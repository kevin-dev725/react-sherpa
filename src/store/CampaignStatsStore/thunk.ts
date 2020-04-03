import Axios from '../../axiosConfig';
import {
  fetchCampaignStats,
  fetchCampaignStatsError,
  fetchCampaignStatsSuccess
} from './actions'
import { arrayToMapIndex } from '../utils';

export const fetchCampaignStatsThunk =
  (id: number) => (dispatch: Function) => {
    dispatch(fetchCampaignStats(true))
    return Axios.get(`/campaigns/${id}/stats/`)
      .then(({ data }) => {
        dispatch(fetchCampaignStats(false))
        dispatch(fetchCampaignStatsSuccess(arrayToMapIndex('id', [{ ...data, id }])))
      })
      .catch(_ => console.log('SOMETHING HAPPENED'));
  };

