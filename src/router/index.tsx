import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Footer, Header } from 'src/components';
import { promisify } from 'src/constant';
import { useSeaportFetch } from 'src/hooks';
import { selectSeaport } from 'src/modules';
import {
    DefaultScreen,
    OrderScreen,
    ProductScreen,
    WalletScreen,
    LandingScreen,
    AboutScreen,
    MarketScreen,
} from 'src/screen';

const WrappedScreen = ({ component: Component, ...props }) => {
    const WrapperMarginScreen = styled.div`
        width: 1080px;
        margin: 0 auto;
        margin-top: 210px;
        flex: 1;
    `;
    return (
        <React.Fragment>
            <Header />
            <WrapperMarginScreen>
                <Component {...props} />
            </WrapperMarginScreen>
            <Footer />
        </React.Fragment>
    );
};

export const Router: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const history = useHistory();
    const { ethereum } = window as any;
    useSeaportFetch();

    const seaport = useSelector(selectSeaport);

    const handleEthereum = useCallback(async () => {
        try {
            if (ethereum) {
                await ethereum.enable();
            } else {
                alert('Please install Metamask plugins');
            }
        } catch (e) {
            alert('Login processing, please try again');
            history.go(0);
        }
    }, [ethereum, history]);

    useEffect(() => {
        if (seaport) {
            const asyncFunction = async () => {
                try {
                    let promise = promisify(seaport.web3.eth.getAccounts);
                    let accounts: any = await promise;
                    if (!accounts?.length) {
                        throw new Error();
                    }
                    await handleEthereum();
                    promise = promisify(seaport.web3.eth.getAccounts);
                    accounts = await promise;
                    setAccount(accounts[0] || '');
                } catch (e) {
                    console.error(e);
                }
            };
            asyncFunction();
        }
    }, [seaport, ethereum, handleEthereum]);

    ethereum?.on('accountsChanged', (accounts: any[]) => {
        setAccount(accounts[0] || '');
    });

    return (
        <Switch>
            {/* <PublicRoute path="/signin" loading={loading} isLogged={Boolean(data?.me?.id)} component={SignInScreen} />

            <PrivateRoute path="/wallet" loading={loading} isLogged={Boolean(data?.me?.id)} component={WalletScreen} /> */}
            <Route exact={true} path="/" component={LandingScreen} />
            <Route exact={true} path="/market" component={MarketScreen} />
            <Route exact={true} path="/ip-fi" component={DefaultScreen} />
            <Route
                path="/detail/:addreess/:id"
                render={() => <WrappedScreen component={OrderScreen} account={account} seaport={seaport} />}
            />
            <Route exact={true} path="/about" component={AboutScreen} />
            <Route
                exact={true}
                path="/NFT"
                render={() => <WrappedScreen component={ProductScreen} account={account} seaport={seaport} />}
            />
            <Route
                exact={true}
                path="/wallet"
                render={() => <WrappedScreen component={WalletScreen} account={account} seaport={seaport} />}
            />
            <Route path="**">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};
