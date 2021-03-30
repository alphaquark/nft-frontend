import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { Router as RouterContainer } from './router';

const browserHistory = createBrowserHistory();

const App = () => {
    return (
        <Router history={browserHistory}>
            <RouterContainer />
        </Router>
    );
};

export { App };
