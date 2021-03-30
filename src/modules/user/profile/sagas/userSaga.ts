// tslint:disable-next-line
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { userData } from '../actions';

// eslint-disable-next-line
export function* userSaga() {
    try {
        const getUser = () => axios.get('http://0.0.0.0:9002/api/user/me');
        const user = yield call(getUser);
        yield put(userData(user.data));
    } catch (error) {}
}
