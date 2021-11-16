import { AppError } from "@shared/errors/AppError";

import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("should be able create a new user", async () => {
        const users = await createUserUseCase.execute({
            name: "Jonathan",
            email: "jonathangrouproot",
            password: "12323",
        });

        expect(users).toHaveProperty("id");
        expect(users).toHaveProperty("name");
        expect(users).toHaveProperty("email");
        expect(users).toHaveProperty("password");
    });

    it("not should be able create a new user", async () => {
        await createUserUseCase.execute({
            name: "Jonathan Vinicius",
            email: "jonathangrouproot2",
            password: "12323",
        });

        await expect(
            createUserUseCase.execute({
                name: "Jonathan Vinicius",
                email: "jonathangrouproot2",
                password: "12323",
            })
        ).rejects.toEqual(new AppError("User already exists"));
    });
});
