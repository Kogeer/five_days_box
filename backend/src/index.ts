import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined!');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined!');
    }
    if (!process.env.FRONTEND_URL) {
        throw new Error('FRONTEND_URL must be defined!');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        console.error(err);
    }

    app.listen(8000, () => {
        console.log('Backend service listening on port 8000!');
    });
}

start();
