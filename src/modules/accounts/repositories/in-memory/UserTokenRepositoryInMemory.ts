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

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const user = this.usersToken.find(
            (user) =>
                user.user_id === user_id && user.refresh_token === refresh_token
        );

        return user;
    }

    async deleteById(id: string): Promise<void> {
        const user = this.usersToken.find((user) => user.id === id);
        this.usersToken.splice(this.usersToken.indexOf(user));
    }
}
