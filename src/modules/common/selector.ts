import { RootState } from '..';

export const selectSeaport = (state: RootState) => state.common.seaport;
export const selectAccount = (state: RootState) => state.common.account;
