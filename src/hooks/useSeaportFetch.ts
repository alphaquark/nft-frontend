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
                        networkName: Network.Rinkeby,
                        apiKey: process.env.REACT_APP_API_KEY,
                    })
                )
            );
        }
    }, [dispatch, shouldDispatch]);
};
