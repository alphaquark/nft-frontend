import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Order } from 'src/components';
import { PRODUCT_CONTRACT } from 'src/constant';
import Music from 'src/assets/music.svg';
import Paint from 'src/assets/painting.svg';
import TP from 'src/assets/tp.svg';
import WebToon from 'src/assets/webtoon.svg';

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

    const REPEATER = [
        {
            img: Music,
            text:
                '70 years after the death of the creator of music copyright, we have a right to get royalty from the copyright. Everytime we listen to music, we can earn money from the copyright. Once you stake UNI V2 LP Token in the staking pool of Alpha Quark IP-fi protocol, we will send you the royalty by using a smart contract.',
            title: 'Music copyright',
        },
        {
            img: Paint,
            text:
                'Paintings can earn money continuously as long as they are used for galleries all around the world. Moreover, paintings can be sold at a much higher price than we purchased at. These facts means that paintings can be a valuable asset that we can invest in.',
            title: 'Painting',
        },
        {
            img: WebToon,
            text:
                'More and more people are getting closer to Webtoon – Web cartoons. The market is expanding so rapidly that big companies in China and South Korea, United States of America are interested in webtoon business. Webtoon is the representative asset which is used for multiple sources. One source, multi use.',
            title: 'Webtoon',
        },
        {
            img: TP,
            text:
                'As long as patent and trademark is used for other people, we can expect continuous cash flow from the right. It means we can get royalty once we get the right to earn money from it. This is the reason that Alpha Quark IP-fi is trying hard to get this valuable right from all around the world.',
            title: 'Patent and Trademark',
        },
    ];

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

    return (
        <ProductScreenWrapper>
            <div>
                <div>Get valuable NFT</div>
                <div>backed by intellectual property</div>
            </div>
            {!error ? (
                loading ? (
                    <div>loading</div>
                ) : account?.length ? (
                    <React.Fragment>
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
                        <MusicContainer>
                            {REPEATER.map((e) => {
                                return (
                                    <div>
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
                        <BannerContainer>
                            <div>What Alpha Quark is going to tokenize</div>
                            <div>
                                With professionals in the intellectual property asset class,
                                <br /> Alpha Quark will NFTize diverse intellectual properties.
                                <br />
                                <br />
                                You can check intellectual properties, that Alpha Quark is able to tokenize, here
                            </div>
                            <div>
                                <button>Go to check IP lists</button>
                            </div>
                        </BannerContainer>
                    </React.Fragment>
                ) : (
                    <button onClick={handleEthereum}>connect</button>
                )
            ) : (
                <div>error!</div>
            )}
        </ProductScreenWrapper>
    );
};

const BannerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 120px;

    > div {
        margin: auto;
        text-align: center;
    }
    > div:first-child {
        font-size: 28px;
        line-height: 30px;
        font-weight: bold;
    }
    > div:nth-child(2) {
        font-size: 16px;
        line-height: 32px;
        opacity: 0.5;
        margin-top: 40px;
        margin-bottom: 50px;
    }
    button {
        min-width: 260px;
        min-height: 50px;
        background: #564ff5;
        border: none;
        border-radius: 6px;
        font-size: 18px;
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

export { ProductScreen };
