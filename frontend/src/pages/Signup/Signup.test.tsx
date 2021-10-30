import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import AuthStoreProvider from "../../components/Context/AuthContext";
import mock from "../../test/axios-mock";
import axiosInstance from "../../utils/axios";
import {setFieldValue} from "../../test/helper";
import SignUpPage from "./index";

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
            <SignUpPage/>
        </MemoryRouter>
    </AuthStoreProvider>
);

describe('SignUp', () => {
    it('Render sign up', async () => {
        const {asFragment} = render(component)

        await screen.findByPlaceholderText('E-mail')
        expect(asFragment()).toMatchSnapshot();
    });

    it('Success sign up', async () => {
        const spy = jest.spyOn(axiosInstance, 'post');
        mock.onGet('/auth/currentuser').reply(401, {});
        mock.onPost('/auth/signup').replyOnce(200, {data: {name: 'halo', id: 'mockid'}});

        const {getByRole, getByPlaceholderText} = render(component);

        const nameInput = getByPlaceholderText('Name');
        const emailInput = getByPlaceholderText('E-mail');
        const passwordInput = getByPlaceholderText('Password');

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        await setFieldValue(nameInput, 'test user');
        await setFieldValue(emailInput, 'test@example.com');
        await setFieldValue(passwordInput, 'password');

        expect(nameInput).toHaveValue('test user');
        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password');

        const submit = getByRole('button', {name: 'Sign up'});
        expect(submit).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(submit);
        });

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith('/auth/signup', {
                name: 'test user',
                email: 'test@example.com',
                password: 'password'
            })
        });
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });
});
