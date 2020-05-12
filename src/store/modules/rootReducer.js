import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import activity from './activity/reducer';

export default combineReducers({
  auth,
  user,
  activity,
});
