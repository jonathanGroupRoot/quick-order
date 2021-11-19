import { container } from "tsyringe";
import "@shared/container/providers";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { CardapioRepository } from "@modules/cardapio/infra/typeorm/repositories/CardapioRepository";
import { ICardapioRepository } from "@modules/cardapio/repositories/ICardapioRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IUserTokenRepository>(
    "UserTokenRepository",
    UserTokenRepository
);

container.registerSingleton<ICardapioRepository>(
    "CardapioRepository",
    CardapioRepository
);
