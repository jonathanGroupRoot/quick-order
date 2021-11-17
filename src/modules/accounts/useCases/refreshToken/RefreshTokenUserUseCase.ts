import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
export class RefreshTokenUserUseCase {
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,

        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { SECRET_TOKEN, EXPIRES_IN, EXPIRES_REFRESH_TOKEN_IN_DAYS } =
            auth;

        const { sub, email } = verify(token, SECRET_TOKEN) as IPayload;

        const user_id = sub;
        const userToken =
            await this.userTokenRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token does not exits");
        }

        await this.userTokenRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, SECRET_TOKEN, {
            subject: sub,
            expiresIn: EXPIRES_IN,
        });

        const expires_date = this.dayjsDateProvider.addDays(
            EXPIRES_REFRESH_TOKEN_IN_DAYS
        );

        await this.userTokenRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        const newToken = sign({}, SECRET_TOKEN, {
            subject: user_id,
            expiresIn: EXPIRES_IN,
        });

        return {
            refresh_token,
            token: newToken,
        };
    }
}
