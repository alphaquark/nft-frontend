import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import AQTLogo from 'src/assets/aqt.png';
import MySvg from 'src/assets/myicon.svg';

interface HeaderProps {
    background?: string;
}

export const Header: React.FC<HeaderProps> = ({ background }) => {
    const history = useHistory();
    const [toggle, setToggle] = React.useState(false);

    const toggleState = () => {
        setToggle(!toggle);
    };

    return (
        <HeaderWrapper>
            <div>
                <div>
                    <div>
                        <div>
                            <div>EN</div>
                            <div>KRW</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={AQTLogo} alt="aqt" />
                    </div>
                    <ul>
                        <li onClick={() => history.push('/about')}>ABOUT</li>
                        <li onClick={() => history.push('/')}>NFT</li>
                        <li onClick={() => history.push('/product')}>MARKETPLACE</li>
                        <li onClick={() => history.push('/')}>DOCS</li>
                        <li>
                            <div onClick={toggleState}>
                                <img src={MySvg} alt="mySvg" />
                            </div>

                            <div>
                                {toggle && (
                                    <React.Fragment>
                                        <div onClick={() => history.push('/wallet')}>My Items</div>
                                        <div>Settings</div>
                                    </React.Fragment>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 11;
    * {
        color: white;
        background: ${(props) => props.bg};
    }
    img {
        max-width: 159px;
        max-height: 32px;
    }
    > div:first-child {
        display: flex;
        flex-direction: column;
        > div:first-child {
            border-bottom: 1px solid #6339ca;
            min-height: 30px;
            line-height: 30px;
            display: flex;
            flex-direction: column;
            > div:first-child {
                min-width: 1340px;
                margin: 0 auto;
                flex: 1;
                display: flex;
                > div {
                    margin-left: auto;
                    font-size: 12px;
                    opacity: 0.5;
                    display: flex;
                    grid-gap: 24px;
                }
            }
        }
        > div:last-child {
            min-width: 1340px;
            margin: 0 auto;
            flex: 1;
            display: flex;
            > div:first-child {
                margin-top: 22px;
            }
            ul {
                display: flex;
                margin-top: 27px;
                margin-left: auto;
                grid-gap: 80px;
                li {
                    font-size: 16px;
                    align-self: center;
                    cursor: pointer;
                }
                li:last-child {
                    > div:last-child {
                        position: absolute;
                        margin-left: -18px;
                        display: flex;
                        flex-direction: column;
                        grid-gap: 18px;
                        margin-top: 18px;
                        z-index: 10;
                        div {
                            opacity: 0.4;
                        }
                        > div:hover {
                            opacity: 1;
                        }
                        * {
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
`;
