import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequestUpdateUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

@injectable()
export class UpdateUserUseCase {
    constructor(
        @inject("UserRepository")
        private updateUserUseCase: IUserRepository
    ) {}

    async execute({
        id,
        name,
        email,
        password,
    }: IRequestUpdateUser): Promise<void> {
        const user = await this.updateUserUseCase.findById(id);

        if (!user) {
            throw new AppError("User does not exists");
        }

        await this.updateUserUseCase.updateUser(user.id, name, email, password);
    }
}
