import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

import { User } from "../infra/typeorm/entities/User";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
        const userByEmail = await this.usersRepository.findByEmail(email);

        if (userByEmail) {
            throw new AppError("User already exists");
        }

        const passHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: passHash,
        });

        return user;
    }
}

export { CreateUserUseCase };
