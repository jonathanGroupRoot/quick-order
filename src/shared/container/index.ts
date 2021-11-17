import { container } from "tsyringe";
import "@shared/container/providers";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IUserTokenRepository>(
    "UserTokenRepository",
    UserTokenRepository
);
