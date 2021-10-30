import React, {useCallback, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {fileRepo} from "../../../services/api";
import {Container} from "react-bootstrap";

const FileSharePage: React.FC = () => {
    const {token} = useParams<{token: string}>();
    const [invalidError, setInvalidError] = useState<string>('');
    const history = useHistory();

    if (!token) {
        history.push('/');
    }

    const download = useCallback(() => {
        fileRepo.shareDownload(token)
            .catch(error => {
                error.response.data.text().then((text: string) => {
                    setInvalidError(JSON.parse(text).errors[0].message)
                })
            });
    }, [token]);

    useEffect(() => {
        if (token) {
            download();
        }
    }, [token, download]);

    return (
        <Container>
            <h3 className="text-center">Download file...</h3>
            {
                invalidError &&
                <div className="alert-warning mt-3">
                    {invalidError}
                </div>
            }
        </Container>
    );
};

export default FileSharePage;
