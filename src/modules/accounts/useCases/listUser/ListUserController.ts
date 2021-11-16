import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserUserCase } from "./ListUserUseCase";

export class ListUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listUserUseCase = container.resolve(ListUserUserCase);

        const user = await listUserUseCase.execute();

        return response.status(200).json(user);
    }
}
