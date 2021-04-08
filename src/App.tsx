import React from 'react';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';

import { selectCurrentLanguage } from 'src/modules';
import { Router as RouterContainer } from 'src/router';
import { languageMap } from 'src/translations';

const browserHistory = createBrowserHistory();

const getTranslations = (lang: string) => {
    return languageMap[lang];
};

declare global {
    interface Window {
        env: {
            NETWORK: string;
            PRODUCT_CONTRACT: string;
            INFURA_URL: string;
        };
    }
}

const App: React.FC = () => {
    const lang = useSelector(selectCurrentLanguage);
    return (
        <IntlProvider locale={lang} messages={getTranslations(lang)} key={lang}>
            <Router history={browserHistory}>
                <RouterContainer />
            </Router>
        </IntlProvider>
    );
};

export { App };
