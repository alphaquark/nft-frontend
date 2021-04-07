import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { Header } from 'src/components';
import MarketBg from 'src/assets/marketplace_bg.png';

const MarketWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    > div {
        margin: auto;
    }
    > div:last-child {
        background: url(${({ bg }) => bg}) no-repeat;
        background-size: 100% 830px;
        background-position: bottom;
        margin: unset;
        display: flex;
        flex-direction: column;
        flex: 1;
        > div {
            margin: auto;
            font-size: 28px;
            line-height: 42px;
            text-align: center;
            color: #ffffff;

            span {
                display: block;
                font-weight: bold;
            }
        }
    }
    * {
        white-space: pre-wrap;
    }
`;

export const DefaultScreen: React.FC = () => {
    const { formatMessage } = useIntl();
    return (
        <React.Fragment>
            <Header />
            <MarketWrapper bg={MarketBg}>
                <div>
                    <div>
                        <span>{formatMessage({ id: 'Coming soon' })}</span>
                    </div>
                </div>
            </MarketWrapper>
        </React.Fragment>
    );
};
