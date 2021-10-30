import React, {useState} from "react";
import FileUploadForm from "./components/FileUploadForm";
import {fileRepo} from "../../../services/api";
import {useHistory} from "react-router-dom";

const FileUploadPage: React.FC = () => {
    const [file, setFile] = useState<File | string | Blob>('');
    const [sizeError, setSizeError] = useState<boolean>(false);
    const history = useHistory();

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', file);

        fileRepo.uploadFile(formData)
            .then(() => {
                history.push('/');
            })
            .catch(error => {
                if (error.response.status === 400) {
                    setSizeError(true);
                }
            });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setSizeError(false);
        }
    }

    return (
        <div className="container">
            <FileUploadForm handleSubmit={handleSubmit} handleChange={handleChange}/>
            {sizeError &&
            <div className="alert-warning mt-3">
                File should not be bigger than 3MB
            </div>
            }
        </div>
    );
}

export default FileUploadPage;
