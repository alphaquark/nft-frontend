import React from 'react';
import { Header } from 'src/components';
import styled from 'styled-components';

import MicImage from 'src/assets/website_mic.png';

export const LandingScreen: React.FC = () => {
    return (
        <React.Fragment>
            <Header background="#5122c4" />
            <LandingWrapper bg={MicImage}>
                <div>
                    <div>
                        Enjoy <span>NFT items</span> backed by intellectual property.
                    </div>
                </div>
            </LandingWrapper>
        </React.Fragment>
    );
};

const LandingWrapper = styled.div`
    background: #5122c4;
    -webkit-box-shadow: inset 0px -20px 500px 20px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0px -20px 500px 20px rgba(0, 0, 0, 0.4);
    background-image: url(${(props) => props.bg});
    background-position: center bottom;
    background-repeat: no-repeat;
    flex: 1;
    display: flex;
    flex-direction: column;
    span {
        font-weight: bold;
    }
    * {
        letter-spacing: 0.05em;
    }
    > div {
        color: white;
        min-width: 1340px;
        margin: 0 auto;
        flex: 1;
        display: flex;
        > div {
            margin: auto;
            font-size: 40px;
        }
    }
`;
