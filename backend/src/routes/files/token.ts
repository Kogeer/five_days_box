import express, {Request, Response} from "express";
import {randomBytes} from "crypto";
import {Token} from "../../models/token";
import {requireAuth} from "../../middlewares/require-auth";
import {FileModel} from "../../models/file";
import {BadRequestError} from "../../errors/bad-request-error";

const router = express.Router();

router.get(
    '/api/files/token/:fileId',
    requireAuth,
    async (req: Request, res: Response) => {
        const {fileId} = req.params;
        const existsFile = await FileModel.findById(fileId);

        if (req.currentUser.id !== existsFile.userId) {
            throw new BadRequestError('You can\'t share this file!');
        }

        const existsToken = await Token.findOne({fileId})

        if (existsToken) {
            return res.send(existsToken);
        }

        const generatedToken = randomBytes(8).toString('hex');
        const token = Token.build({
            token: generatedToken,
            fileId: fileId
        });
        await token.save();

        res.send(token);
    }
);

export { router as getFileToken };
