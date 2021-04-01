import React from 'react';
import styled from 'styled-components';

import { Button, Footer, Header } from 'src/components';
import BG from 'src/assets/about_bg.png';
import Music from 'src/assets/music.svg';
import IV from 'src/assets/investor.svg';
import CA from 'src/assets/ca.svg';
import Translate from 'src/assets/translate.svg';
import Triangle from 'src/assets/triangle.svg';
import Holding from 'src/assets/holding.svg';
import Convert from 'src/assets/convert.svg';
import Doughnut from 'src/assets/doughnut.svg';

const STATIC_DATA = [
    { name: 'Private sale', value: '21.61' },
    { name: 'Marketing', value: '14.00' },
    { name: 'R&D', value: '14.00' },
    { name: 'Operations', value: '13.67' },
    { name: 'Founding Team', value: '8.33' },
    { name: 'Alpha Quark Alliance', value: '13.33' },
    { name: 'Reserve', value: '15.05' },
];

export const AboutScreen = () => {
    return (
        <React.Fragment>
            <Header />
            <AboutScreenWrapper bg={BG} bg2={Music}>
                <div>
                    <div>About</div>
                    <InformationWrapper>
                        <div>
                            <div>Intellectual property, the most valuable asset in the world</div>
                            <div>
                                <div />
                                <div>
                                    We believe intellectual properties such as music copyright, movie copyright, writing
                                    copyright are purely valuable creativity of humanity. The artists, writers, creators
                                    are required to be respected emotionally, and economically, but it’s not easy.
                                    Wiprex iFi, the abbreviation of World Intellectual Property Right Exchange iFi, will
                                    make a change to make a better world for the artists, writers, creators.
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>What is IP-fi?</div>
                            <div>
                                <div />
                                <div>
                                    IP-fi represents NFT backed by Intellectual property, which use blockchain
                                    technology. By using blockchain technology, users can own and manage intellectual
                                    property as NFT You can buy NFT backed by intellectual property through Alpha Quark
                                    Token(AQT) and even you can stake and get royalty from the intellectual property
                                    that you bought.
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>What is NFT?</div>
                            <div>
                                <div />
                                <div>
                                    A non-fungible token (NFT) is a digital file whose unique identity and ownership are
                                    verified on a blockchain (a digital ledger). NFTs are not mutually interchangeable.
                                    NFTs are commonly created by uploading files, such as digital artwork, to
                                    an auction market. NFTs can be used to commodify digital creations, such as digital
                                    art, video game items, and music files.
                                </div>
                            </div>
                        </div>
                    </InformationWrapper>
                    <IPFiWrapper>
                        <div>Alpha Quark IP-fi will make a change for everyone</div>
                        <div>
                            <div>
                                <div>
                                    <img src={IV} alt="iv" />
                                </div>
                                <div>
                                    <div>Investors</div>
                                    <div>
                                        For those who believe Intellectual property finance can be helpful for people
                                        all around the world, we designed and planned Alpha Quark IP-fi to provide them
                                        new chances to invest in intellectual property as NFT. From now on, Alpha Quark
                                        users can invest in not only crypto-asset, but also intellectual property such
                                        as music, webtoon, movies copyright and so on.
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={CA} alt="ca" />
                                </div>
                                <div>
                                    <div>Creators & Artists</div>
                                    <div>
                                        Artists and creators have not had good chances to have financial options even
                                        though they are devoting themselves for people all around the world. As creators
                                        and artists, they need to find a good way to continue their art works or
                                        creative activities. As Alpha Quark IP-fi will provide them good economic
                                        options that they have never had before, they will be able to enjoy much more
                                        freedom for new activities and work.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </IPFiWrapper>
                    <FeatureWrapper>
                        <div>Feature</div>
                        <div>
                            <div>
                                <div>
                                    <img src={Convert} alt="convert" />
                                </div>
                                <div>
                                    <div>Get NFT through AQT</div>
                                </div>
                                <div>
                                    You can get valuable NFT with your LP token in Alpha Quark IP-fi.
                                    <br />
                                    <br /> You can easily deposit AQT on Alpha Quark IP-FI and you can easily purchase
                                    NFT.
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Holding} alt="holding" />
                                </div>
                                <div>
                                    <div>Get royalty from intellectual property By holding NFT</div>
                                </div>
                                <div>
                                    You can earn royalty from copyrights of Alpha Quark IP-fi. Quark IP-fi gives you
                                    reward from cash flow earned by inllectual property royalty.
                                </div>
                            </div>
                        </div>
                    </FeatureWrapper>
                    <TriangleWrapper>
                        <div>
                            <div>How you get royalty through NFT on Alpha Quark IP-Fi</div>
                        </div>
                        <div>
                            <img src={Triangle} alt="triangle" />
                        </div>
                    </TriangleWrapper>
                    <TranslateWrapper>
                        <div>
                            <div>
                                Buy and Sell you <span>NFT in marketplace</span>
                            </div>
                        </div>
                        <div>
                            <img src={Translate} alt="translate" />
                        </div>
                    </TranslateWrapper>
                    <TokenInfoWrapper>
                        <div>Alpha Quark Token Info</div>
                        <div>
                            <div>
                                {STATIC_DATA.map((e) => {
                                    return (
                                        <div>
                                            <div>{`${e.value}%`}</div>
                                            <div>{e.name}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <img src={Doughnut} alt="doughnut" />
                            </div>
                            <div>
                                You can buy NFTized intellectual property by using Alpha Quark Token.
                                <br /> Once you get NFT in Alpha Quark IP-fi, you will get royalty from the intellectual
                                property.
                            </div>
                        </div>
                    </TokenInfoWrapper>
                    <BannerWrapper>
                        <div>Do you want to learn more about Alpha Quark IP-fi?</div>
                        <div>
                            <Button variant="primary">Go to Docs to learn more</Button>
                        </div>
                    </BannerWrapper>
                    <ContactWrapper>
                        <div>Contact Us</div>
                        <div>
                            <div>
                                <input type="text" placeholder="HELLOWORLD" />
                                <input />
                                <input />
                                <input />
                            </div>
                            <div>
                                <textarea />
                            </div>
                            <div>
                                <Button variant="primary">Send message</Button>
                            </div>
                        </div>
                    </ContactWrapper>
                </div>
            </AboutScreenWrapper>
            <Footer />
        </React.Fragment>
    );
};

const ContactWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div:first-child {
        font-size: 28px;
        line-height: 30px;
        margin: auto;
    }
    > div:nth-child(2) {
        min-width: 714px;
        max-width: 714px;
        display: flex;
        grid-gap: 10px;
        flex-direction: column;
        margin: auto;
        margin-top: 40px;
        margin-bottom: 120px;
        > div {
            flex-wrap: wrap;
            grid-gap: 10px;
            display: flex;

            input {
                flex-wrap: nowrap;
                min-height: 46px;
                flex: 0;
                min-width: calc(50% - 5px);
                color: #949494;
                padding: 16px;
            }
            textarea {
                flex: 1;
                min-height: 174px;
                padding: 16px;
                max-height: 174px;
                color: #949494;
            }
        }
        > div:last-child {
            button {
                margin: auto;
            }
        }
    }
`;

const BannerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div:first-child {
        font-size: 28px;
        line-height: 30px;
        margin: auto;
    }
    > div:last-child {
        display: flex;
        margin-top: 40px;
        margin-bottom: 240px;
        button {
            margin: auto;
            border-radius: 4px;
            padding: 0 25px;
        }
    }
`;

const TranslateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div:first-child {
        font-size: 28px;
        line-height: 30px;
        margin: auto;
    }
    > div:last-child {
        margin: auto;
        margin-top: 150px;
        margin-bottom: 230px;
    }
`;

const TokenInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    * {
        text-align: center;
    }
    > div:first-child {
        font-size: 28px;
        line-height: 30px;
        margin: auto;
    }
    > div:last-child {
        display: flex;
        flex-direction: column;
        > div:first-child {
            display: flex;
            grid-gap: 70px;
            margin-top: 70px;
            margin-bottom: 100px;
            > div {
                margin: auto;
                display: flex;
                flex-direction: column;
                grid-gap: 6px;
                > div:first-child {
                    font-weight: 500;
                    font-size: 24px;
                    line-height: 28px;
                    opacity: 0.6;
                }
                > div:last-child {
                    color: #9d91d0;
                    font-size: 16px;
                    line-height: 26px;
                }
            }
        }
        > div:nth-child(2) {
            margin: auto;
        }
        > div:last-child {
            margin-top: 80px;
            margin-bottom: 180px;
            font-size: 16px;
            line-height: 26px;
            color: #c2c2c2;
        }
    }
`;

const TriangleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        margin: auto;
    }
    > div:first-child {
        font-weight: 500;
        font-size: 28px;
        line-height: 30px;
    }
    > div:last-child {
        margin-top: 120px;
        margin-bottom: 300px;
    }
`;

const FeatureWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div:first-child {
        font-size: 28px;
        line-height: 30px;
        margin: auto;
    }
    > div:last-child {
        margin-top: 90px;
        margin-bottom: 230px;
        display: flex;
        > div {
            max-width: 343px;
            flex: 1;
            margin: auto;
            margin-top: 0;
            * {
                text-align: center;
            }
            > div:first-child {
                min-height: 85px;
            }
            > div:nth-child(2) {
                min-height: 60px;
                display: flex;
                flex-direction: column;
                margin-top: 45px;
                margin-bottom: 30px;
                > div {
                    margin: auto;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 30px;
                }
            }
            > div:last-child {
                font-size: 14px;
                line-height: 26px;
                opacity: 0.5;
            }
        }
    }
`;

const IPFiWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div:first-child {
        font-size: 28px;
        line-height: 30px;
        margin: auto;
    }
    > div:last-child {
        margin-top: 130px;
        margin-bottom: 240px;
        display: flex;
        flex-direction: column;
        grid-gap: 80px;
        > div {
            display: flex;
            grid-gap: 72px;
            > div:first-child {
                display: flex;
                img {
                    margin-left: 25px;
                }
            }

            > div:last-child {
                display: flex;
                flex-direction: column;
                grid-gap: 30px;
                > div:first-child {
                    font-weight: 500;
                    font-size: 24px;
                    line-height: 28px;
                }
                > div:last-child {
                    opacity: 0.5;
                    font-size: 16px;
                    line-height: 26px;
                    text-align: justify;
                }
            }
        }
    }
`;

const InformationWrapper = styled.div`
    margin-top: 190px;
    margin-bottom: 160px;
    display: flex;
    flex-direction: column;
    grid-gap: 60px;
    > div {
        display: flex;
        grid-gap: 20px;
        flex-direction: column;
        > div:first-child {
            font-weight: 500;
            font-size: 24px;
            line-height: 40px;
        }
        > div:last-child {
            display: flex;
            grid-gap: 20px;
            position: relative;
            > div:first-child {
                min-width: 70px;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 2px;
                    background: white;
                    width: 38px;
                    left: 17px;
                    top: 12px;
                }
            }
            > div:last-child {
                opacity: 0.5;
                font-size: 16px;
                line-height: 32px;
                text-align: justify;
            }
        }
    }
`;

const AboutScreenWrapper = styled.div`
    background: url(${(props) => props.bg}), linear-gradient(180deg, rgba(64, 38, 174, 1) 0%, rgba(21, 20, 53, 1) 100%);
    background-size: 100% 940px, auto;
    background-repeat: no-repeat, no-repeat;
    background-position: top, center;
    flex: 1;

    * {
        color: white;
    }
    > div {
        width: 1080px;
        margin: 0 auto;
        margin-top: 570px;
        display: flex;
        flex-direction: column;
        > div:first-child {
            margin: auto;
            font-size: 40px;
            font-weight: bold;
        }
    }
`;
