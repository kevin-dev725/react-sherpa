import {
  fetchLeadStages,
  fetchLeadStagesSuccess,
  fetchLeadStagesFailure
} from './actions';
import AxiosConfig from '../../axiosConfig';
import { saveToLocalStorage } from '../Auth/utils';

export const getLeadStages = () => (dispatch: any, _: any) => {
  dispatch(fetchLeadStages(true));
  return AxiosConfig.get('leadstages/')
    .then(response => {
      dispatch(fetchLeadStagesSuccess(response.data.results));
      saveToLocalStorage("leadStages", JSON.stringify(response.data.results));
    })
    .catch((_) => dispatch(fetchLeadStagesFailure(true)));
}
