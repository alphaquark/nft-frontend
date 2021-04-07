import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { Footer, Header } from 'src/components';
import BG from 'src/assets/about_bg.png';
import Music from 'src/assets/music.svg';
import IV from 'src/assets/investor.svg';
import CA from 'src/assets/ca.svg';
import Translate from 'src/assets/translate.svg';
import Triangle from 'src/assets/triangle.svg';
import Holding from 'src/assets/holding.svg';
import Convert from 'src/assets/convert.svg';
import Doughnut from 'src/assets/doughnut.svg';
import Bithumb from 'src/assets/partner/bithumb.svg';
import FM from 'src/assets/partner/fm.svg';
import GateIO from 'src/assets/partner/gateio.svg';
import GoPAX from 'src/assets/partner/gopax.svg';
import KMGA from 'src/assets/partner/kmga.svg';
import PayProtocol from 'src/assets/partner/payprotocols.svg';
import Upbit from 'src/assets/partner/upbit.svg';
import Wiprex from 'src/assets/partner/wiprex.svg';
import WXY from 'src/assets/partner/wxy.svg';
import Back from 'src/assets/member/back.svg';
import Daniel from 'src/assets/member/daniel.svg';
import Kyle from 'src/assets/member/kyle.svg';
import Kyung from 'src/assets/member/kyung.svg';
import Lucia from 'src/assets/member/lucia.svg';
import Terry from 'src/assets/member/terry.svg';

const TeamWrapper = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 100px;
    margin: 230px 0;

    > div {
        display: flex;
    }
    > div:first-child {
        margin: auto;
        font-size: 28px;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        font-weight: bold;
    }
    > div:last-child {
        display: flex;
        flex-wrap: wrap;
        grid-gap: 60px;
        max-width: 910px;
        margin: auto;
        > div {
            display: flex;
            flex-direction: column;
            flex: 0;
            margin: auto;
            flex-wrap: wrap;
            grid-gap: 34px;
            > div:last-child {
                display: flex;
                flex-direction: column;
                grid-gap: 12px;
                > div:last-child {
                    font-size: 16px;
                    line-height: 18px;
                    text-align: center;
                    letter-spacing: 0.03em;
                    color: #9d91d0;
                }
                * {
                    text-align: center;
                    font-size: 20px;
                    line-height: 23px;
                    text-align: center;
                    letter-spacing: -0.01em;
                }
            }
        }
    }
