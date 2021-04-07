import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { Header } from 'src/components';
import Circle from 'src/assets/market.svg';
import MarketBg from 'src/assets/marketplace_bg.png';

import AddFolder from 'src/assets/addFolder.svg';
import Cargo from 'src/assets/cargo.svg';
import Folder from 'src/assets/folder.svg';
import Mintable from 'src/assets/mintable.svg';
import Mintbase from 'src/assets/mintbase.svg';
import Rarible from 'src/assets/rarible.svg';

const MarketWrapper = styled.div`
    margin-top: 310px;
    display: flex;
    flex-direction: column;
    > div:first-child {
        margin: auto;
        text-align: center;
        font-size: 28px;
        line-height: 42px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 138px;
    }
    > div {
        margin: auto;
    }
    > div:nth-child(2) {
        * {
            color: white;
        }
        display: flex;
        flex-direction: column;
        grid-gap: 120px;

        > div:last-child {
            display: flex;
            justify-content: space-between;
            max-width: 473px;
            min-width: 473px;
            margin: auto;
            font-size: 16px;
            line-height: 24px;
            > div {
                display: flex;
                flex-direction: column;
                grid-gap: 20px;
                > div {
                    min-width: 120px;
                    max-width: 120px;
                    margin: auto;
                    text-align: center;
                }
            }
        }
    }
    > div:nth-child(3) {
        margin-top: 220px;
        margin-bottom: 220px;
        display: flex;
        flex-direction: column;
        grid-gap: 120px;
        > div:first-child {
            margin: auto;
            color: white;
            font-size: 28px;
            line-height: 30px;
        }
        > div {
            display: flex;
        }
        > div:last-child {
            grid-gap: 24px;
            > div {
                display: flex;
                grid-gap: 14px;
                flex-direction: column;
                border-bottom: 1px solid #ffffff;
                max-width: 330px;
                min-width: 330px;
                * {
                    color: white;
                }
                > div:first-child {
                    text-align: center;
                    font-size: 20px;
                    line-height: 40px;
                    display: flex;
                    margin: auto;
                    grid-gap: 12px;
                    > div {
                        display: flex;
                    }
                    img {
                        margin: auto;
                    }
                }
                > div:last-child {
                    min-width: 290px;
                    max-width: 290px;
                    margin: auto;
                    margin-bottom: 50px;
                    text-align: center;
                    font-size: 16px;
                    line-height: 32px;
                    color: #9d91d0;
                }
            }
        }
    }
    > div:last-child {
        background: url(${({ bg }) => bg}) no-repeat;
        background-size: 100% 830px;
        min-height: 830px;
        margin: unset;
        display: flex;
        flex-direction: column;
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

export const MarketScreen: React.FC = () => {
    const { formatMessage } = useIntl();

    const MINTABLE_ASSETS = [
        {
            header: 'Rarible',
            img: Rarible,
            content:
                'Rarible is a community-governed platform for creating digital assets, with support for the ERC1155 standard.',
        },
        {
            header: 'Mintbase',
            img: Mintbase,
            content:
                'Mintbase is a refined platform for creating digital assets, with support for batch minting ERC721s.',
        },
        {
            header: 'Cargo',
            img: Cargo,
            content: 'Cargo is a token minting platform specializing in efficient batch minting of ERC721s,',
        },
        {
            header: 'Mintable',
            img: Mintable,
            content: 'Mintable is a community controlled token minting platform with some unique features.',
        },
    ];
    return (
        <React.Fragment>
            <Header />
            <MarketWrapper bg={MarketBg}>
                <div>
                    {formatMessage({
                        id: 'Where you can create your own NFT without coding, Where you can sell and buy NFT items',
                    })}
                </div>
                <div>
                    <div>
                        <div>
                            <div>
                                <img src={Folder} />
                            </div>
                            <div>Create your own, new collection</div>
                        </div>
                        <div>
                            <div>
                                <img src={AddFolder} />
                            </div>
                            <div>Add on existing collection</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>You can mint NFT by using these tools..</div>
                    <div>
                        {MINTABLE_ASSETS.map((e, i) => {
                            return (
                                <div key={i}>
                                    <div>
                                        <div>
                                            <img src={e.img} alt={e.header} />
                                        </div>
                                        <div>{e.header}</div>
                                    </div>
                                    <div>{e.content}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <img src={Circle} alt="market" />
                </div>
                <div>
                    <div>
                        {formatMessage({ id: 'Marketplace for users' })}
                        <span>{formatMessage({ id: 'Coming soon' })}</span>
                    </div>
                </div>
            </MarketWrapper>
        </React.Fragment>
    );
};
