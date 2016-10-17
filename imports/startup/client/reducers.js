export const postReducer = (state = {term: ''}, action = {}) => {
  switch (action.type) {
    case 'SEARCH_POSTS':
      return {...state, term: action.term}
    default:
      return state;
  }
}
