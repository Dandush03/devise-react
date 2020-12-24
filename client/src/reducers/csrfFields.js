import * as types from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case types.USER_LOGIN_FIELDS:
      return { ...action.payload };
    case types.USER_LOGOUT_SUCCESSFUL:
      return { resource_name: null, csrf_tag: null };
    default:
      return state;
  }
};
