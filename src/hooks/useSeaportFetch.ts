import { Network, OpenSeaPort } from 'opensea-js';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { web3Provider } from 'src/constant';
import { selectSeaport, seaportData } from '../modules';

export const useSeaportFetch = () => {
    const shouldDispatch = useSelector(selectSeaport);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!shouldDispatch) {
            dispatch(
                seaportData(
                    new OpenSeaPort(web3Provider, {
                        networkName: Network.Rinkeby,
                    })
                )
            );
        }
    }, [dispatch, shouldDispatch]);
};
