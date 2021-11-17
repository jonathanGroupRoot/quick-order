import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUser = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateUser.post("/", authenticateUserController.handle);

export { authenticateUser };
