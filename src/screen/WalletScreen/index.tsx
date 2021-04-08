import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { PRODUCT_CONTRACT } from '../../constant';
import { Button, Modal, Order } from 'src/components';
import Metamask from 'src/assets/metamask.svg';

const ModalBody = styled.div`
    display: flex;
    margin-top: 40px;
    margin-bottom: 18px;
    > div:first-child {
        font-weight: 500;
        font-size: 12px;
        line-height: 30px;
        min-height: 30px;
        flex: 0;
        min-width: 100px;
    }
    > div:last-child {
        display: flex;
        position: relative;
        flex: 1;
        input {
            border: ${({ wrong }) => (wrong ? '1px solid #5d63ff' : '1px solid red')};
            font-weight: 500;
            font-size: 12px;
            line-height: 30px;
            min-height: 30px;
            padding: 0 11px;
            padding-right: 45px;
            text-align: right;
            flex: 1;
        }
        span {
            position: absolute;
            right: 8px;
            line-height: 30px;
            min-height: 30px;
            font-size: 12px;
            top: 0;
            font-size: 12px;
            color: #616161;
        }
    }
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        margin: auto;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    grid-gap: 14px;
`;

const WalletScreenWrapper = styled.div`
    * {
        color: white;
    }
    > div:first-child {
        border-bottom: 1px solid #efefef;
        margin-bottom: 30px;
        font-weight: 500;
        font-size: 18px;
        padding-left: 25px;
        padding-bottom: 18px;
    }
`;

const OrderWrapper = styled.div`
    ${({ selected, index }) => selected === index && `outline: 2px solid #5d63ff;`}
`;

const FlexWrapper = styled.div`
    display: flex;
    grid-gap: 20px;
    margin-bottom: 30px;
    padding-top: 3px;
    flex-wrap: wrap;
`;

const MetaMaskContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    button {
        margin: auto;
        cursor: pointer;
        min-height: 50px;
        line-height: 50px;
        font-size: 20px;
        min-width: 200px;
        border-radius: 100px;
        font-weight: bold;
    }
    > div:last-child {
        display: flex;
        grid-gap: 15px;
    }
    > div {
        margin: auto;
        cursor: pointer;
        img {
            min-width: 200px;
            min-height: 200px;
        }
    }
`;

const WalletScreen: React.FC<{ account: any; seaport: any }> = ({ account, seaport }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [assets, setAssets] = useState<any>(null);
    const [modalState, setModalState] = useState<boolean>(false);
    const [selected, setSelected] = useState<any | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>(null);
    const [wrong, setWrong] = useState<boolean>(false);
    const [paymentTokenId, setPaymentTokenID] = useState<any>(null);

    const { ethereum } = window as any;

    useEffect(() => {
        if (seaport && account) {
            const asyncFunction = async () => {
                try {
                    if (!seaport) {
                        throw new Error('null seaport');
                    }
                    setLoading(true);
                    const { assets } = await seaport.api.getAssets({
                        owner: account,
                        asset_contract_addresses: [PRODUCT_CONTRACT],
                    });
                    setAssets(assets);
                    setLoading(false);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
            };
            asyncFunction();
        }
    }, [account, seaport]);

    const handleInputChange = (e) => {
        if (/[+-]?([0-9]*[.])?[0-9]+/.test(amount)) {
            setWrong(true);
        } else {
            setWrong(false);
        }
        setAmount(e.target.value);
    };

    const handleSelectedButton = () => {
        if (selectedOrder) {
            return (
                <React.Fragment>
                    <Button onClick={() => setModalState(!modalState)} variant="primary">
                        Sell
                    </Button>
                    <Button
                        onClick={() => {
                            setSelected(null);
                            setSelectedOrder(null);
                        }}
                        variant="secondary">
                        Cancel
                    </Button>
                </React.Fragment>
            );
        }
    };

    const handleSubmit = async () => {
        try {
            setDisabled(true);
            // const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
            await seaport.createSellOrder({
                asset: selectedOrder,
                accountAddress: account,
                startAmount: amount,
                // expirationTime,
                paymentTokenAddress: paymentTokenId,
            });
        } catch (e) {
        } finally {
            setModalState(!modalState);
            setDisabled(false);
        }
    };

    const handleSelected = async (i, order) => {
        try {
            const { tokens } = await seaport.api.getPaymentTokens({ symbol: 'AQT' });
            setPaymentTokenID(tokens[0]?.address);
            setSelectedOrder(order);
            setSelected(i);
        } catch (e) {
            console.warn(e);
        }
    };

    const handleEthereum = useCallback(async () => {
        try {
            if (ethereum) {
                await ethereum.enable();
            } else {
                alert('Please install Metamask plugin');
            }
        } catch (e) {
            alert('Login processing, please try again');
            history.go(0);
        }
    }, [ethereum, history]);

    return (
        <React.Fragment>
            <WalletScreenWrapper>
                <div>My NFTs</div>
                {!error ? (
                    loading ? (
                        <div>loading</div>
                    ) : account?.length ? (
                        <div>
                            <FlexWrapper>
                                {assets?.map((asset: any, i: number) => (
                                    <OrderWrapper index={i} key={i} selected={selected}>
                                        <Order key={i} order={{ asset }} onClick={() => handleSelected(i, asset)} />
                                    </OrderWrapper>
                                ))}
                            </FlexWrapper>
                            <ButtonWrapper>{handleSelectedButton()}</ButtonWrapper>
                        </div>
                    ) : (
                        <MetaMaskContainer>
                            <div onClick={handleEthereum}>
                                <img src={Metamask} alt="metamask" />
                            </div>
                            <div>
                                <Button variant="primary" onClick={handleEthereum}>
                                    Metamask Connect
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => window.open('https://metamask.io/download.html')}>
                                    Download
                                </Button>
                            </div>
                        </MetaMaskContainer>
                    )
                ) : (
                    <div>error!</div>
                )}
            </WalletScreenWrapper>
            {modalState && (
                <Modal
                    header={
                        <ModalHeader>
                            <div>Listing your NFT</div>
                        </ModalHeader>
                    }
                    body={
                        <ModalBody wrong={wrong}>
                            <div>Price</div>
                            <div>
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleInputChange}
                                    onBlur={handleInputChange}
                                />
                                <span>{paymentTokenId ? 'AQT' : 'ETH'}</span>
                            </div>
                        </ModalBody>
                    }
                    width={400}
                    close={() => {
                        setModalState(!modalState);
                        setAmount(null);
                    }}
                    closeLabel={'Cancel'}
                    submit={handleSubmit}
                    submitLabel={disabled ? 'Processing' : 'List'}
                    buttonDisabled={disabled || !wrong}
                />
            )}
        </React.Fragment>
    );
};

export { WalletScreen };
