import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCardapioUseCase } from "./CreateCardapioUseCase";

export class CreateCardapioController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, value } = request.body;

        const createCardapioUseCase = container.resolve(CreateCardapioUseCase);

        await createCardapioUseCase.execute({
            name,
            description,
            value,
        });

        return response.status(201).send();
    }
}
