import { SEAPORT_SAVE, SEAPORT_DATA, SEAPORT_ERROR, SEAPORT_ACCOUNT_DATA } from './constants';

export interface SeaportFetch {
    type: typeof SEAPORT_SAVE;
}

export interface SeaportData {
    type: typeof SEAPORT_DATA;
    payload: any;
}

export interface SeaportAccountData {
    type: typeof SEAPORT_ACCOUNT_DATA;
    payload: any;
}

export interface SeaportError {
    type: typeof SEAPORT_ERROR;
}

export type SeaportActions = SeaportFetch | SeaportData | SeaportAccountData | SeaportError;

export const seaportFetch = (): SeaportActions => ({
    type: SEAPORT_SAVE,
});

export const seaportData = (payload: SeaportData['payload']): SeaportActions => ({
    type: SEAPORT_DATA,
    payload,
});

export const seaportAccountData = (payload: SeaportAccountData['payload']): SeaportActions => ({
    type: SEAPORT_DATA,
    payload,
});

export const seaportError = (): SeaportActions => ({
    type: SEAPORT_ERROR,
});
