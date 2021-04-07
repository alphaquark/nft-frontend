import React from 'react';

import styled from 'styled-components';

import { toUnitAmount } from 'src/constant';

const OrderWrapper = styled.div`
    * {
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        color: white;
    }
    flex: 1;
    max-width: 255px;
    min-width: 255px;
    min-height: 356px;
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
    img {
        max-width: 255px;
        min-width: 255px;
        max-height: 356px;
    }
`;

export interface OrderProps {
    order: any;
    wallet?: boolean;
    onClick: () => void;
}

export const Order: React.FC<OrderProps> = ({ order, onClick }) => {
    const { asset } = order;
    const { imageUrl, name, sellOrders } = asset;
    // const owner = asset ? asset.owner : assetBundle.assets[0].owner;
    return (
        <OrderWrapper onClick={onClick}>
            <div>
                <img src={imageUrl} alt="img" />
            </div>

            <div>
                <div>{name}</div>
                {order?.currentPrice && (
                    <div>{`${toUnitAmount(order?.currentPrice, order?.paymentTokenContract).toString()} ${
                        order.paymentTokenContract.symbol
                    }`}</div>
                )}
            </div>
            <div>
                {sellOrders?.length
                    ? `${toUnitAmount(
                          sellOrders?.length && sellOrders[0]?.currentPrice,
                          sellOrders?.length && sellOrders[0]?.paymentTokenContract
                      )?.toString()} ${sellOrders[0]?.paymentTokenContract?.symbol}`
                    : null}
            </div>
        </OrderWrapper>
    );
};
