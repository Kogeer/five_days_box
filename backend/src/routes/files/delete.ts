import express, {Request, Response} from "express";
import {FileModel} from "../../models/file";
import {BadRequestError} from "../../errors/bad-request-error";
import * as fs from "fs";
import path from "path";
import {requireAuth} from "../../middlewares/require-auth";

const router = express.Router();

router.delete(
    '/api/files/:fileId',
    requireAuth,
    async (req: Request, res: Response) => {
        const {fileId} = req.params;
        const file = await FileModel.findById(fileId);

        if (!file) {
            throw new BadRequestError('File not exists');
        }

        if (file.userId !== req.currentUser.id) {
            throw new BadRequestError('You can\'t delete file');
        }

        try {
            fs.unlinkSync(path.resolve(file.path))
        } catch (e) {
            console.error(e);
        }

        file.deleteOne();

        return res.sendStatus(200);
    }
);

export {router as deleteFileRouter};
