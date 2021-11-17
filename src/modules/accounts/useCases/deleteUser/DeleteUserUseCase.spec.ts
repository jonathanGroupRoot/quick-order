import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Delete User", () => {
    beforeAll(async () => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("Should be able delete user exists", async () => {
        const user = await createUserUseCase.execute({
            name: "jonathan",
            email: "vini@gmail.com",
            password: "8326323",
        });

        await deleteUserUseCase.execute(user.id);
    });
});
