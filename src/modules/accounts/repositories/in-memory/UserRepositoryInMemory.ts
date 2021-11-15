import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
    findByUser(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    users: User[] = [];

    async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            name,
            email,
            password,
        });

        this.users.push(user);
        return user;
    }

    async list(): Promise<User[]> {
        const all = this.users;
        return all;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }
}

export { UserRepositoryInMemory };
