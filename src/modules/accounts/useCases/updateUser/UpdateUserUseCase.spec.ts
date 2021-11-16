import { hash } from "bcrypt";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

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

        await updateUserUseCase.execute({
            id: user.id,
            name: "Jonathan",
            email: "root@gmail.com",
            password: passwordHash,
        });

        expect(user).toMatchObject({
            name: "Jonathan",
            email: "root@gmail.com",
        });
        expect(user.name).toBe("Jonathan");
        expect(user.email).toBe("root@gmail.com");
    });

    it("should not be able to update the profile from non-existing user", async () => {
        const passwordHash = await hash("admin", 8);

        await createUserUseCase.execute({
            name: "root",
            email: "jonathanVINI",
            password: passwordHash,
        });

        await expect(
            updateUserUseCase.execute({
                id: "non-existing-id",
                name: "JonathanRooot",
                email: "jonathanvinicius@gmail.com",
                password: "98281",
            })
        ).rejects.toEqual(new AppError("User does not exists"));
    });
});
