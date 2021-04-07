import * as React from 'react';
import styled from 'styled-components';

import CROSS from 'src/assets/cross.svg';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        display: flex;
        flex-direction: column;
    }
    iframe {
        width: 100%;
        height: 500px;
        flex: 1;
        border: 1px solid #efefef;
        border-radius: 8px;
    }
`;

const ModalWrapper = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .cross {
        position: absolute;
        right: 15px;
        top: 15px;
        img {
            cursor: pointer;
        }
    }
    > div {
        display: flex;
        flex-direction: column;
        margin: auto;
        background: white;
        min-width: ${(props) => (props.width ? props.width : 500)}px;
        max-width: ${(props) => (props.width ? props.width : 500)}px;
        border-radius: 6px;
        padding: 30px;
        position: relative;
    }
    * {
        color: #000;
    }
`;
const Shadow = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
    background-color: black;
    z-index: 1;
`;

export interface SelectModalProps {
    header?: React.ReactNode;
    body?: React.ReactNode;
    submit?: any;
    submitLabel?: string;
    close: any;
    width: number;
    buttonDisabled?: boolean;
    hiddenLabel?: boolean;
    useConfirm?: boolean;
}

export const SelectModal: React.FC<SelectModalProps> = React.memo(({ ...props }) => {
    const { close, header, body, width } = props;
    return (
        <React.Fragment>
            <ModalWrapper width={width}>
                <div>
                    <div className="cross">
                        <img src={CROSS} onClick={close} alt="close" />
                    </div>
                    <ContentWrapper>
                        <div>{header ? header : null}</div>
                        <div>{body ? body : null}</div>
                    </ContentWrapper>
                </div>
            </ModalWrapper>
            <Shadow onClick={close} />
        </React.Fragment>
    );
});
