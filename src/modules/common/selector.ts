import { RootState } from '..';

export const selectSeaport = (state: RootState): any => state.common.seaport;
export const selectAccount = (state: RootState): any => state.common.account;
