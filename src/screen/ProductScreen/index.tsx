import React from 'react';
import { Order } from '../../components';
import { PRODUCT_CONTRACT } from '../../constant';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ProductScreen = ({ account, seaport }) => {
    const [orders, setOrders] = React.useState<any>(null);
    const [count, setCount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const history = useHistory();
    const { ethereum } = window as any;

    const handleEthereum = async () => {
        try {
            await ethereum.enable();
        } catch (e) {
            history.go(0);
        }
    };

    React.useEffect(() => {
        if (seaport && account) {
            const asyncFunction = async () => {
                try {
                    if (!seaport) {
                        throw new Error('null seaport');
                    }
                    setLoading(true);
                    const { assets } = await seaport.api.getAssets({
                        asset_contract_addresses: [PRODUCT_CONTRACT],
                    });
                    setOrders(assets);
                    setCount(count);
                    setLoading(false);
                } catch (e) {
                    setError(true);
                    console.error(e);
                }
            };
            asyncFunction();
        }
    }, [account, seaport, count]);

    return !error ? (
        loading ? (
            <div>loading</div>
        ) : account?.length ? (
            <div>
                <div>asset_contract_address: {PRODUCT_CONTRACT}</div>
                <div>current_account_address: {account}</div>
                <div>count: {count}</div>
                <PerfectScrollbar>
                    <FlexWrapper>
                        {orders?.map((order: any, i: number) => (
                            <Order
                                key={i}
                                order={{ asset: order }}
                                seaport={seaport}
                                accountAddress={account}
                                onClick={() => history.push(`/detail/${order.tokenAddress}/${order.tokenId}`)}
                            />
                        ))}
                    </FlexWrapper>
                </PerfectScrollbar>
            </div>
        ) : (
            <button onClick={handleEthereum}>connect</button>
        )
    ) : (
        <div>error!</div>
    );
};

const FlexWrapper = styled.div`
    display: flex;
    grid-gap: 20px;
    margin-bottom: 30px;
`;

export { ProductScreen };
