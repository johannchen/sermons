export const postReducer = (state = {term: ''}, action = {}) => {
  switch (action.type) {
    case 'SEARCH_POSTS':
      return {...state, term: action.term}
    case 'FETCH_ALL':
      return {...state, term: ''}
    default:
      return state;
  }
}
