import { SEA_WALLET_FETCH, SEA_WALLET_DATA, SEA_WALLET_ERROR } from './constants';

export interface WalletFetch {
    type: typeof SEA_WALLET_FETCH;
}

export interface WalletData {
    type: typeof SEA_WALLET_DATA;
    payload: any;
}

export interface WalletError {
    type: typeof SEA_WALLET_ERROR;
}

export type WalletActions = WalletFetch | WalletData | WalletError;

export const walletFetch = (): WalletActions => ({
    type: SEA_WALLET_FETCH,
});

export const walletData = (payload: WalletData['payload']): WalletActions => ({
    type: SEA_WALLET_DATA,
    payload,
});

export const walletError = (): WalletActions => ({
    type: SEA_WALLET_ERROR,
});
