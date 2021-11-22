import { Router } from "express";

import { adicionalRoutes } from "./adicional.routes";
import { authenticateUser } from "./authenticate.routes";
import { cardapioRouter } from "./cardapio.routes";
import { refreshTokenRoutes } from "./refreshToken.routes";
import { userRouter } from "./user.routes";

const router = Router();
router.use("/user", userRouter);
router.use("/authenticate", authenticateUser);
router.use("/refresh-token", refreshTokenRoutes);
router.use("/cardapio", cardapioRouter);
router.use("/adicional", adicionalRoutes);

export { router };
