import { hash } from "bcrypt";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let userTokenRepositoryInMemory: IUserTokenRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeAll(async () => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userTokenRepositoryInMemory = new UserTokenRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory,
            userTokenRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("should be able authenticate user", async () => {
        const user: ICreateUserDTO = {
            name: "Jonathan vinicius",
            email: "jonah@gmail.com",
            password: "210921",
        };

        await createUserUseCase.execute(user);

        const userAuthenticate = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(userAuthenticate).toHaveProperty("token");
        expect(userAuthenticate.user.name).toEqual("Jonathan vinicius");
        expect(userAuthenticate.user.email).toEqual("jonah@gmail.com");
    });

    it("Not should be able authenticate user case email incorrect", async () => {
        const passwordHash = await hash("admin", 8);

        const user = await createUserUseCase.execute({
            name: "Steve Jobs",
            email: "elonmusk@gmail.com",
            password: passwordHash,
        });

        await expect(
            authenticateUserUseCase.execute({
                email: "not-existing-email",
                password: user.password,
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("Not Should be able authenticate user case password incorrect", async () => {
        const user: ICreateUserDTO = {
            name: "jonathan_root_",
            email: "jonathanvin@gmial.com",
            password: "11212",
        };

        await userRepositoryInMemory.create(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "32932032093",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
