import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
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
        private userTokenRepository: IUserTokenRepository,

        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
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

        const {
            SECRET_TOKEN,
            EXPIRES_IN,
            EXPIRES_IN_REFRESH_TOKEN,
            EXPIRES_REFRESH_TOKEN_IN_DAYS,
        } = auth;

        const token = sign({}, SECRET_TOKEN, {
            subject: user.id,
            expiresIn: EXPIRES_IN,
        });

        const refresh_token = sign({ email }, SECRET_TOKEN, {
            subject: user.id,
            expiresIn: EXPIRES_IN_REFRESH_TOKEN,
        });

        const expires_date = this.dayjsDateProvider.addDays(
            EXPIRES_REFRESH_TOKEN_IN_DAYS
        );

        await this.userTokenRepository.create({
            user_id: user.id,
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
