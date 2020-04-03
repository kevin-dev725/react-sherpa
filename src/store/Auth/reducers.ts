export interface UserData {
  username: string;
  email: string;
  id: number | null;
}

interface AuthState {
  is_authenticated: boolean;
  token: string;
  refreshToken: string;
  error: string;
  userData: UserData;
}

interface AuthAction {
  type: string;
  access: string;
  refresh: string;
  error: string;
  userData: UserData;
}

export const initialState: AuthState = {
  is_authenticated: false,
  token: '',
  refreshToken: '',
  error: '',
  userData: {
    username: "",
    email: "",
    id: null
  }
}

export const path = ['auth'];

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case 'SET_AUTH_STATE':
      return {
        ...state,
        token: action.access,
        refreshToken: action.refresh,
        is_authenticated: true,
        error: ''
      };
    case 'SET_UNAUTH_STATE':
      return {
        ...state,
        token: '',
        refreshToken: '',
        is_authenticated: false,
        error: ''
      };
    case 'SET_AUTH_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.userData
      }
    default:
      return state;
  }
}
