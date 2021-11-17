import { Router } from "express";

import { authenticateUser } from "./authenticate.routes";
import { userRouter } from "./user.routes";

const router = Router();
router.use("/user", userRouter);
router.use("/authenticate", authenticateUser);

export { router };
