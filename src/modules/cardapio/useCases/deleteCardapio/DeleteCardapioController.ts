import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCardapioUseCase } from "./DeleteCardapioUseCase";

export class DeleteCardapioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteCardapioUseCase = container.resolve(DeleteCardapioUseCase);

        await deleteCardapioUseCase.execute(id);

        return response.send();
    }
}
