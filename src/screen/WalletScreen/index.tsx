import React from 'react';
import { PRODUCT_CONTRACT } from '../../constant';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';
import { Button, Modal, Order } from 'src/components';

const WalletScreen = ({ account, seaport }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [assets, setAssets] = React.useState<any>(null);
    const [modalState, setModalState] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<number | null>(null);
    const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [amount, setAmount] = React.useState<number>(0);

    React.useEffect(() => {
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

    const handleSelectedButton = () => {
        if (selected) {
            return (
                <Button onClick={() => setSelected(null)} variant="secondary">
                    Cancel
                </Button>
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
            });
        } catch (e) {
            console.log(e);
        } finally {
            setModalState(!modalState);
            setDisabled(false);
        }
    };

    const handleSelected = (i, order) => {
        setSelectedOrder(order);
        setSelected(i);
    };

    return (
        <React.Fragment>
            <WalletScreenWrapper>
                <div>My NFTs</div>
                {!error ? (
                    loading ? (
                        <div>loading</div>
                    ) : (
                        <div>
                            <PerfectScrollbar>
                                <FlexWrapper>
                                    {assets?.map((asset: any, i: number) => (
                                        <OrderWrapper index={i} selected={selected}>
                                            <Order
                                                key={i}
                                                order={{ asset }}
                                                seaport={seaport}
                                                accountAddress={account}
                                                onClick={() => handleSelected(i, asset)}
                                            />
                                        </OrderWrapper>
                                    ))}
                                </FlexWrapper>
                            </PerfectScrollbar>
                            <ButtonWrapper>
                                <Button onClick={() => setModalState(!modalState)} variant="primary">
                                    Sell
                                </Button>
                                {handleSelectedButton()}
                            </ButtonWrapper>
                        </div>
                    )
                ) : (
                    <div>error!</div>
                )}
            </WalletScreenWrapper>
            {modalState && (
                <Modal
                    header={<div>Checkout</div>}
                    body={
                        <div>
                            <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
                        </div>
                    }
                    width={500}
                    close={() => setModalState(!modalState)}
                    closeLabel={'close'}
                    submit={handleSubmit}
                    submitLabel={'ok'}
                    buttonDisabled={disabled}
                />
            )}
        </React.Fragment>
    );
};

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
    ${({ selected, index }) => selected === index && `box-shadow: inset 0 0 0 2px #5d63ff;`}
`;

const FlexWrapper = styled.div`
    display: flex;
    grid-gap: 20px;
    margin-bottom: 30px;
`;

export { WalletScreen };
