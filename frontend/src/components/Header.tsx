import {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "./Context/AuthContext";
import {Button} from "react-bootstrap";
import {authRepo} from "../services/api";


const Header = () => {
    const {userData, isSignedIn, changeIsLoggedIn} = useContext(AuthContext);

    const signout = async () => {
        await authRepo.signout();
        changeIsLoggedIn(false, null);
    }

    return (
        <div style={{height: '10rem', backgroundColor: '#7ea9ed', marginBottom: '2rem', color: 'white'}}
             className="d-flex justify-content-center align-items-center">
            <header>
                <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                    <h1>Files Project</h1>
                </Link>
            </header>
            <div style={{position: 'absolute', right: '3rem'}}>
                {userData?.userName}
                {isSignedIn &&
                    <Button variant="secondary" className="mx-2" onClick={signout}>Sign out</Button>
                }
                {!isSignedIn &&
                <Link to="/auth/signin">
                    <Button variant="secondary">Sign in</Button>
                </Link>
                }
            </div>
        </div>
    );
};

export default Header;
