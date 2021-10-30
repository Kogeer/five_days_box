import {AxiosResponse} from "axios";
import axiosInstance from "../utils/axios";
import {SignInRequest, SignUpRequest, UserResponse} from "../types/auth";
import {FileInterface, FileShareToken} from "../types/file";
import {saveAs} from "file-saver";

export const authRepo = {
    async signin(credentials: SignInRequest): Promise<AxiosResponse<UserResponse>> {
        return await axiosInstance.post('/auth/signin', credentials);
    },
    async signup(data: SignUpRequest): Promise<AxiosResponse<UserResponse>> {
        return await axiosInstance.post('/auth/signup', data);
    },
    async me(): Promise<AxiosResponse<UserResponse>> {
        return await axiosInstance.get('/auth/currentuser');
    },
    async signout(): Promise<AxiosResponse> {
        return await axiosInstance.post('/auth/signout');
    }
};

export const fileRepo = {
    async getFiles(): Promise<AxiosResponse<FileInterface[]>> {
        return await axiosInstance.get('/files');
    },
    async uploadFile(files: FormData): Promise<AxiosResponse<FileInterface>> {
        return await axiosInstance.post('/files', files);
    },
    async getShareToken(fileId: string): Promise<AxiosResponse<FileShareToken>> {
        return await axiosInstance.get(`/files/token/${fileId}`);
    },
    async download(fileId: string): Promise<void> {
        const fileResponse = await axiosInstance.get<Blob>(`/files/download/${fileId}`, {
            responseType: 'blob'
        });

        saveAs(
            fileResponse.data,
            fileResponse.headers['content-disposition']
                .split('filename=')[1]
                .split('"')[1]
        )
    },
    async delete(fileId: string): Promise<AxiosResponse> {
        return await axiosInstance.delete(`/files/${fileId}`);
    },
    async shareDownload(token: string): Promise<void> {
        const fileResponse = await axiosInstance.get<Blob>(`/files/share?token=${token}`, {
            responseType: 'blob'
        });

        saveAs(
            fileResponse.data,
            fileResponse.headers['content-disposition']
                .split('filename=')[1]
                .split('"')[1]
        )
    }
};
