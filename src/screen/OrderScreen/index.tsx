import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import { useLocation } from 'react-router';

import { connectWallet, promisify, toUnitAmount } from 'src/constant';
import { QUERY_SAMPLE } from 'src/gql';
import { Button, Modal } from 'src/components';
import ERC20 from 'src/abi/erc20.json';

const ModalHeader = styled.div`
    color: black !important;
    padding-top: 10px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 20px;
    line-height: 23px;
    * {
        color: black !important;
    }
`;

const HistoryWrapper = styled.div`
    margin-top: 46px;
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    > div:last-child {
        border: 1px solid #5c5c71;
        > div {
            display: flex;
            > div {
                flex: 1;
                display: flex;
            }
        }
        > div:first-child {
            border-bottom: 1px solid #5c5c71;
            padding: 17px;
        }
        > div:last-child {
            flex-direction: column;
            > div:hover {
                background: linear-gradient(90deg, rgba(93, 99, 255, 0.3) 0%, rgba(93, 99, 255, 0) 100%);
            }
            * {
                font-size: 14px;
                line-height: 16px;
            }
            > div {
                display: flex;
                padding: 17px;
                border-bottom: 1px solid #5c5c71;
                > div {
                    flex: 1;
                }
            }
            > div:last-child {
                border-bottom: none;
            }
        }
    }
    margin-bottom: 240px;
`;

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
    * {
        color: black;
    }
    .transfer {
        border: none;
        background: #564ff5;
        border-radius: 100px;
        color: white;
        padding: 4px 10px;
        line-height: 20px;
        margin-right: 10px;
        font-size: 13px;
    }
    > div {
        margin: auto;
        max-width: 935px;
        min-width: 935px;
        padding: 32px;
        background: white;
        display: flex;
        grid-gap: 49px;
        border-radius: 10px;
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
                        flex-direction: column;
                        grid-gap: 18px;
                        > div {
                            display: Flex;
                            > div:first-child {
                                font-size: 16px;
                                line-height: 19px;

                                color: #5d63ff;
                            }
                            > div:last-child {
                                margin-left: auto;
                                display: flex;
                                flex-direction: column;
                                grid-gap: 10px;
                                * {
                                    text-align: right;
                                    font-weight: 500;
                                }
                            }
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

const OrderScreen: React.FC<{ account: any; seaport: any }> = ({ account, seaport }) => {
    const [orders, setOrders] = useState<any>(null);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [ordering, setOrdering] = useState<boolean>(false);
    const [asset, setAsset] = useState<any>(null);
    const [path, setPath] = useState<{ assetContractAddress: string; tokenId: string }>({
        assetContractAddress: '',
        tokenId: '',
    });
    const [owner, setOwner] = useState<boolean>(false);
    const [balance, setBalance] = useState<{ eth: string; target: { id: ''; address: ''; balance: '' } }>({
        eth: '',
        target: { id: '', address: '', balance: '' },
    });
    const [modalState, setModalState] = useState<boolean>(false);

    const location = useLocation();

    const [call, { loading: queryLoading, data: queryData }] = useLazyQuery(QUERY_SAMPLE, {
        variables: { assetContractAddress: path.assetContractAddress, tokenId: path.tokenId },
    });

    useEffect(() => {
        if (!queryLoading) {
            // console.log(queryData);
        }
    }, [queryData, queryLoading]);

    useEffect(() => {
        setPath({ assetContractAddress: location.pathname.split('/')[2], tokenId: location.pathname.split('/')[3] });
        call();
    }, [location, call]);

    useEffect(() => {
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

                    const promiseBalance = promisify((cb) => seaport.web3.eth.getBalance(account, cb));

                    const erc20 = seaport.web3.eth
                        .contract(ERC20)
                        .at(orders[0]?.paymentTokenContract.address || '0x0000000000000000000000000000000000000000');
                    const balance: any = await promiseBalance;
                    const promiseTokenBalance = promisify((cb) => erc20.balanceOf(account, cb));
                    const tokenBalance: any = await promiseTokenBalance;

                    setOwner(account && account.toLowerCase() === asset.owner.address.toLowerCase());
                    setBalance({
                        eth: balance.toString(),
                        target: {
                            id: orders[0]?.paymentTokenContract.symbol,
                            address: orders[0]?.paymentTokenContract.address,
                            balance: tokenBalance.toString(),
                        },
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
    }, [account, seaport, path, count]);

    const fulfillOrder = async () => {
        const { asset, assetBundle } = orders[0];
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
            await seaport.fulfillOrder({ order: orders[0], accountAddress: account });
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
                        {modalState && (
                            <Modal
                                header={<ModalHeader>SWAP to {balance.target.id}</ModalHeader>}
                                body={
                                    <div>
                                        <iframe
                                            width="400"
                                            height="500"
                                            title={balance.target.address}
                                            src={`https://app.uniswap.org/#/swap?outputCurrency=${
                                                balance.target.address
                                            }&theme=light&exactAmount=${toUnitAmount(
                                                orders?.length && orders[0]?.currentPrice,
                                                orders?.length && orders[0]?.paymentTokenContract
                                            )?.toString()}&exactField=output`}
                                        />
                                    </div>
                                }
                                hiddenLabel={true}
                                width={500}
                                close={() => setModalState(!modalState)}
                                closeLabel={'close'}
                                submit={() => setModalState(!modalState)}
                                submitLabel={'ok'}
                            />
                        )}
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
                                                        <div>
                                                            <div>My Balance</div>
                                                            <div>
                                                                <div>{`${+balance.eth / 1e18} ETH`}</div>
                                                                {balance.target.id.toUpperCase() !== 'ETH' && (
                                                                    <div>
                                                                        <button
                                                                            className="transfer"
                                                                            onClick={() => setModalState(!modalState)}>
                                                                            Transfer
                                                                        </button>
                                                                        <span>
                                                                            {`${+balance.target.balance / 1e18} ${
                                                                                balance.target.id
                                                                            }`}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>PRICE</div>
                                                            <div>
                                                                {`${toUnitAmount(
                                                                    orders[0]?.currentPrice,
                                                                    orders[0]?.paymentTokenContract
                                                                )?.toString()}
                        ${orders[0]?.paymentTokenContract?.symbol}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="btnWrapper">
                                                        {!owner ? (
                                                            <Button
                                                                variant={ordering ? 'secondary' : 'primary'}
                                                                disabled={
                                                                    ordering ||
                                                                    toUnitAmount(
                                                                        orders?.length && orders[0]?.currentPrice,
                                                                        orders?.length &&
                                                                            orders[0]?.paymentTokenContract
                                                                    )?.toString() >=
                                                                        (balance.target.id.toUpperCase() !== 'ETH'
                                                                            ? (
                                                                                  +balance.target.balance / 1e18
                                                                              ).toString()
                                                                            : (+balance.eth / 1e18).toString())
                                                                }
                                                                onClick={fulfillOrder}>
                                                                {ordering
                                                                    ? 'Processing...'
                                                                    : toUnitAmount(
                                                                          orders?.length && orders[0]?.currentPrice,
                                                                          orders?.length &&
                                                                              orders[0]?.paymentTokenContract
                                                                      )?.toString() >=
                                                                      (balance.target.id.toUpperCase() !== 'ETH'
                                                                          ? (+balance.target.balance / 1e18).toString()
                                                                          : (+balance.eth / 1e18).toString())
                                                                    ? 'Insufficient balance'
                                                                    : 'Buy Order'}
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
                        <HistoryWrapper>
                            <div>Trading History</div>
                            <div>
                                <div>
                                    <div>Event</div>
                                    <div>Date / Time</div>
                                    <div>From</div>
                                    <div>To</div>
                                </div>
                                <div>
                                    {queryData?.assetEvents?.edges.map(({ node }, i) => {
                                        return (
                                            <div key={`${node.id}${i}`}>
                                                <div>{node?.eventType}</div>
                                                <div>{node?.eventTimestamp}</div>
                                                <div>
                                                    {node?.fromAccount?.address === account
                                                        ? 'you'
                                                        : node?.fromAccount?.address?.slice(0, 8)}
                                                </div>
                                                <div>
                                                    {node?.toAccount?.address === account
                                                        ? 'you'
                                                        : node?.toAccount?.address?.slice(0, 8)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </HistoryWrapper>
                    </React.Fragment>
                )
            ) : (
                <div>error!</div>
            )}
        </OrderScreenWrapper>
    );
};

export { OrderScreen };
