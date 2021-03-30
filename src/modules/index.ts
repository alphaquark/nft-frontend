import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';

import { changeLanguageReducer, LanguageState } from './i18n';
import { ProfileState, rootProfileSaga, userReducer } from './user';
import { rootWalletSaga, WalletState, walletReducer } from './wallets';
import { commonReducer, CommonState } from './common/reducer';

export * from './i18n';
export * from './user/profile';
export * from './wallets';
export * from './common';

export interface RootState {
    i18n: LanguageState;
    user: ProfileState;
    wallet: WalletState;
    common: CommonState;
}

export const rootReducer = combineReducers({
    i18n: changeLanguageReducer,
    user: userReducer,
    wallet: walletReducer,
    common: commonReducer,
});

// eslint-disable-next-line
export function* rootSaga() {
    yield all([call(rootProfileSaga), call(rootWalletSaga)]);
}
