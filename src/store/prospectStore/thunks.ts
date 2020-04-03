import * as api from './api';

// actions
import {
  searchProspects,
  searchProspectsFailure,
  searchProspectsSuccess,
  searchResetResults
} from '../uiStore/prospectSearchView/actions';
import {
  fetchProspectsSuccess,
  updateProspectList,
  updateProspectSuccess,
  fetchProspect,
  fetchProspectSuccess,
  fetchProspectNextPage
} from '../prospectStore/actions';
import * as detailsViewActions from '../uiStore/prospectDetailsView/actions';
import { addNewToast } from '../Toasts/actions';

// selectors
import { getProspect } from './selectors';

// utils
import { arrayToMapIndex } from '../utils';
import { ProspectRecord, PartialProspectRecord } from './interfaces';

// search thunk generators
export const searchProspectsThunkCreator = (initActions: any, successActions: any, failActions: any) => {
  // returns a thunk with specific custom init/success/fail actions
  return (term: string) => (dispatch: any) => {
    initActions(dispatch);
    return api
      .listProspects(term)
      .then(({ data }) => {
        const prospectRecords = data.results.map((prospect: any) => ProspectRecord(prospect, false));
        const prospectsMap = arrayToMapIndex('id', prospectRecords);

        dispatch(fetchProspectsSuccess({ ...data, results: prospectsMap }));
        successActions(dispatch);
        return data;
      })
      .catch(_ => failActions(dispatch));
  };
};

// init actions
const searchInitActions = (dispatch: any) => {
  dispatch(searchProspects(true));
};

// success actions
const searchSuccessActions = (dispatch: any) => {
  dispatch(searchProspectsSuccess(true));
  dispatch(searchResetResults(false));
};

// failure actions
const searchFailureActions = (dispatch: any) => {
  dispatch(searchProspectsFailure(true));
};

export const prospectSearch = searchProspectsThunkCreator(
  searchInitActions,
  searchSuccessActions,
  searchFailureActions
);

export const prospectSearchNextPage = () => (dispatch: any, getState: any) => {
  let {
    prospectStore: { next = null, isLoadingMore = false }
  } = getState();

  if (next && !isLoadingMore) {
    dispatch(fetchProspectNextPage(true));
    return api.listProspectsNextPage(next).then(({ data }) => {
      const prospectRecords = data.results.map((prospect: any) => ProspectRecord(prospect, false));
      const prospectsMap = arrayToMapIndex('id', prospectRecords);

      dispatch(updateProspectList({ ...data, results: prospectsMap, overridePages: true }));
      dispatch(fetchProspectNextPage(false));

      return data;
    });
  }

  return new Promise((resolve, __) => resolve({ results: [] }));
};

// prospect details
export const prospectFetchSingle = (id: any) => (dispatch: any) => {
  dispatch(fetchProspect(true));

  return api
    .getProspect(id)
    .then(({ data }) => {
      let prospect = ProspectRecord(data, false);

      dispatch(updateProspectSuccess(prospect));
      dispatch(fetchProspectSuccess(false));
    })
    .catch(error => console.log('Error fetching prospect detail', error));
};

export const prospectUpdate = async (
  id: any,
  payload: any,
  dispatch: any,
  optimistic: boolean,
  onSuccess: any = () => null
) => {
  return api
    .patchProspect(id, payload)
    .then(({ data }: any) => {
      if (!optimistic) {
        const prospect = PartialProspectRecord(data, false);
        dispatch(updateProspectSuccess(prospect));
      }
        onSuccess(data);
      return data;
    })
    .catch((_: any) => {
      dispatch(addNewToast({ message: 'Failed to update prospect', color: 'danger' }));
    });
};

export const prospectUpdateStatus = (id: string, payload: any, attr: string) => (
  dispatch: any, getState: any
) => {
  const prospect = getProspect(id)(getState());

  dispatch(updateProspectSuccess({ ...prospect, ...payload }));
  const onSuccess = (data: any) => {
    const { doNotCall, isPriority, isQualifiedLead, ownerVerifiedStatus, ...rest } = PartialProspectRecord(data);
    dispatch(updateProspectSuccess({ ...rest, ...payload }));
  };
  return prospectUpdate(id, payload, dispatch, true, onSuccess);
};

export const prospectUpdateThunk = (id: string, payload: any) => (dispatch: any) => {
    return prospectUpdate(id, payload, dispatch, false)
};

export const prospectUpdateOptimistically = (id: string, payload: any) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const prospect = getProspect(id)(state);
  const optimisticProspect = { ...prospect, ...payload };

  // dispatch optimistically
  dispatch(updateProspectSuccess(optimisticProspect));
  return prospectUpdate(id, payload, dispatch, true);
};

export const prospectSetRelay = (payload: any) => (dispatch: any, getState: any) => {
  const state = getState();
  const prospect = getProspect(payload.prospect)(state);
  const newProspect = {
    ...prospect,
    smsRelayMap: { rep: { id: payload.rep } }
  };

  // update optimistically
  dispatch(updateProspectSuccess(newProspect));
  return api
    .prospectSetRelay(payload)
    .catch(error => console.log('Error updating prospect detail', error.response));
};

export const prospectRemoveRelay = (id: any, payload: any) => (dispatch: any, getState: any) => {
  const state = getState();
  const prospect = getProspect(id)(state);
  const newProspect = {
    ...prospect,
    smsRelayMap: { rep: { id: '' } }
  };

  // update optimistically
  dispatch(updateProspectSuccess(newProspect));
  return prospectUpdate(id, payload, dispatch, true);
};

export const prospectSetReminder = (id: any, payload: any) => (dispatch: any, getState: any) => {
  return api
    .prospectSetReminder(id, payload)
    .then(({ data }) => {
      const state = getState();
      const newProspect = PartialProspectRecord(data, false);
      const prospect = getProspect(id)(state);
      const updatedProspect = {
        ...prospect,
        ...newProspect
      };

      // keep the leadstage title
      dispatch(updateProspectSuccess(updatedProspect));
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
};

export const prospectEmailToCrmAction = (id: number, payload: any) => (dispatch: any, getState: any) => {
  return api
    .prospectEmailToPodio(id, payload)
    .then(() => {
      const state = getState();
      const prospect = getProspect(id)(state);
      dispatch(updateProspectSuccess({ ...prospect, emailedToPodio: true }));
    })
    .catch(() => dispatch(addNewToast({ message: 'Email to CRM Failed', color: 'danger' })));
};

export const prospectPushToZapierAction = (id: number, payload: any) => (
  dispatch: any,
  getState: any
) => {
  return api
    .prospectPushToZapier(id, payload)
    .then(() => {
      const state = getState();
      const prospect = getProspect(id)(state);
      dispatch(updateProspectSuccess({ ...prospect, pushedToZapier: true }));
    })
    .catch(() => dispatch(addNewToast({ message: 'Push to Zapier Failed', color: 'danger' })));
};
