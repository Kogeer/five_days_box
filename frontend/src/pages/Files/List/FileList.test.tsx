import {MemoryRouter} from "react-router-dom";
import {AuthContext} from "../../../components/Context/AuthContext";
import FileListPage from "./index";
import mock from "../../../test/axios-mock";
import {mockFileResponse} from "../../../test/responses/file-response";
import {act, render, screen, waitFor, within} from "@testing-library/react";

const userData = {userName: 'test user', userId: '123'};

const component = (
    <MemoryRouter>
        <AuthContext.Provider value={{userData, isSignedIn: true, changeIsLoggedIn: (): void => {}}}>
            <FileListPage />
        </AuthContext.Provider>
    </MemoryRouter>
);

describe('FileList', () => {
    it('Render files in table', async () => {
        mock.onGet('/files').reply(200,  mockFileResponse);

        const {findByText, asFragment} = render(component);

        const fileText = await findByText('fake file');

        await waitFor(() => {
            expect(fileText).toBeInTheDocument();
        });
        expect(asFragment()).toMatchSnapshot();
    });

    it('Not show actions if user not own the file', async () => {
        mock.onGet('/files').reply(200,  mockFileResponse);

        await act(async () => {
            render(component)
        });

        const fileRow = (screen.getByText('another fake file').closest('tr') as HTMLTableRowElement);
        const utils = within(fileRow);

        await waitFor(() => {
            expect(utils.queryByText('Download')).not.toBeInTheDocument();
            expect(utils.queryByText('Delete')).not.toBeInTheDocument();
        });
    });
});
