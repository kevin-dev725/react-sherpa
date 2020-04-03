import { getFromLocalStorage } from '../Auth/utils';

export const loadLeadStages = () => {
  return {
    leadStages: {
      leadStages: getFromLocalStorage('leadStages', []),
      isLoading: false,
      error: false
    }
  };
}
