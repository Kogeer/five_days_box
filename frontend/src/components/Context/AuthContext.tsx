import React, {createContext, useEffect, useMemo, useState} from "react";
import {authRepo} from "../../services/api";

interface UserData {
    userName: string;
    userId: string;
}

interface ContextProps {
    isSignedIn: boolean;
    changeIsLoggedIn: (isLogin: boolean, userData: UserData | null) => void;
    userData: UserData | null;
}

export const AuthContext = createContext<ContextProps>({
    isSignedIn: false,
    changeIsLoggedIn: () => {
        return null;
    },
    userData: null
});

const AuthStoreProvider: React.FC = ({children}) => {
    const initialState = (): boolean => !!localStorage.getItem('isSignedIn') || false;

    const [isSignedIn, setIsSignedIn] = useState(initialState());
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (isSignedIn) {
            localStorage.setItem('isSignedIn', 'true');
            return;
        }
        if (!isSignedIn) {
            localStorage.removeItem('isSignedIn');
        }
    }, [isSignedIn, userData]);

    useEffect(() => {
        if (!isSignedIn || !userData) {
            authRepo.me()
                .then(res => {
                    setIsSignedIn(true);
                    setUserData({userName: res.data.name, userId: res.data.id});
                })
                .catch(() => {
                    setIsSignedIn(false);
                });
        }
    }, [isSignedIn, userData]);

    const changeIsLoggedIn = (isLogin: boolean, userData: UserData | null): void => {
        setIsSignedIn(isLogin);
        setUserData(userData);
    }

    const store = useMemo<ContextProps>(() => ({
        isSignedIn,
        userData,
        changeIsLoggedIn
    }), [isSignedIn, userData]);

    return (
        <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
    );
}

export default AuthStoreProvider;
