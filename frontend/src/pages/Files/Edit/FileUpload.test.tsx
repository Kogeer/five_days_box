import FileUploadPage from "./index";
import axiosInstance from "../../../utils/axios";
import {act, fireEvent, render, waitFor} from "@testing-library/react";
import mock from "../../../test/axios-mock";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

const component = (
    <FileUploadPage/>
);

jest.setTimeout(30000);
describe('FileUpload', () => {
    it('Can upload file', async () => {
        const spy = jest.spyOn(axiosInstance, 'post');
        mock.onPost('/files').reply(200);

        const {getByPlaceholderText, getByText} = render(component);

        const fileInput = getByPlaceholderText('File');
        const upload = getByText('Save');
        const file = new File(['lorem ipsum'], 'test.png', {type: 'image/png'});


        await act(async () => {
            fireEvent.change(fileInput, {target: {files: [file]}});
        });
        await waitFor(() => expect((fileInput as HTMLInputElement).files).toHaveLength(1));
        expect(upload).toBeInTheDocument();
        await act(async () => {
            fireEvent.blur(fileInput);
        });
        await act(async () => {
            fireEvent.click(upload);
        });


        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
        await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/'));
    });

    it('Cannot submit', async () => {
        const spy = jest.spyOn(axiosInstance, 'post');
        const {getByText} = render(component);

        const upload = getByText('Save');
        await act(async () => {
            fireEvent.click(upload);
        });

        await waitFor(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});
