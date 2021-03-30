import { PROFILE_USER_DATA, PROFILE_USER_ERROR, PROFILE_USER_FETCH } from './constants';
import { User } from './types';

export interface UserFetch {
    type: typeof PROFILE_USER_FETCH;
}

export interface UserInfo {
    type: typeof PROFILE_USER_DATA;
    payload: User;
}

export interface UserError {
    type: typeof PROFILE_USER_ERROR;
}

export type ProfileAction = UserFetch | UserInfo | UserError;

export const userFetch = (): ProfileAction => ({
    type: PROFILE_USER_FETCH,
});

export const userData = (payload: UserInfo['payload']): ProfileAction => ({
    type: PROFILE_USER_DATA,
    payload,
});

export const userError = (): ProfileAction => ({
    type: PROFILE_USER_ERROR,
});
