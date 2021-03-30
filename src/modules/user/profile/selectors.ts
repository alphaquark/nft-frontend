import { RootState } from '../..';
import { User } from './types';

export const selectUserInfo = (state: RootState): User => state.user.user;
