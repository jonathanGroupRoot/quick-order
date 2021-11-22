import { Router } from "express";

import { CreateAdicionalController } from "@modules/adicionais/useCases/createAdicional/CreateAdicionalController";
import { DeleteAdicionalController } from "@modules/adicionais/useCases/deleteAdicional/DeleteAdicionalController";
import { ListAdicionalController } from "@modules/adicionais/useCases/listAdicional/ListAdicionalController";
import { UpdateAdicionalController } from "@modules/adicionais/useCases/updateAdicional/UpdateAdicionalController";

const adicionalRoutes = Router();
const createAdicionalController = new CreateAdicionalController();
const listAdicionalController = new ListAdicionalController();
const deleteAdicionalController = new DeleteAdicionalController();
const updateAdicionalController = new UpdateAdicionalController();

adicionalRoutes.get("/", listAdicionalController.handle);
adicionalRoutes.post("/", createAdicionalController.handle);
adicionalRoutes.put("/:id", updateAdicionalController.handle);
adicionalRoutes.delete("/:id", deleteAdicionalController.handle);

export { adicionalRoutes };
