import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

@injectable()
export class DeleteUserUseCase {
    constructor(
        @inject("UserRepository")
        private deleteUserRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.deleteUserRepository.deleteUser(id);
    }
}
