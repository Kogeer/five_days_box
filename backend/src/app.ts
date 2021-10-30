import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from "cookie-session";
import cors from 'cors';
const rateLimit = require('express-rate-limit');

import {currentUser} from "./middlewares/current-user";
import {signupRouter} from "./routes/auth/signup";
import {signinRouter} from "./routes/auth/signin";
import {signoutRouter} from "./routes/auth/signout";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";
import {currentUserRouter} from "./routes/auth/current-user";
import {indexFilesRouter} from "./routes/files";
import {uploadFileRouter} from "./routes/files/upload";
import {getFileToken} from "./routes/files/token";
import {downloadFileRouter} from "./routes/files/download";
import {deleteFileRouter} from "./routes/files/delete";

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ['Content-Disposition']
};
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100
});

const app = express();

app.disable('X-Powered-By');
app.use(cors(corsOptions));
app.use(json());
app.use(
    cookieSession({
        name: 'sessId',
        signed: false,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 8 * (60 * 60 * 1000))
    })
);
app.use(limiter);

app.use(currentUser);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(indexFilesRouter);
app.use(uploadFileRouter);
app.use(getFileToken);
app.use(downloadFileRouter);
app.use(deleteFileRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
