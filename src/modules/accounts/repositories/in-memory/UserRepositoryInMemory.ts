import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
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

    async deleteUser(id: string): Promise<void> {
        const user = this.users.find((user) => user.id === id);
        this.users.splice(this.users.indexOf(user));
    }

    async updateUser(
        id: string,
        name: string,
        email: string,
        password: string
    ): Promise<void> {
        const user = this.users.findIndex((user) => user.id === id);
        this.users[user].name = name;
        this.users[user].email = email;
        this.users[user].password = password;
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}

export { UserRepositoryInMemory };
