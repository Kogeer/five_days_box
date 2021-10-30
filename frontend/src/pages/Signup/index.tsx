import React, {useContext} from "react";
import {SignUpRequest} from "../../types/auth";
import SignUpForm from "./components/SignUpForm";
import {authRepo} from "../../services/api";
import request from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../components/Context/AuthContext";
import {Container} from "react-bootstrap";

const SignUpPage: React.FC = () => {
    const history = useHistory();
    const {changeIsLoggedIn} = useContext(AuthContext);

    const handleSubmit = async (data: SignUpRequest) => {
        try {
            const response = await authRepo.signup(data);
            changeIsLoggedIn(true, {userId: response.data.id, userName: response.data.name});
            history.push('/');
        } catch (error) {
            if (request.isAxiosError(error)) {
                const {response} = error;
                console.log(response);
            }
        }
    }

    return (
        <Container>
            <h1 className="text-center">Sign up</h1>
            <SignUpForm handleSubmit={handleSubmit}/>
        </Container>
    );
}

export default SignUpPage;
