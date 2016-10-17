export const searchPosts = ({term}) => {
  return {type: 'SEARCH_POSTS', term};
};

export const fetchAllPosts = () => {
  return {type: 'FETCH_ALL'};
};
