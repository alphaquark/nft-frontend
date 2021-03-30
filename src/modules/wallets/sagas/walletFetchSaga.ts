// tslint:disable-next-line
import { put } from 'redux-saga/effects';

import { walletData, walletError } from '../actions';

// eslint-disable-next-line
export function* walletFetchSaga() {
    // export function* apiKeyCreateSaga(action: ApiKeyCreateFetch) {
    try {
        // const getUser = () => axios.get('http://0.0.0.0:9002/api/user/me');
        // const user = yield call(getUser);
        yield put(walletData('hell'));
    } catch (error) {
        yield put(walletError());
    }
}
