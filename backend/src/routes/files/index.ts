import express, {Request, Response} from "express";
import {FileModel} from "../../models/file";

const router = express.Router();

router.get(
    '/api/files',
    async (req: Request, res: Response) => {
        const fileList = await FileModel.find();

        res.send(fileList);
    }
);

export {router as indexFilesRouter};
