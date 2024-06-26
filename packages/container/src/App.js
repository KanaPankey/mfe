import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Progress from './components/Progress';
import Header from './components/Header';
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});


export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
    <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                        </Route>
                        <Route path="/dashboard" >
                            {!isSignedIn && <Redirect />}
                            <DashboardLazy />
                        </Route>
                        <Route path="/">
                            <MarketingLazy />
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
    </BrowserRouter>
    );
};