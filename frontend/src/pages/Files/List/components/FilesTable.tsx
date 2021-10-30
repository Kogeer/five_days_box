import React from "react";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import {FileInterface} from "../../../../types/file";

interface CustomTableProps {
    files: FileInterface[];
    handleShare: (fileId: string) => void;
    handleDownload: (fileId: string) => void;
    handleDelete: (fileId: string) => void;
    userId: string | undefined;
}

const FilesTable = ({files, handleShare, handleDownload, handleDelete, userId}: CustomTableProps): JSX.Element => {

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>File name</th>
                <th>Upload time</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {files?.map(file => <tr key={file.path} className="align-middle">
                <td>{file.name}</td>
                <td>{new Date(file.uploadDate).toLocaleString()}</td>
                <td>
                    {
                        userId === file.userId &&
                        <ButtonGroup>
                            <Button onClick={() => handleShare(file.id)}>Share</Button>
                            <Button variant="success" onClick={() => handleDownload(file.id)}>Download</Button>
                            <Button variant="danger" onClick={() => handleDelete(file.id)}>Delete</Button>
                        </ButtonGroup>
                    }
                </td>
            </tr>)}
            </tbody>
        </Table>
    );
}

export default FilesTable;
