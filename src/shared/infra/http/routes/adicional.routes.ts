import { Router } from "express";

import { CreateAdicionalController } from "@modules/adicionais/useCases/createAdicional/CreateAdicionalController";

const adicionalRoutes = Router();
const createAdicionalController = new CreateAdicionalController();

adicionalRoutes.post("/", createAdicionalController.handle);

export { adicionalRoutes };
