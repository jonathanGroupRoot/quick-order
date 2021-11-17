import { Router } from "express";

import { RefreshTokenUserController } from "@modules/accounts/useCases/refreshToken/RefreshTokenUserController";

const refreshTokenRoutes = Router();
const refreshTokenUserController = new RefreshTokenUserController();

refreshTokenRoutes.post("/", refreshTokenUserController.handle);

export { refreshTokenRoutes };
