import React, {useCallback, useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {fileRepo} from "../../../../services/api";

interface ShareModalProps {
    show: boolean;
    handleClose: () => void;
    params: { fileId: string } | undefined;
}

const ShareModal = ({show, handleClose, params}: ShareModalProps): JSX.Element => {
    const [shareToken, setShareToken] = useState<string>('');

    const getShareToken = useCallback(async () => {
        if (params?.fileId) {
            const response = await fileRepo.getShareToken(params.fileId);
            setShareToken(response.data.token);
        }
    }, [params]);

    useEffect(() => {
        if (params?.fileId) {
            getShareToken();
        }
    }, [params, getShareToken]);

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Share file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Here is the link for share: {`${process.env.REACT_APP_FRONTEND_URL}/files/share/${shareToken}`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShareModal;
