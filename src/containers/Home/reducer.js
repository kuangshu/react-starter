import merge from 'lodash/merge';

const base = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return merge(state, {
        filter: action.filter,
      });
    default:
      return state;
  }
};

export default base;
