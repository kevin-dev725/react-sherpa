import axiosInstance from '../../axiosConfig';

export const fetchMessages = id =>
  axiosInstance
    .get(`/prospects/${id}/messages/`)
    .then(({ data }) => data);

export const sendMessage = (id, body) => axiosInstance.post(`/prospects/${id}/send_message/`, body);

export const patchMessage = id =>
  axiosInstance
    .patch(`/sms-messages/${id}/`, { unreadByRecipient: false });

export const markAllMessagesAsRead = (id) => axiosInstance.post(`/prospects/${id}/mark_as_read/`);
