// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';

import { SEA_WALLET_FETCH } from '../constants';
import { walletFetchSaga } from './walletFetchSaga';

// eslint-disable-next-line
export function* rootWalletSaga() {
    yield takeEvery(SEA_WALLET_FETCH, walletFetchSaga);
}
