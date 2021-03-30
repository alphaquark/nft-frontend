import { SeaportActions } from './actions';
import { SEAPORT_SAVE, SEAPORT_DATA, SEAPORT_ERROR, SEAPORT_ACCOUNT_DATA } from './constants';

export interface CommonState {
    loading: boolean;
    success: boolean;
    error: boolean;
    data: any;
    seaport: any;
    account: any;
}

export const initialCommonState: CommonState = {
    loading: false,
    success: false,
    error: false,
    data: [],
    seaport: null,
    account: null,
};

export const commonReducer = (state = initialCommonState, action: SeaportActions): CommonState => {
    switch (action.type) {
        case SEAPORT_SAVE:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
            };
        case SEAPORT_DATA:
            return {
                ...state,
                loading: false,
                success: true,
                seaport: action.payload,
            };
        case SEAPORT_ACCOUNT_DATA:
            return {
                ...state,
                loading: false,
                success: true,
                account: action.payload,
            };
        case SEAPORT_ERROR:
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
