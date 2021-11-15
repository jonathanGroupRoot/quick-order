import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

import { User } from "../entities/User";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({ name, email, password });

        await this.repository.save(user);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async list(): Promise<User[]> {
        const user = await this.repository.find();
        return user;
    }

    async findByUser(id: string): Promise<User> {
        return this.repository.findOne(id);
    }
}

export { UserRepository };
