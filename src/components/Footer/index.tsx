import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { useWidgetFetch } from 'src/hooks';
import { selectWidgets } from 'src/modules';
import CMC from 'src/assets/cmc.svg';

const AQT_CODE = '2781';

const abbreviateNumber = (num, fixed) => {
    if (num === null) {
        return null;
    }
    if (num === 0) {
        return '0';
    }
    fixed = !fixed || fixed < 0 ? 0 : fixed;
    var b = num.toPrecision(2).split('e'),
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed),
        d = c < 0 ? c : Math.abs(c),
        e = d + ['', 'K', 'M', 'B', 'T'][k];
    return e;
};

export const Footer: React.FC = () => {
    const widgets = useSelector(selectWidgets);

    useWidgetFetch();

    console.log(widgets);

    const renderMarquee = () => {
        return widgets?.data?.marquee?.map((e) => {
            return (
                <div>
                    <a href={e.id}>
                        <div>
                            <img src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${e.id}.png`} alt={e.id} />
                        </div>
                        <div>
                            <div>
                                <div>
                                    <span>{e.name}</span>
                                </div>
                                <div>{`$${abbreviateNumber(e.quote[AQT_CODE].price, 2)}`}</div>
                            </div>
                            <div>
                                <div>{e.symbol}</div>
                                <div>
                                    <span
                                        className={
                                            e.quote[AQT_CODE].percent_change_24h >= 0
                                                ? e.quote[AQT_CODE].percent_change_24h === 0
                                                    ? 'b n'
                                                    : 'b p'
                                                : 'b m'
                                        }
                                    />
                                    {`${abbreviateNumber(e.quote[AQT_CODE].percent_change_24h, 2)}%`}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            );
        });
    };

    return (
        <FooterWrapper>
            <div>
                <CopyrightWrapper>
                    <div>Contact</div>
                    <div>
                        <div>Alpha Quark Limited</div>
                        <div>contact@alphaquark.io</div>
                    </div>
                    <div>Copyrights. © 2020 Aphaquark Ltd. All right reserved.</div>
                </CopyrightWrapper>
                <div>
                    {/* marquee */}
                    <WidgetWrapper>
                        <div>
                            <div>Powered by</div>
                            <img src={CMC} alt="cmc" />
                        </div>
                        <MarqueeWrapper>
                            <div>
                                {renderMarquee()}
                                {renderMarquee()}
                            </div>
                        </MarqueeWrapper>
                    </WidgetWrapper>
                    {/* widget */}
                    {widgets?.data?.widget?.map((e) => {
                        return (
                            <AQTWrapper>
                                <div>
                                    <div>
                                        <img
                                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${e.id}.png`}
                                            alt={e.id}
                                        />
                                    </div>
                                    <div>
                                        <div>{`${e.name} (${e.symbol})`}</div>
                                        <div>
                                            <span>{abbreviateNumber(e.quote[AQT_CODE].price, 2)}</span> USD
                                            <div
                                                className={
                                                    e.quote[AQT_CODE].percent_change_24h >= 0
                                                        ? e.quote[AQT_CODE].percent_change_24h === 0
                                                            ? 'n'
                                                            : 'p'
                                                        : 'm'
                                                }>
                                                {`(${abbreviateNumber(e.quote[AQT_CODE].percent_change_24h, 2)}%)`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        RANK<span>{e.cmc_rank}</span>
                                    </div>
                                    <div>
                                        MARKET CAP
                                        <span>{`${abbreviateNumber(e.quote[AQT_CODE].market_cap, 1)} USD`}</span>
                                    </div>
                                    <div>
                                        VOLUME
                                        <span>{`${abbreviateNumber(e.quote[AQT_CODE].volume_24h, 1)} USD`}</span>
                                    </div>
                                </div>
                                <div>Powered by CoinMarketCap</div>
                            </AQTWrapper>
                        );
                    })}
                </div>
                <DocsWrapper>
                    <div>
                        <ul>
                            <li>Telegram</li>
                            <li>Twitter</li>
                            <li>Github</li>
                            <li>Contract Audit</li>
                        </ul>
                        <div>
                            <button>WhitePaper(ENG)</button>
                            <button>Copyright List(ENG)</button>
                            <button>Copyright List(KOR)</button>
                        </div>
                    </div>
                </DocsWrapper>
            </div>
        </FooterWrapper>
    );
};

