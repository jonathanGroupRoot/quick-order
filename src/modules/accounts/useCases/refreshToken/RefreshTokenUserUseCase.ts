import { inject } from "tsyringe";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

export class RefreshTokenUserUseCase {
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository
    ) {}

    async handle({
        refresh_token,
        expires_date,
        user_id,
    }: ICreateUserTokenDTO): Promise<void> {
        await this.userTokenRepository.create({
            refresh_token,
            expires_date,
            user_id,
        });
    }
}
