import AxiosInstance, { delayedRequest } from '../../axiosConfig';
import { fastSpinner } from '../../helpers/variables';

export const listProspects = (term: string) => {
  const url = `/prospects/search/?search=${term}&page_size=50&expand=campaigns,sms_relay_map`;
  return AxiosInstance.get(url);
};

export const listProspectsNextPage = (nextUrl: string) => {
  return AxiosInstance.get(nextUrl);
};

export const getProspect = (id: number) => {
  const url = `/prospects/${id}/?expand=campaigns,sms_relay_map`;
  return AxiosInstance.get(url);
};

export const patchProspect = (id: number, payload: any) => {
  const url = `/prospects/${id}/`;
  return delayedRequest(AxiosInstance.patch(url, payload), fastSpinner);
};

export const prospectEmailToPodio = (id: number, payload: any) => {
  const url = `prospects/${id}/email_to_podio/`;
  return delayedRequest(AxiosInstance.post(url, payload), fastSpinner);
};

export const prospectPushToZapier = (id: number, payload: any) => {
  const url = `prospects/${id}/push_to_zapier/`;
  return delayedRequest(AxiosInstance.post(url, payload), fastSpinner);
};

export const prospectListMessages = (id: number) => {
  const url = `prospects/${id}/messages/`;
  return AxiosInstance.get(url);
};

export const prospectSendMessages = (id: number, payload: any) => {
  const url = `prospects/${id}/send_message/`;
  return AxiosInstance.post(url, payload);
};

export const prospectSetReminder = (id: number, payload: any) => {
  const url = `prospects/${id}/set_reminder/`;
  return AxiosInstance.post(url, payload);
};

// NOTE: move to it's own store if sms-relay-maps become a resource
// with CRUD operations. Otherwise it's okay for it to be here.
export const prospectSetRelay = (payload: any) => {
  const url = `sms-relay-maps/`;
  return AxiosInstance.post(url, payload);
};

export const prospectGetCampaigns = (id: number) => {
  const url = `prospects/${id}/campaigns/`;
  return AxiosInstance.get(url);
}
