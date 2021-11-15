import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createUserCase = container.resolve(CreateUserUseCase);
        const { name, email, password } = request.body;

        const user = await createUserCase.execute({
            name,
            email,
            password,
        });
        return response.status(201).json(user);
    }
}
