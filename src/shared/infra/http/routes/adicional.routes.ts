import { Router } from "express";

import { CreateAdicionalController } from "@modules/adicionais/useCases/createAdicional/CreateAdicionalController";
import { ListAdicionalController } from "@modules/adicionais/useCases/listAdicional/ListAdicionalController";

const adicionalRoutes = Router();
const createAdicionalController = new CreateAdicionalController();
const listAdicionalController = new ListAdicionalController();

adicionalRoutes.post("/", createAdicionalController.handle);
adicionalRoutes.get("/", listAdicionalController.handle);

export { adicionalRoutes };
