import express, {Request, Response} from "express";
import {FileModel} from "../../models/file";
import * as path from "path";
import {Token} from "../../models/token";
import {BadRequestError} from "../../errors/bad-request-error";
import {requireAuth} from "../../middlewares/require-auth";

const router = express.Router();

router.get(
    '/api/files/download/:fileId',
    requireAuth,
    async (req: Request, res: Response) => {
        const {fileId} = req.params;
        const file = await FileModel.findById(fileId);

        if (file.userId !== req.currentUser.id) {
            throw new BadRequestError('You can\'t download this file');
        }

        return res.download(path.resolve(file.path), file.name);
    }
);

router.get(
    '/api/files/share',
    async (req: Request, res: Response) => {
        const {token} = req.query;
        const existsToken = await Token.findOne({token: token as string});

        if (!existsToken) {
            throw new BadRequestError('Token is invalid');
        }

        const existsFile = await FileModel.findById(existsToken.fileId);

        if (!existsFile) {
            existsToken.deleteOne();
            throw new BadRequestError('Deleted file');
        }
        existsToken.deleteOne();

        return res.download(path.resolve(existsFile.path), existsFile.name);
    }
)

export {router as downloadFileRouter};
