import {FileInterface} from "../../types/file";

export const mockFileResponse: FileInterface[] = [
    {
        id: '1',
        name: 'fake file',
        path: 'fake/path1',
        uploadDate: '2021-10-28T13:04:20.995Z',
        userId: '123',
    },
    {
        id: '2',
        name: 'another fake file',
        path: 'fake/path2',
        uploadDate: '2021-10-28T13:04:20.995Z',
        userId: '1234',
    }
];
