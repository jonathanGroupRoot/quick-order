import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    list(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(user: string): Promise<User>;
    deleteUser(user: string): Promise<void>;
    updateUser(
        id: string,
        name: string,
        email: string,
        password: string
    ): Promise<void>;
}

export { IUserRepository };
