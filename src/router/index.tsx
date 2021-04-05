import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Footer, Header } from 'src/components';
import { promisify } from 'src/constant';
import { useSeaportFetch } from 'src/hooks';
import { selectSeaport } from 'src/modules';
import { OrderScreen, ProductScreen, WalletScreen, LandingScreen, AboutScreen } from 'src/screen';

// const renderLoader = () => <div className="pg-loader-container">...</div>;

// //tslint:disable-next-line no-any
// const PrivateRoute: React.FC<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
//     if (loading) {
//         return renderLoader();
//     }
//     const renderCustomerComponent = (props) => <CustomComponent {...props} />;

//     if (isLogged) {
//         return <Route {...rest} render={renderCustomerComponent} />;
//     }

//     return (
//         <Route {...rest}>
//             <Redirect to={'/signin'} />
//         </Route>
//     );
// };

// //tslint:disable-next-line no-any
// const PublicRoute: React.FC<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
//     if (loading) {
//         return renderLoader();
//     }

//     if (isLogged) {
//         return (
//             <Route {...rest}>
//                 <Redirect to={'/'} />
//             </Route>
//         );
//     }

//     const renderCustomerComponent = (props) => <CustomComponent {...props} />;

//     return <Route {...rest} render={renderCustomerComponent} />;
// };

const WrappedScreen = ({ component: Component, ...props }) => {
    const WrapperMarginScreen = styled.div`
        width: 1080px;
        margin: 0 auto;
        margin-top: 210px;
        flex: 1;
        background: #171734;
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
            await ethereum.enable();
        } catch (e) {
            history.go(0);
        }
    }, [ethereum, history]);

    useEffect(() => {
        if (seaport) {
            const asyncFunction = async () => {
                try {
                    await handleEthereum();
                    const promise = promisify(seaport.web3.eth.getAccounts);
                    const accounts: any = await promise;
                    setAccount(accounts[0] || '');
                } catch (e) {
                    console.error(e);
                }
            };
            asyncFunction();
        }
    }, [seaport, handleEthereum]);

    ethereum.on('accountsChanged', (accounts: any[]) => {
        setAccount(accounts[0] || '');
    });

    return (
        <Switch>
            {/* <PublicRoute path="/signin" loading={loading} isLogged={Boolean(data?.me?.id)} component={SignInScreen} />

            <PrivateRoute path="/wallet" loading={loading} isLogged={Boolean(data?.me?.id)} component={WalletScreen} /> */}
            <Route exact={true} path="/" component={LandingScreen} />
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
