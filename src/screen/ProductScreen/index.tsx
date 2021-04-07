import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { Button, SelectModal } from 'src/components';
import { PRODUCT_CONTRACT, toUnitAmount } from 'src/constant';
import Music from 'src/assets/music.svg';
import Paint from 'src/assets/painting.svg';
import TP from 'src/assets/tp.svg';
import WebToon from 'src/assets/webtoon.svg';
import Metamask from 'src/assets/metamask.svg';

const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        margin: auto;
        font-size: 20px;
        line-height: 23px;
    }
    margin-bottom: 40px;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    > div {
        justify-content: space-between;
        display: flex;
    }
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    padding: 20px 0;
    * {
        line-height: 40px;
        font-size: 12px;
    }
    button {
        min-width: 80px;
        border-radius: 100px;
    }
`;

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
            white-space: pre-wrap;
        }
        > div:first-child {
            font-weight: 500;
            text-align: center;
        }
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    grid-gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    grid-gap: 20px;
    > div {
        position: relative;
        > div {
            background: #242448;
            min-width: 255px;
            max-width: 255px;
            max-height: 410px;
            > div:first-child {
                padding: 17px;
            }
            > div:last-child {
                display: flex;
                flex-direction: column;
                > div {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    display: flex;
                    padding: 16px;
                    justify-content: space-between;
                    font-size: 14px;
                    * {
                        color: #9191a3;
                    }
                    > div:last-child {
                        color: #5d63ff !important;
                    }
                }
                > div:first-child {
                    padding-top: 0;
                    color: white;
                }
                > div:last-child {
                    border-bottom: none;
                }
            }
            img {
                min-width: 220px;
                max-width: 220px;
                min-height: 220px;
                max-height: 220px;
            }
        }
    }
    .Masked {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        > div {
            font-size: 20px;
            line-height: 23px;
            font-weight: bold;
            color: #d25757;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            margin: auto;
        }
    }
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

const ProductScreen: React.FC<{ account: any; seaport: any }> = ({ account, seaport }) => {
    const [tempOrders, setTempOrders] = useState<any>(null);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [modalState, setModalState] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>(false);
    const history = useHistory();
    const { formatMessage } = useIntl();
    const { ethereum } = window as any;

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
                        limit: 100,
                    });
                    const returnArray = {};
                    assets.forEach((e) => {
                        if (returnArray[e.name]) {
                            returnArray[e.name] = {
                                data: [...returnArray[e.name]['data'], e],
                                sellOrders: e.sellOrders?.length
                                    ? returnArray[e.name].sellOrders + 1
                                    : returnArray[e.name].sellOrders,
                            };
                        } else {
                            returnArray[e.name] = { data: [e], sellOrders: e.sellOrders?.length ? 1 : 0 };
                        }
                    });
                    setTempOrders(returnArray);
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
        <React.Fragment>
            <ProductScreenWrapper>
                <div>
                    <div>{formatMessage({ id: 'Get valuable NFT backed by intellectual property' })}</div>
                </div>
                {!error ? (
                    loading ? (
                        <div>loading</div>
                    ) : account?.length ? (
                        <FlexWrapper>
                            {tempOrders &&
                                Object.entries(tempOrders).map((e: any, i) => {
                                    return (
                                        <div key={i}>
                                            <div
                                                onClick={() => {
                                                    if (e[1]?.sellOrders) {
                                                        setSelected(e[1]);
                                                        setModalState(true);
                                                    }
                                                }}>
                                                <div>
                                                    <img src={e[1].data[0].imageUrl} alt={e[0]} />
                                                </div>
                                                <div>
                                                    <div>{e[0]}</div>
                                                    <div>
                                                        <div>Total Amount</div>
                                                        <div>{e[1].data.length}</div>
                                                    </div>
                                                    <div>
                                                        <div>Remains</div>
                                                        <div>{e[1].sellOrders}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {!e[1]?.sellOrders && (
                                                <div className="Masked">
                                                    <div>Sold out</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </FlexWrapper>
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
            {modalState && (
                <SelectModal
                    header={
                        <ModalHeader>
                            <div>Choose Serial ID</div>
                        </ModalHeader>
                    }
                    body={
                        <ModalBody>
                            {selected.data
                                .filter((e) => e.sellOrders.length > 0)
                                .map((e, i) => {
                                    return (
                                        <div key={i}>
                                            <div>{e.traits.find((e) => e.trait_type === 'serial-number').value}</div>
                                            <div>
                                                {e.sellOrders?.length
                                                    ? `${toUnitAmount(
                                                          e.sellOrders?.length && e.sellOrders[0]?.currentPrice,
                                                          e.sellOrders?.length && e.sellOrders[0]?.paymentTokenContract
                                                      )?.toString()} ${e.sellOrders[0]?.paymentTokenContract?.symbol}`
                                                    : null}
                                            </div>
                                            <div>
                                                <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                        history.push(`/detail/${e.tokenAddress}/${e.tokenId}`)
                                                    }>
                                                    Buy
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </ModalBody>
                    }
                    close={() => setModalState(false)}
                    width={500}
                />
            )}
        </React.Fragment>
    );
};

export { ProductScreen };
