import AxiosInstance from '../../axiosConfig';

export const listCampaignsNextPage = (nextUrl: string) => {
  return AxiosInstance.get(nextUrl);
};

