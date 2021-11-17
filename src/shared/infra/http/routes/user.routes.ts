import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/accounts/useCases/deleteUser/DeleteUserController";
import { ListUserController } from "@modules/accounts/useCases/listUser/ListUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const userRouter = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

userRouter.post("/", createUserController.handle);
userRouter.get("/", ensureAuthenticate, listUserController.handle);
userRouter.put("/:id", updateUserController.handle);
userRouter.delete("/:id", deleteUserController.handle);

export { userRouter };
