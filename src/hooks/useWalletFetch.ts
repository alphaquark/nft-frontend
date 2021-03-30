import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWallets, walletFetch } from '../modules';

export const useWalletFetch = () => {
    const shouldDispatch = useSelector(selectWallets);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (shouldDispatch) {
            dispatch(walletFetch());
        }
    }, [dispatch, shouldDispatch]);
};
