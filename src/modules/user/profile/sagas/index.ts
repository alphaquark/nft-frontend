// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';

import { PROFILE_USER_FETCH } from '../constants';
import { userSaga } from './userSaga';

// eslint-disable-next-line
export function* rootProfileSaga() {
    yield takeEvery(PROFILE_USER_FETCH, userSaga);
}
