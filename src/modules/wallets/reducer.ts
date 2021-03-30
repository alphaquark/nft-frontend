import { WalletActions } from './actions';
import { SEA_WALLET_FETCH, SEA_WALLET_DATA, SEA_WALLET_ERROR } from './constants';

export interface WalletState {
    loading: boolean;
    success: boolean;
    error: boolean;
    data: any;
}

export const initialWalletState: WalletState = {
    loading: false,
    success: false,
    error: false,
    data: [],
};

export const walletReducer = (state = initialWalletState, action: WalletActions): WalletState => {
    switch (action.type) {
        case SEA_WALLET_FETCH:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
            };
        case SEA_WALLET_DATA:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload,
            };
        case SEA_WALLET_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }
};
