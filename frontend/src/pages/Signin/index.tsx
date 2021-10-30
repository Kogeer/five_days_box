import React, {useContext} from "react";
import SignInForm from "./components/SignInForm";
import {authRepo} from "../../services/api";
import request from "axios";
import {SignInRequest} from "../../types/auth";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../components/Context/AuthContext";
import {Container} from "react-bootstrap";

const SignInPage: React.FC = () => {
    const history = useHistory();
    const {changeIsLoggedIn} = useContext(AuthContext);

    const handleSubmit = async (data: SignInRequest) => {
        try {
            const response = await authRepo.signin(data);
            changeIsLoggedIn(true, {userId: response.data.id, userName: response.data.name});
            history.push('/');
        } catch (error) {
            if (request.isAxiosError(error)) {
                const {response} = error;
                console.error(response);
            }
        }
    };

    return (
        <Container>
            <h1 className="text-center">Sign in</h1>
            <SignInForm handleSubmit={handleSubmit}/>
        </Container>
    );
}

export default SignInPage;
