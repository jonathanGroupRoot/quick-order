import { Router } from "express";

import { CreateCardapioController } from "@modules/cardapio/useCases/createCardapio/CreateCardapioController";
import { DeleteCardapioController } from "@modules/cardapio/useCases/deleteCardapio/DeleteCardapioController";
import { ListCardapioController } from "@modules/cardapio/useCases/listCardapio/ListCardapioController";
import { UpdateCardapioController } from "@modules/cardapio/useCases/updateCardapio/UpdateCardapioController";

const cardapioRouter = Router();
const createCardapioController = new CreateCardapioController();
const listCardapioController = new ListCardapioController();
const deleteCardapioController = new DeleteCardapioController();
const updateCardapioController = new UpdateCardapioController();

cardapioRouter.get("/", listCardapioController.handle);
cardapioRouter.post("/", createCardapioController.handle);
cardapioRouter.put("/:id", updateCardapioController.handle);
cardapioRouter.delete("/:id", deleteCardapioController.handle);

export { cardapioRouter };
