import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectWallets, walletFetch } from '../modules';

export const useWalletFetch = (): void => {
    const shouldDispatch = useSelector(selectWallets);
    const dispatch = useDispatch();

    useEffect(() => {
        if (shouldDispatch) {
            dispatch(walletFetch());
        }
    }, [dispatch, shouldDispatch]);
};
