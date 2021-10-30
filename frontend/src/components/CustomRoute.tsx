import React, {ReactNode, useContext} from "react";
import {RouteInterface} from "../types/route-interface";
import {Redirect, Route} from "react-router-dom";
import {AuthContext} from "./Context/AuthContext";

const CustomRoute: React.FC<RouteInterface> = ({
    isPublic = false,
    isProtected,
    component: Component,
    ...rest
    }) => {
    if (!Component) {
        throw Error('component key must be define');
    }
    const {isSignedIn} = useContext(AuthContext);

    return (
        <Route
            {...rest}
            key={rest.path}
            render={(props): ReactNode => {
                if (isPublic || (isSignedIn && isProtected)) {
                    return <Component {...props} />;
                }

                if (!isSignedIn && isProtected) {
                    return <Redirect to='/auth/signin'/>;
                }
            }}
        />
    )
}

export default CustomRoute;
