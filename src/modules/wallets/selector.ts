import { RootState } from '..';

export const selectWallets = (state: RootState): any => state.wallet.data;
