import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

@injectable()
export class ListUserUserCase {
    constructor(
        @inject(UserRepository)
        private listUserUseCase: IUserRepository
    ) {}

    async execute(): Promise<User[]> {
        const user = await this.listUserUseCase.list();

        return user;
    }
}
