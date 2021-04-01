import React from 'react';
import { connectWallet, toUnitAmount } from '../../constant';
import { useLocation } from 'react-router';
import { QUERY_SAMPLE } from 'src/gql';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button } from 'src/components';

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
    const [owner, setOwner] = React.useState<boolean>(false);
    const location = useLocation();

    const [call, { loading: queryLoading, data: queryData }] = useLazyQuery(QUERY_SAMPLE, {
        variables: { assetContractAddress: path.assetContractAddress, tokenId: path.tokenId },
    });

    React.useEffect(() => {
        if (!queryLoading) {
            // console.log(queryData);
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

                    setOwner(account && account.toLowerCase() === asset.owner.address.toLowerCase());
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
    }, [account, seaport, path, count]);

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

    return (
        <OrderScreenWrapper>
            {!error ? (
                loading ? (
                    <div>loading</div>
                ) : (
                    <React.Fragment>
                        {asset && (
                            <BannerWrapper>
                                <div>
                                    <div>
                                        <img src={asset?.imageUrl} alt={asset?.imageUrl} />
                                    </div>
                                    <div>
                                        <div>{asset?.name}</div>
                                        <div>
                                            {orders?.length ? (
                                                <div>
                                                    <div>
                                                        <div>PRICE</div>
                                                        <div>
                                                            {ordering
                                                                ? 'ordered'
                                                                : `${toUnitAmount(
                                                                      orders[0]?.currentPrice,
                                                                      orders[0]?.paymentTokenContract
                                                                  )?.toString()}
                        ${orders[0]?.paymentTokenContract?.symbol}`}
                                                        </div>
                                                    </div>
                                                    <div className="btnWrapper">
                                                        {!owner ? (
                                                            <Button
                                                                variant={'primary'}
                                                                disabled={ordering}
                                                                onClick={fulfillOrder}>
                                                                Buy Order
                                                            </Button>
                                                        ) : (
                                                            <Button variant="secondary">My Asset</Button>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="btnWrapper">
                                                        <Button variant={'secondary'} disabled={true}>
                                                            CLOSED
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </BannerWrapper>
                        )}
                        <InformationWrapper>
                            <div>Information</div>
                            <div>{asset?.description}</div>
                        </InformationWrapper>
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
                    </React.Fragment>
                )
            ) : (
                <div>error!</div>
            )}
        </OrderScreenWrapper>
    );
};

const InformationWrapper = styled.div`
    margin-top: 97px;
    margin-bottom: 87px;
    display: flex;
    flex-direction: column;
    grid-gap: 22px;
    > div:first-child {
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
    }
    > div:last-child {
        font-size: 14px;
        line-height: 26px;
        opacity: 0.5;
    }
`;

const OrderScreenWrapper = styled.div`
    * {
        color: white;
    }
`;

const BannerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        margin: auto;
        max-width: 935px;
        min-width: 935px;
        padding: 32px;
        background: #242448;
        display: flex;
        grid-gap: 49px;
        img {
            min-width: 320px;
            max-width: 320px;
            min-height: 320px;
            max-height: 320px;
        }
        > div:last-child {
            display: flex;
            flex-direction: column;
            flex: 1;
            > div:first-child {
                font-weight: 500;
                font-size: 22px;
                line-height: 26px;
                margin-bottom: 34px;
            }
            > div:nth-child(2) {
                display: flex;
                flex: 1;
                > div {
                    flex: 1;
                }
                > div:last-child {
                    display: flex;
                    flex-direction: column;
                    > div {
                        display: flex;
                        > div:last-child {
                            margin-left: auto;
                        }
                    }
                }
            }
        }
    }
    .btnWrapper {
        margin-top: auto;
        margin-left: auto;
    }
`;

export { OrderScreen };
