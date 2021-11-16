import { hash } from "bcrypt";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListUserUserCase } from "./ListUserUseCase";

let listUserUseCase: ListUserUserCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("List User", () => {
    beforeAll(async () => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        listUserUseCase = new ListUserUserCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("Should be able list all users", async () => {
        const passwordHash = await hash("admin", 8);

        const users = await createUserUseCase.execute({
            name: "Jonathan vinicius",
            email: "jonathangrouoproot@gmail.com",
            password: passwordHash,
        });

        const userList = await listUserUseCase.execute();

        expect(userList).toEqual([users]);
        expect(userList.length).toBe(1);
    });
});
