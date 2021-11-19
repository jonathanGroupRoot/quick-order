import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCardapioUseCase } from "./ListCardapioUseCase";

export class ListCardapioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCardapioUseCase = container.resolve(ListCardapioUseCase);

        const cardapio = await listCardapioUseCase.execute();

        return response.json(cardapio);
    }
}
