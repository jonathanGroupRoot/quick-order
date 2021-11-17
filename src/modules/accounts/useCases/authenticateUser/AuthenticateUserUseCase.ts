import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
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
    refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private authenticateUserUseCase: IUserRepository,

        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository
    ) {}

    async execute({
        email,
        password,
    }: IRequestAuthenticate): Promise<IResponseToken> {
        const user = await this.authenticateUserUseCase.findByEmail(email);

        const { id } = user;
        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const { SECRET_TOKEN, EXPIRES_IN, EXPIRES_IN_REFRESH_TOKEN } = auth;

        const token = sign({}, SECRET_TOKEN, {
            subject: user.id,
            expiresIn: EXPIRES_IN,
        });

        const refresh_token = sign({ email }, SECRET_TOKEN, {
            subject: user.id,
            expiresIn: EXPIRES_IN_REFRESH_TOKEN,
        });

        const expires_date = new Date();

        await this.userTokenRepository.create({
            user_id: id,
            refresh_token,
            expires_date,
        });

        const tokenReturn: IResponseToken = {
            token,
            user: { name: user.name, email: user.email },
            refresh_token,
        };

        return tokenReturn;
    }
}
