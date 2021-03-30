import { OpenSeaPort } from 'opensea-js';
import React from 'react';
import { toUnitAmount } from 'src/constant';
import styled from 'styled-components';

export interface OrderProps {
    seaport: OpenSeaPort | null;
    order: any;
    accountAddress: string | null;
    wallet?: boolean;
    onClick: () => void;
}

export const Order: React.FC<OrderProps> = ({ order, onClick }) => {
    const { asset } = order;
    const { imageUrl, tokenId, name, tokenAddress, sellOrders } = asset;
    // const owner = asset ? asset.owner : assetBundle.assets[0].owner;
    return (
        <OrderWrapper onClick={onClick}>
            <div>
                <img src={imageUrl} alt="img" />
            </div>
            <div>{sellOrders ? (sellOrders?.length ? '판매중' : '대기중') : null}</div>
            <div>
                <div>{`${tokenId} ${tokenAddress}`}</div>
                <div>{name}</div>
                {order?.currentPrice && (
                    <div>{`${toUnitAmount(order?.currentPrice, order?.paymentTokenContract).toString()} ${
                        order.paymentTokenContract.symbol
                    }`}</div>
                )}
                {/* <div>{tokenId}</div> */}
                {/* <div>{imageUrl}</div> */}
                {/* <div>{side}</div> */}
                {/* <div>{JSON.stringify(owner)}</div> */}
            </div>
        </OrderWrapper>
    );
};

const OrderWrapper = styled.div`
    * {
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        color: white;
    }
    flex: 1;
    max-width: 254px;
    > div:first-child {
    }
    > div:last-child {
        * {
            font-weight: 500;
            font-size: 14px;
            text-align: center;
            color: white;
        }
    }
`;
