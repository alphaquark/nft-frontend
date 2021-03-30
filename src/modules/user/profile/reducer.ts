import { ProfileAction } from './actions';
import { PROFILE_USER_DATA, PROFILE_USER_ERROR, PROFILE_USER_FETCH } from './constants';
import { User } from './types';

export interface ProfileState {
    user: User;
    isFetching: boolean;
}

export const initialStateProfile: ProfileState = {
    user: {
        email: '',
        level: 0,
        otp: false,
        role: '',
        state: '',
        uid: '',
        profiles: [],
        phones: [
            {
                country: '',
                number: '',
                validated_at: '',
            },
        ],
    },
    isFetching: false,
};

export const userReducer = (state = initialStateProfile, action: ProfileAction): ProfileState => {
    switch (action.type) {
        case PROFILE_USER_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case PROFILE_USER_DATA:
            return {
                ...state,
                isFetching: false,
                user: action.payload,
            };
        case PROFILE_USER_ERROR:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};
