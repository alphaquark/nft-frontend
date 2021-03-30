import * as React from 'react';
import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'disable';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = React.memo(({ ...props }) => {
    return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
});

const ButtonWrapper = styled.button`
    border: none;
    ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return `background-color: #564FF5; color:white;`;
            case 'secondary':
                return `border: 1px solid #564FF5; background-color:white; color:#564FF5`;
            default:
                return `background-color: white`;
        }
    }};
    min-height: 40px;
    line-height: 40px;
`;
