import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCardapioUseCase } from "./UpdateCardapioUseCase";

export class UpdateCardapioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { name, description, value } = request.body;

        const updateCardapioUseCase = container.resolve(UpdateCardapioUseCase);

        await updateCardapioUseCase.execute({ id, name, description, value });

        return response.send();
    }
}
