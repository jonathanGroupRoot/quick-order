import { Router } from "express";

import { CreateAdicionalController } from "@modules/adicionais/useCases/createAdicional/CreateAdicionalController";
import { DeleteAdicionalController } from "@modules/adicionais/useCases/deleteAdicional/DeleteAdicionalController";
import { ListAdicionalController } from "@modules/adicionais/useCases/listAdicional/ListAdicionalController";

const adicionalRoutes = Router();
const createAdicionalController = new CreateAdicionalController();
const listAdicionalController = new ListAdicionalController();
const deleteAdicionalController = new DeleteAdicionalController();

adicionalRoutes.post("/", createAdicionalController.handle);
adicionalRoutes.get("/", listAdicionalController.handle);
adicionalRoutes.delete("/:id", deleteAdicionalController.handle);

export { adicionalRoutes };
