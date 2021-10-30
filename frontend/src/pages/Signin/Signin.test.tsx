import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import SignInPage from "./index";
import AuthStoreProvider from "../../components/Context/AuthContext";
import mock from "../../test/axios-mock";
import axiosInstance from "../../utils/axios";
import {setFieldValue} from "../../test/helper";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

const component = (
    <AuthStoreProvider>
        <MemoryRouter>
            <SignInPage/>
        </MemoryRouter>
    </AuthStoreProvider>
);

describe('Signin', () => {
    it('Render signin', async () => {
        const {asFragment} = render(component)

        expect(asFragment()).toMatchSnapshot();
    });

    it('Success signin', async () => {
        const spy = jest.spyOn(axiosInstance, 'post');
        mock.onGet('/auth/currentuser').reply(401, {});
        mock.onPost('/auth/signin').replyOnce(200, {data: {name: 'halo', id: 'mockid'}});

        const {getByPlaceholderText, getByRole} = render(component);

        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Password');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        await setFieldValue(emailInput, 'test@example.com')
        await setFieldValue(passwordInput, 'password');

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password');
        const submit = getByRole('button', {name: 'Sign in'});

        expect(submit).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(submit);
        });

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith('/auth/signin', {
                email: 'test@example.com',
                password: 'password'
            })
        });
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
});
