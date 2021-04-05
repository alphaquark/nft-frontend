import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useIntl } from 'react-intl';

import { Order } from 'src/components';
import { PRODUCT_CONTRACT } from 'src/constant';
import Music from 'src/assets/music.svg';
import Paint from 'src/assets/painting.svg';
import TP from 'src/assets/tp.svg';
import WebToon from 'src/assets/webtoon.svg';

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 180px;
    grid-gap: 40px;
    margin-bottom: 200px;
    > div:first-child {
        margin: auto;
        font-size: 32px;
        line-height: 52px;
        font-weight: bold;
    }
    > div:nth-child(2) {
        ul {
            display: flex;
            flex-direction: column;
            li {
                font-size: 24px;
                line-height: 44px;
            }
            * {
                list-style-type: decimal !important;
            }
            span {
                display: block;
            }
        }
    }
    > div:last-child {
        ul {
            display: flex;
            flex-direction: column;
        }
        li {
            font-size: 16px;
            line-height: 30px;
            color: rgba(255, 255, 255, 0.5);
        }
        * {
            list-style-type: circle !important;
        }
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 180px;
    grid-gap: 40px;
    > div {
        margin: auto;
    }
    > div:last-child {
        font-size: 20px;
        line-height: 32px;
        letter-spacing: 0.03em;
    }
    * {
        font-size: 32px;
        line-height: 52px;
    }
    span {
        font-weight: bold;
    }
`;

const MusicContainer = styled.div`
    margin-top: 160px;
    margin-bottom: 200px;
    display: flex;
    flex-direction: column;
    grid-gap: 80px;
    > div {
        display: flex;
        > div:first-child {
            min-width: 160px;
            display: flex;
            > img {
                margin: auto;
                margin-left: 0;
            }
        }
        > div:last-child {
            display: flex;
            flex-direction: column;
            grid-gap: 30px;
            > div:first-child {
                font-weight: 500;
                font-size: 24px;
            }
            > div:last-child {
                font-size: 16px;
                line-height: 26px;
                opacity: 0.5;
                text-align: justify;
            }
        }
    }
`;

const ProductScreenWrapper = styled.div`
    * {
        color: white;
    }
    > div:first-child {
        display: flex;
        flex-direction: column;
        font-size: 32px;
        line-height: 52px;
        margin-bottom: 60px;
        > div {
            margin: auto;
            letter-spacing: 0.05em;
        }
        > div:first-child {
            font-weight: 500;
        }
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    grid-gap: 20px;
    margin-bottom: 30px;
`;

const ProductScreen: React.FC<{ account: any; seaport: any }> = ({ account, seaport }) => {
    const [orders, setOrders] = useState<any>(null);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const history = useHistory();
    const { formatMessage } = useIntl();
    const { ethereum } = window as any;

    const handleEthereum = async () => {
        try {
            await ethereum.enable();
        } catch (e) {
            history.go(0);
        }
    };

    const LABEL_REPEATER = [
        {
            text: formatMessage({ id: 'All editing rights can be obtained' }),
        },
        { text: formatMessage({ id: 'Profits from performances and broadcasting' }) },
        {
            text: formatMessage({ id: 'Other commercial uses and distribution' }),
            content: formatMessage({
                id: '(Registration of commercial music copyright should be discussed with the artist in advance)',
            }),
        },
    ];

    const LABEL_SECOND_REPEATER = [
        {
            text: formatMessage({
                id:
                    'All copyrights for the sound source belong to the artist, and the release of the official sound source is only possible with the artist’s consent.',
            }),
        },
        {
            text: formatMessage({
                id:
                    'When using, distributing, selling the sound source, you should notify Alpha Quark through valid contact points, otherwise, disadvantages such as restrictions on the tuse of the sound source may occur.',
            }),
        },
        {
            text: formatMessage({
                id: 'The full version of sound sources will be provided after you purchased the sound source.',
            }),
        },
    ];

    const CONTENT = [
        {
            img: Music,
            text: formatMessage({ id: 'product.content.01' }),
            title: formatMessage({ id: 'Music copyright' }),
        },
        {
            img: Paint,
            text: formatMessage({ id: 'product.content.02' }),
            title: formatMessage({ id: 'Painting' }),
        },
        {
            img: WebToon,
            text: formatMessage({ id: 'product.content.03' }),
            title: formatMessage({ id: 'Webtoon' }),
        },
        {
            img: TP,
            text: formatMessage({ id: 'product.content.04' }),
            title: formatMessage({ id: 'Patent and Trademark' }),
        },
    ];

    useEffect(() => {
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

    return (
        <ProductScreenWrapper>
            <div>
                <div>{formatMessage({ id: 'Get valuable NFT backed by intellectual property' })}</div>
            </div>
            {!error ? (
                loading ? (
                    <div>loading</div>
                ) : account?.length ? (
                    <React.Fragment>
                        <PerfectScrollbar>
                            <FlexWrapper>
                                {orders
                                    ?.filter((e) => e.sellOrders?.length !== 0)
                                    .map((order: any, i: number) => (
                                        <Order
                                            key={i}
                                            order={{ asset: order }}
                                            seaport={seaport}
                                            accountAddress={account}
                                            onClick={() =>
                                                history.push(`/detail/${order.tokenAddress}/${order.tokenId}`)
                                            }
                                        />
                                    ))}
                            </FlexWrapper>
                        </PerfectScrollbar>
                    </React.Fragment>
                ) : (
                    <button onClick={handleEthereum}>connect</button>
                )
            ) : (
                <div>error!</div>
            )}
            <HeaderContainer>
                <div>{formatMessage({ id: 'NFT backed by IP (Intellectual Property)' })}</div>
                <div>
                    {formatMessage({
                        id:
                            'Intellectual property is one of the most valuable assets in the world Alpha Quark is acquiring valuable intellectual properties and tokenize them to enable people have accesses to the IP',
                    })}
                </div>
            </HeaderContainer>
            <MusicContainer>
                {CONTENT.map((e, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <img src={e.img} alt={e.title} />
                            </div>
                            <div>
                                <div>{e.title}</div>
                                <div>{e.text}</div>
                            </div>
                        </div>
                    );
                })}
            </MusicContainer>
            <FooterContainer>
                <div>{formatMessage({ id: 'Right of Intellectual property backed NFT' })}</div>
                <div>
                    <ul>
                        {LABEL_REPEATER.map((e, i) => {
                            return (
                                <li key={i}>
                                    {e.text}
                                    {e.content && <span>{e.content}</span>}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <ul>
                        {LABEL_SECOND_REPEATER.map((e, i) => {
                            return <li key={i}>{e.text}</li>;
                        })}
                    </ul>
                </div>
            </FooterContainer>
        </ProductScreenWrapper>
    );
};

export { ProductScreen };
