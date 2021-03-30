import styled from 'styled-components';

export const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <div>
                <div>1</div>
                <div>
                    {
                        <div
                            id="coinmarketcap-widget-marquee"
                            //@ts-ignore
                            coins="1,1027,825,7460"
                            currency="USD"
                            theme="dark"
                            transparent="true"
                            show-symbol-logo="true"
                        />
                    }
                    {
                        //@ts-ignore
                        <div
                            className="coinmarketcap-currency-widget"
                            data-currencyid="7460"
                            data-base="USD"
                            data-secondary=""
                            data-ticker="true"
                            data-rank="true"
                            data-marketcap="true"
                            data-volume="true"
                            data-statsticker="true"
                            data-stats="USD"
                        />
                    }
                </div>
                <div>3</div>
            </div>
        </FooterWrapper>
    );
};

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
        > div {
            flex: 1;
            max-width: 530px;
            display: flex;
            flex-direction: column;
        }
        > div:nth-child(2) {
            grid-gap: 30px;
        }
    }
    * {
        color: white;
    }
`;
