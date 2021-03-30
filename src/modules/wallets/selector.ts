import { RootState } from '..';

export const selectWallets = (state: RootState) => state.wallet.data;
