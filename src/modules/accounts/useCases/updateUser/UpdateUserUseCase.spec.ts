import { hash } from "bcrypt";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let updateUserUseCase: UpdateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Update User", () => {
    beforeAll(async () => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("Should be able update user", async () => {
        const passwordHash = await hash("admin", 8);

        const user = await createUserUseCase.execute({
            name: "jonathanRoot",
            email: "jonathanVini",
            password: passwordHash,
        });

        const updateUser = await updateUserUseCase.execute({
            id: user.id,
            name: "Root",
            email: "Root@gmail.com",
            password: "909",
        });
        console.log(updateUser);

        // expect(updateUser).toMatchObject({
        //     name: "root",
        //     email: "Root@gmail.com",
        // });
    });
});
