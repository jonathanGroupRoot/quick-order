import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAdicionalUseCase } from "./DeleteAdicionalUseCase";

export class DeleteAdicionalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteAdicionalUseCase = container.resolve(
            DeleteAdicionalUseCase
        );

        await deleteAdicionalUseCase.execute(id);

        return response.send();
    }
}
