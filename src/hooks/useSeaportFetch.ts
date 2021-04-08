import { Network, OpenSeaPort } from 'opensea-js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { web3Provider } from 'src/constant';
import { selectSeaport, seaportData } from '../modules';

export const useSeaportFetch = (): void => {
    const shouldDispatch = useSelector(selectSeaport);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shouldDispatch) {
            dispatch(
                seaportData(
                    new OpenSeaPort(web3Provider, {
                        networkName: Network[window?.env?.NETWORK ? window.env.NETWORK : 'Rinkeby'],
                        apiKey: '11671121b01f4beb9317229a88785834',
                    })
                )
            );
        }
    }, [dispatch, shouldDispatch]);
};
