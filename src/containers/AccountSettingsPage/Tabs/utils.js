import AxiosInstance, { delayedRequest } from '../../../axiosConfig';
import ReduxStore from '../../../store/store';
import { fastSpinner } from '../../../helpers/variables';
import { setUserInfo } from '../../../store/Auth/actions';
import { addNewToast } from '../../../store/Toasts/actions';

export const updatePassword = body => {
    const { newPassword, currentPassword } = body;
    return delayedRequest(AxiosInstance.post('/auth/users/set_password/', { newPassword, currentPassword }), fastSpinner)
        .then(data => data);
}

export const updateTimezone = (id, body, userData) => {
    return AxiosInstance.patch(`/companies/${id}/`, body)
}
