export const authError = (state: any) => state.auth.error;
export const isAuthenticated = (state: any) => state.auth.is_authenticated;
export const getAuthToken = (state: any) => state.auth.token;
export const getRefreshToken = (state: any) => state.auth.refreshToken;


const userData = {
  firstName: "",
  lastName: "",
  fullName: "",
  id: -1,
  company: {
    id: -1,
    name: "",
    profiles: [],
    timezone: "",
    subscriptionStatus: "",
    isMessagingDisabled: false
  }
}

export const getUserData = (state: any) => ({ ...userData, ...state.auth.userData });

export const getCompanyData = (state: any) => state.auth.userData.company;
