import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAdicionalUseCase } from "./CreateAdicionalUseCase";

export class CreateAdicionalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, value } = request.body;

        const createAdicionalUseCase = container.resolve(
            CreateAdicionalUseCase
        );

        const adicional = await createAdicionalUseCase.execute({ name, value });

        return response.status(201).json(adicional);
    }
}
