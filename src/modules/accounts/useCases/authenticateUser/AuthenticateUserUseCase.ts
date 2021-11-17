import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequestAuthenticate {
    email: string;
    password: string;
}

interface IResponseToken {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private authenticateUserUseCase: IUserRepository
    ) {}

    async execute({
        email,
        password,
    }: IRequestAuthenticate): Promise<IResponseToken> {
        const user = await this.authenticateUserUseCase.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const { SECRET_TOKEN, EXPIRES_IN } = auth;

        const token = sign({ email }, SECRET_TOKEN, {
            subject: user.id,
            expiresIn: EXPIRES_IN,
        });

        const tokenReturn: IResponseToken = {
            token,
            user: { name: user.name, email: user.email },
        };

        return tokenReturn;
    }
}
