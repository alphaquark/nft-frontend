import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Header } from 'src/components';
import MicImage from 'src/assets/website_mic.png';
import Cover1 from 'src/assets/cover1.png';
import Cover2 from 'src/assets/cover2.png';

const LandingWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    span {
        font-weight: bold;
    }

    * {
        letter-spacing: 0.05em;
        transition: all ease 0.5s 0s;
        text-align: center;
        white-space: pre-wrap;
    }
    > div {
        color: white;
        min-width: 1340px;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        max-height: 100vh;

        > div {
            display: flex;
            flex-direction: column;
            flex: 0;
            min-height: 100vh;
            font-size: 40px;
            > div {
                margin: auto;
            }
        }
        > div:first-child {
            background: #5122c4;
            background-image: url(${(props) => props.bg});
            background-position: center bottom;
            background-repeat: no-repeat;
            margin-top: ${({ v }) => v * -100}vh;
            -webkit-box-shadow: inset 0px -20px 500px 20px rgba(0, 0, 0, 0.4);
            box-shadow: inset 0px -20px 500px 20px rgba(0, 0, 0, 0.4);
        }
        > div:nth-child(2) {
            font-size: 28px;
            line-height: 40px;
            display: flex;
            flex-direction: column;
            background-image: url(${(props) => props.bg2});
            background-size: cover;
            > div {
                max-width: 1140px;
                margin: auto;
                display: flex;
                grid-gap: 24px;
                flex-direction: column;
            }
        }
        > div:last-child {
            font-size: 28px;
            line-height: 40px;
            display: flex;
            flex-direction: column;
            background-image: url(${(props) => props.bg3});
            background-size: cover;
            > div {
                max-width: 1140px;
                margin: auto;
            }
        }
    }
`;

const Indicator = styled.div`
    position: absolute;
    margin: auto;
    margin-top: calc(50vh - 50px);
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    grid-gap: 5px;
    max-width: 1340px;
    > div {
        width: 8px;
        height: 30px;
        background: white;
        margin-left: auto;
        cursor: pointer;
        border-radius: 10px;
    }
`;

export const LandingScreen: React.FC = () => {
    const [vertical, setVertical] = useState(0);

    useEffect(() => {
        const id = setTimeout(() => {
            setVertical((vertical + 1) % 3);
        }, 5000);
        return () => clearInterval(id);
    }, [vertical]);

    return (
        <React.Fragment>
            <Header background="#5122c4" />
            <LandingWrapper bg={MicImage} v={vertical} bg2={Cover1} bg3={Cover2}>
                <div>
                    <div>
                        <div>
                            Enjoy <span>NFT items</span> backed by intellectual property.
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                Intellectual property is one of the most valuable assets in the world,
                                <br /> but we’ve never had access to the asset class.
                            </div>
                            <div>
                                Alpha Quark will make a better world where people can access to IP asset class
                                <br /> more easily
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            Alpha Quark is a marketplace where users can buy or
                            <br /> sell tokenized intellectual property assets.
                        </div>
                    </div>
                </div>
            </LandingWrapper>
            <Indicator>
                <div style={{ opacity: vertical !== 0 ? 0.5 : 1 }} onClick={() => setVertical(0)} />
                <div style={{ opacity: vertical !== 1 ? 0.5 : 1 }} onClick={() => setVertical(1)} />
                <div style={{ opacity: vertical !== 2 ? 0.5 : 1 }} onClick={() => setVertical(2)} />
            </Indicator>
        </React.Fragment>
    );
};
