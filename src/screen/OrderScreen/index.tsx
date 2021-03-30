import React from 'react';
import { connectWallet, PRODUCT_CONTRACT, toUnitAmount } from '../../constant';
import { useLocation } from 'react-router';
import { QUERY_SAMPLE } from 'src/gql';
import { useLazyQuery } from '@apollo/client';

const OrderScreen = ({ account, seaport }) => {
    const [orders, setOrders] = React.useState<any>(null);
    const [count, setCount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [ordering, setOrdering] = React.useState<boolean>(false);
    const [asset, setAsset] = React.useState<any>(null);
    const [path, setPath] = React.useState<{ assetContractAddress: string; tokenId: string }>({
        assetContractAddress: '',
        tokenId: '',
    });
    const location = useLocation();

    const [call, { loading: queryLoading, data: queryData }] = useLazyQuery(QUERY_SAMPLE, {
        variables: { assetContractAddress: path.assetContractAddress, tokenId: path.tokenId },
    });

    React.useEffect(() => {
        if (!queryLoading) {
            console.log(queryData);
        }
    }, [queryData, queryLoading]);

    React.useEffect(() => {
        setPath({ assetContractAddress: location.pathname.split('/')[2], tokenId: location.pathname.split('/')[3] });
        call();
    }, [location, call]);

    React.useEffect(() => {
        if (seaport && account && path.assetContractAddress && path.tokenId) {
            const asyncFunction = async () => {
                try {
                    if (!seaport) {
                        throw new Error('null seaport');
                    }
                    setLoading(true);
                    const asset = await seaport.api.getAsset({
                        tokenAddress: path.assetContractAddress,
                        tokenId: path.tokenId,
                    });
                    const { orders } = await seaport.api.getOrders({
                        asset_contract_address: path.assetContractAddress,
                        token_id: path.tokenId,
                        side: 1,
                    });
                    setAsset(asset);
                    setOrders(orders);
                    setCount(count);
                    setLoading(false);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
            };
            asyncFunction();
        }
    }, [account, seaport, path, count, asset]);

    const fulfillOrder = async () => {
        const { asset, assetBundle } = orders;
        const owner = asset ? asset.owner : assetBundle.assets[0].owner;
        if (!account) {
            await connectWallet();
        }
        const isOwner = account && account.toLowerCase() === owner.address.toLowerCase();
        try {
            setOrdering(true);
            if (isOwner) {
                throw new Error('cant owner get item');
            }
            if (!seaport || !account) {
                throw new Error('error');
            }
            await seaport.fulfillOrder({ order: orders, accountAddress: account });
        } catch (error) {
            alert(error);
        } finally {
            setOrdering(false);
        }
    };
    return !error ? (
        loading ? (
            <div>loading</div>
        ) : (
            <div className="App">
                <div>asset_contract_address: {PRODUCT_CONTRACT}</div>
                <div>current_account_address: {account}</div>
                <div>{count}</div>
                {asset && (
                    <React.Fragment>
                        <div>{asset?.name}</div>
                        <div>{asset?.tokenId}</div>
                        <div>{asset?.imageUrl}</div>
                        <div>{orders?.side}</div>
                        <div>{JSON.stringify(asset?.owner)}</div>
                        <div>
                            {orders?.length && (
                                <button disabled={ordering} onClick={fulfillOrder}>
                                    {ordering
                                        ? 'ordered'
                                        : `${toUnitAmount(
                                              orders[0]?.currentPrice,
                                              orders[0]?.paymentTokenContract
                                          )?.toString()}
                        ${orders[0]?.paymentTokenContract?.symbol}`}
                                </button>
                            )}
                        </div>
                    </React.Fragment>
                )}
                {/* need colume reverse */}
                <div>
                    {queryData?.assetEvents?.edges.map(({ node }, i) => {
                        return (
                            <div key={`${node.id}i`}>
                                <div>{node?.eventType}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    ) : (
        <div>error!</div>
    );
};

export { OrderScreen };
