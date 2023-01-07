import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
    return (
        // V6부터 Switch 대신 Routes로 변경
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            {/* 라우트 파라미터 형태로 변경 ex) /:nn/ */}
            <Route path="/workspace/:workspace" component={Workspace} />
        </Switch>
    );
};

export default App;