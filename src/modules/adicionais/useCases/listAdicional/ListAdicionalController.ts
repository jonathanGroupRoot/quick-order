import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAdicionalUseCase } from "./ListAdicionalUseCase";

export class ListAdicionalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAdicionalUseCase = container.resolve(ListAdicionalUseCase);

        const adicional = await listAdicionalUseCase.execute();

        return response.json(adicional);
    }
}
