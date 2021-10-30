import React, {ReactNode} from 'react';
import {RouteInterface} from "./types/route-interface";
import CustomRoute from "./components/CustomRoute";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import AuthStoreProvider from "./components/Context/AuthContext";

const renderRoutes = (routeList: RouteInterface[]): ReactNode[] => {
    return routeList.map(route => <CustomRoute key={route.path} {...route}/>)
        .concat(<Route key="default"><Redirect to="/"/></Route>);
}

const App: React.FC = () => {
    return (
        <div>
            <AuthStoreProvider>
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </BrowserRouter>
            </AuthStoreProvider>
        </div>
    );
}

export default App;
