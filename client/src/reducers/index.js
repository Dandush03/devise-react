import { combineReducers } from 'redux';
import csrfFields from './csrfFields';

import userReducer from './userReducer';

export default combineReducers({
  user: userReducer,
  csrfFields,
});
