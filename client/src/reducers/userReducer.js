import * as types from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESSFUL:
      return { ...action.payload, logged: true };
    case types.USER_LOGOUT_SUCCESSFUL:
      return { logged: false };
    default:
      return state;
  }
};