const DocsWrapper = styled.div`
    min-width: 160px;
    ul * {
        font-size: 12px;
    }
    button {
        color: #a3b0bd;
        font-weight: 500;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-size: 12px;
        transition: all 200ms linear;
        border: 1px solid #4e5053;
        padding: 10px 12px;
        border-radius: 4px;
        background: transparent;
        text-align: left;
    }
    > div {
        > ul:first-child {
            display: flex;
            flex-direction: column;
            grid-gap: 14px;
        }
        > div:last-child {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            grid-gap: 12px;
        }
    }
`;

const CopyrightWrapper = styled.div`
    min-width: 240px;
    > div:first-child {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1.5rem !important;
    }
    > div:nth-child(2) {
        font-size: 80%;
        font-weight: 400;
        margin-bottom: 1.5rem !important;
    }
    > div:last-child {
        font-size: 80%;
        font-weight: 400;
    }
`;

const AQTWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ffffff;
    border-radius: 16px;
    img {
        margin: auto;
    }
    > div {
        display: flex;
        padding: 12px 0px;
    }
    > div:first-child {
        > div:first-child {
            flex: 1;
            display: flex;
        }
        > div:last-child {
            flex: 2;
            line-height: 1.4;
            margin: auto;
            > div:first-child {
                font-size: 18px;
                color: #0085ff;
                font-weight: bold;
            }
            > div:last-child {
                display: flex;
                grid-gap: 10px;
                align-items: flex-end;
                span {
                    font-size: 20px;
                    font-weight: 500;
                }
            }
        }
    }
    > div:nth-child(2) {
        border-top: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
        min-height: 60px;
        * {
            font-size: 12px;
            font-weight: 700;
        }
        > div {
            flex: 1;
            text-align: center;
            align-self: center;
        }
        span {
            display: block;
        }
    }
    > div:last-child {
        margin: auto;
        font-size: 12px;
        font-weight: 500;
    }
    .p {
        color: #16c784;
        top: unset !important;
        border: unset !important;
    }
    .m {
        color: #ea3943;
        top: unset !important;
        border: unset !important;
    }
`;

const WidgetWrapper = styled.div`
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    border-color: white !important;

    > div:first-child {
        overflow: hidden;
        width: 141px;
        padding: 12px 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        border-right: 1px solid white;

        > div {
            height: 17px;
            display: inline-block;
            line-height: 18x;
            font-weight: 400;
            font-size: 9px;
            line-height: 18px;
            color: #808a9d;
        }
        img {
            width: 94px;
        }
    }
`;

const MarqueeWrapper = styled.div`
    display: flex;
    overflow: hidden;
    width: calc(100% - 141px);
    overflow: hidden;
    white-space: nowrap;
    > div {
        position: relative;
        display: inline-block;
        animation-duration: 8.8s;
        animation-name: marquee-scroll;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-play-state: running;
        > div {
            position: relative;
            min-width: 220px;
            display: inline-block;
            box-sizing: border-box;
            padding: 0 16px;
            > a {
                padding: 16px 0;
                display: flex;
                width: 100%;
                align-items: center;
                text-decoration: none;
                > div:first-child {
                    margin-right: 8px;
                    display: inline-block;
                    line-height: 1;
                    min-width: 20px;
                    max-width: 20px;
                    height: 20px;
                    img {
                        width: auto;
                        height: 100%;
                    }
                }
                > div:last-child {
                    flex: 1;
                    > * {
                        font-size: 12px;
                        line-height: 1;
                        font-weight: 600;
                    }
                    > div {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
            > a:hover {
                * {
                    text-decoration: underline;
                }
            }
        }
    }
    > div:hover {
        animation-play-state: paused;
    }
`;

const FooterWrapper = styled.div`
    display: flex;
    background: #151435;
    > div {
        margin: auto;
        padding-top: 82px;
        padding-bottom: 82px;
        width: 988px;
        display: flex;
        min-height: 488px;
        grid-gap: 20px;
        > div {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        > div:nth-child(2) {
            grid-gap: 30px;
            min-width: 570px;
        }
    }
    * {
        color: white;
    }
    .b {
        width: 0;
        height: 0;
        position: relative;
        margin-right: 3px;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
    }
    .p {
        top: -8px;
        border-bottom: 5px solid #16c784;
    }
    .n {
        display: none;
    }
    .m {
        top: 10px;
        border-top: 5px solid #ea3943;
    }
`;