`;

const PartnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 150px;
    > div {
        display: flex;
        flex-direction: column;
        grid-gap: 64px;
        > div:first-child {
            font-weight: bold;
            font-size: 28px;
            line-height: 30px;
            text-align: center;
            color: #ffffff;
        }
        > div:last-child {
            display: flex;
            margin: auto;
            grid-gap: 20px;
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
    background: url(${(props) => props.bg});
    background-size: 100% 940px;
    background-repeat: no-repeat;
    background-position: top;
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

export const AboutScreen: React.FC = () => {
    const { formatMessage } = useIntl();

    const STATIC_DATA = [
        { name: formatMessage({ id: 'Private sale' }), value: '21.61' },
        { name: formatMessage({ id: 'Marketing' }), value: '14.00' },
        { name: formatMessage({ id: 'R&D' }), value: '14.00' },
        { name: formatMessage({ id: 'Operations' }), value: '13.67' },
        { name: formatMessage({ id: 'Founding Team' }), value: '8.33' },
        { name: formatMessage({ id: 'Alpha Quark Alliance' }), value: '13.33' },
        { name: formatMessage({ id: 'Reserve' }), value: '15.05' },
    ];

    return (
        <React.Fragment>
            <Header />
            <AboutScreenWrapper bg={BG} bg2={Music}>
                <div>
                    <div>About</div>
                    <InformationWrapper>
                        <div>
                            <div>
                                {formatMessage({ id: 'Intellectual property, the most valuable asset in the world' })}
                            </div>
                            <div>
                                <div />
                                <div>{formatMessage({ id: 'about.content.01' })}</div>
                            </div>
                        </div>
                        <div>
                            <div>{formatMessage({ id: 'What is IP-fi?' })}</div>
                            <div>
                                <div />
                                <div>{formatMessage({ id: 'about.content.02' })}</div>
                            </div>
                        </div>
                        <div>
                            <div>{formatMessage({ id: 'What is NFT?' })}</div>
                            <div>
                                <div />
                                <div>{formatMessage({ id: 'about.content.03' })}</div>
                            </div>
                        </div>
                    </InformationWrapper>
                    <IPFiWrapper>
                        <div>{formatMessage({ id: 'Alpha Quark IP-fi will make a change for everyone' })}</div>
                        <div>
                            <div>
                                <div>
                                    <img src={IV} alt="iv" />
                                </div>
                                <div>
                                    <div>{formatMessage({ id: 'Investors' })}</div>
                                    <div>{formatMessage({ id: 'about.content.05' })}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={CA} alt="ca" />
                                </div>
                                <div>
                                    <div>{formatMessage({ id: 'Creators & Artists' })}</div>
                                    <div>{formatMessage({ id: 'about.content.06' })}</div>
                                </div>
                            </div>
                        </div>
                    </IPFiWrapper>
                    <FeatureWrapper>
                        <div>{formatMessage({ id: 'Feature' })}</div>
                        <div>
                            <div>
                                <div>
                                    <img src={Convert} alt="convert" />
                                </div>
                                <div>
                                    <div>{formatMessage({ id: 'Get NFT through AQT' })}</div>
                                </div>
                                <div>{formatMessage({ id: 'about.content.08' })}</div>
                            </div>
                            <div>
                                <div>
                                    <img src={Holding} alt="holding" />
                                </div>
                                <div>
                                    <div>
                                        {formatMessage({ id: 'Get royalty from intellectual property By holding NFT' })}
                                    </div>
                                </div>
                                <div>{formatMessage({ id: 'about.content.09' })}</div>
                            </div>
                        </div>
                    </FeatureWrapper>
                    <TriangleWrapper>
                        <div>
                            <div>{formatMessage({ id: 'How you get royalty through NFT on Alpha Quark IP-Fi' })}</div>
                        </div>
                        <div>
                            <img src={Triangle} alt="triangle" />
                        </div>
                    </TriangleWrapper>
                    <TranslateWrapper>
                        <div>
                            <div>{formatMessage({ id: 'Buy and Sell you NFT in marketplace' })}</div>
                        </div>
                        <div>
                            <img src={Translate} alt="translate" />
                        </div>
                    </TranslateWrapper>
                    <PartnerWrapper>
                        <div>
                            <div>{formatMessage({ id: 'Crypto Exchange Partners' })}</div>
                            <div>
                                <div>
                                    <img src={Bithumb} alt="bithumb" />
                                </div>
                                <div>
                                    <img src={Upbit} alt="Upbit" />
                                </div>
                                <div>
                                    <img src={GateIO} alt="GateIO" />
                                </div>
                                <div>
                                    <img src={GoPAX} alt="GoPAX" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>{formatMessage({ id: 'Partners' })}</div>
                            <div>
                                <div>
                                    <img src={PayProtocol} alt="PayProtocol" />
                                </div>
                                <div>
                                    <img src={Wiprex} alt="Wiprex" />
                                </div>
                                <div>
                                    <img src={WXY} alt="WXY" />
                                </div>
                                <div>
                                    <img src={FM} alt="FM" />
                                </div>
                                <div>
                                    <img src={KMGA} alt="KMGA" />
                                </div>
                            </div>
                        </div>
                    </PartnerWrapper>
                    <TeamWrapper>
                        <div>{formatMessage({ id: 'Team' })}</div>
                        <div>
                            <div>
                                <div>
                                    <img src={Terry} alt="Terry" />
                                </div>
                                <div>
                                    <div>Terry Kim</div>
                                    <div>{formatMessage({ id: 'Chief Executive Officer' })}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Kyle} alt="Kyle" />
                                </div>
                                <div>
                                    <div>Kyle Kim</div>
                                    <div>{formatMessage({ id: 'Chief Operating Officer' })}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Back} alt="Back" />
                                </div>
                                <div>
                                    <div>Seung Hoon Back</div>
                                    <div>{formatMessage({ id: 'Chief Technology Officer' })}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Kyung} alt="Kyung" />
                                </div>
                                <div>
                                    <div>Kyoung Young Lee</div>
                                    <div>{formatMessage({ id: 'Chief Information Security Officer' })}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Lucia} alt="Lucia" />
                                </div>
                                <div>
                                    <div>Lucia Lim</div>
                                    <div>{formatMessage({ id: 'Chief Marketing Officer' })}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Daniel} alt="Daniel" />
                                </div>
                                <div>
                                    <div>Daniel No</div>
                                    <div>{formatMessage({ id: 'Research Analyst' })}</div>
                                </div>
                            </div>
                        </div>
                    </TeamWrapper>
                    <TokenInfoWrapper>
                        <div>{formatMessage({ id: 'Alpha Quark Token Info' })}</div>
                        <div>
                            <div>
                                {STATIC_DATA.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            <div>{`${e.value}%`}</div>
                                            <div>{e.name}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <img src={Doughnut} alt="doughnut" />
                            </div>
                            <div>{formatMessage({ id: 'about.content.10' })}</div>
                        </div>
                    </TokenInfoWrapper>
                </div>
            </AboutScreenWrapper>
            <Footer />
        </React.Fragment>
    );
};
