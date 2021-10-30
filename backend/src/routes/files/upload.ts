import express from "express";
import multer from 'multer';
import {FileModel} from "../../models/file";
import {requireAuth} from "../../middlewares/require-auth";

const router = express.Router();
const upload = multer({dest: 'uploads/', limits: {fileSize: 3145728}});

router.post(
    '/api/files',
    requireAuth,
    upload.single('file'),
    async (req, res) => {
        const fileModel = FileModel.build({
            name: req.file.originalname,
            path: req.file.path,
            uploadDate: new Date(),
            userId: req.currentUser.id
        });
        await fileModel.save();

        return res.send(fileModel);
    }
);

export { router as uploadFileRouter };
