import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAdicionalUseCase } from "./UpdateAdicionalUseCase";

export class UpdateAdicionalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, value } = request.body;

        const updateAdicionalUseCase = container.resolve(
            UpdateAdicionalUseCase
        );

        await updateAdicionalUseCase.execute({ id, name, value });

        return response.send();
    }
}
