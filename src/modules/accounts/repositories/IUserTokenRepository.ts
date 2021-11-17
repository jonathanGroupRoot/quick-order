import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface IUserTokenRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken>;
}
