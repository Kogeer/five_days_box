import React, {useContext, useEffect, useState} from "react";
import {fileRepo} from "../../../services/api";
import useModal from "../../../hooks/use-modal";
import ShareModal from "./components/ShareModal";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import FilesTable from "./components/FilesTable";
import {AuthContext} from "../../../components/Context/AuthContext";
import {FileInterface} from "../../../types/file";

const FileListPage: React.FC = () => {
    const [files, setFiles] = useState<FileInterface[]>([]);
    const shareModal = useModal<{ fileId: string }>(false);
    const {userData} = useContext(AuthContext);

    const fetchFiles = async () => {
        try {
            const response = await fileRepo.getFiles();
            setFiles(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleShare = (fileId: string) => {
        shareModal.show({fileId});
    }

    const handleDownload = (fileId: string) => {
        fileRepo.download(fileId);
    }

    const handleDelete = async (fileId: string) => {
        await fileRepo.delete(fileId);
        fetchFiles();
    }

    return (
        <Container className="d-flex flex-column align-items-end">
            <Link to="/files/upload">
                <Button variant="primary" className="mb-3">Upload</Button>
            </Link>
            <FilesTable
                files={files}
                handleShare={handleShare}
                handleDownload={handleDownload}
                handleDelete={handleDelete}
                userId={userData?.userId}
            />
            <ShareModal
                show={shareModal.isVisible}
                handleClose={shareModal.hide}
                params={shareModal.params}
            />
        </Container>
    );
};

export default FileListPage;
