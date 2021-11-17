import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUserTokenRepository } from "../IUserTokenRepository";

export class UserTokenRepositoryInMemory implements IUserTokenRepository {
    private usersToken: UserToken[] = [];

    async create({
        refresh_token,
        expires_date,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            refresh_token,
            expires_date,
            user_id,
        });

        this.usersToken.push(userToken);

        return userToken;
    }
}
