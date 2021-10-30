import express from "express";

import {User} from "../../models/user";
import {requireAuth} from "../../middlewares/require-auth";

const router = express.Router();

router.get(
    '/api/auth/currentuser',
    requireAuth,
    async (req, res) => {
        const user = await User.findById(req.currentUser.id);

        return res.send(user);
    }
);

export {router as currentUserRouter};
