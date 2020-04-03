const initialState = {
  isLoading: false,
  isLoadingMore: false,
  sort_order: [],
  error: false,
  reset: false
}

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'SEARCH_PROSPECTS':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SEARCH_PROSPECTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false
      }
    case 'SEARCH_PROSPECTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case 'SEARCH_PROSPECTS_NEXT_PAGE':
      return {
        ...state,
        isLoadingMore: true
      }
    case 'SEARCH_PROSPECTS_NEXT_PAGE_SUCCESS':
      return {
        ...state,
        isLoadingMore: false,
      }
    case 'SEARCH_RESET_RESULTS':
      return {
        ...state,
        sort_order: []
      };
    case 'SET_SEARCH_PROSPECT_IDS':
      return {
        ...state,
        sort_order: [...state.sort_order, ...action.payload]
      };
    default:
      return state;
  }
}
