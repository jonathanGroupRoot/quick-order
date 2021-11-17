import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

import { UserToken } from "../entities/UserToken";

export class UserTokenRepository implements IUserTokenRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        this.repository.save(userToken);
        return userToken;
    }
}
