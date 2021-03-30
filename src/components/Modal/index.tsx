import * as React from 'react';
import styled from 'styled-components';
import { Button } from '..';

export interface ModalProps {
    header?: React.ReactNode;
    body?: React.ReactNode;
    submit?: any;
    submitLabel?: string;
    close: any;
    closeLabel: string;
    width: number;
    buttonDisabled: boolean;
}

export const Modal: React.FC<ModalProps> = React.memo(({ ...props }) => {
    const { submit, close, header, body, closeLabel, submitLabel, width, buttonDisabled } = props;
    return (
        <React.Fragment>
            <ModalWrapper width={width}>
                <div>
                    <ContentWrapper>
                        <div>{header ? header : null}</div>
                        <div>{body ? body : null}</div>
                    </ContentWrapper>
                    <ButtonWrapper>
                        <Button disabled={buttonDisabled} variant="secondary" onClick={close}>
                            {closeLabel}
                        </Button>
                        <Button disabled={buttonDisabled} variant="primary" onClick={submit}>
                            {submitLabel}
                        </Button>
                    </ButtonWrapper>
                </div>
            </ModalWrapper>
            <Shadow onClick={close} />
        </React.Fragment>
    );
});

const ButtonWrapper = styled.div`
    display: flex;
    > * {
        flex: 1;
    }
    grid-gap: 18px;
`;

const ContentWrapper = styled.div``;

const ModalWrapper = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    > div {
        display: flex;
        flex-direction: column;
        margin: auto;
        background: white;
        min-width: ${(props) => (props.width ? props.width : 500)}px;
        max-width: ${(props) => (props.width ? props.width : 500)}px;
        border-radius: 6px;
        padding: 30px;
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
