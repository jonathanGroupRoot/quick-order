import { ICardapioDTO } from "@modules/cardapio/dtos/ICardapioDTO";
import { CardapioRepositoryInMemory } from "@modules/cardapio/repositories/in-memory/CardapioRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCardapioUseCase } from "./CreateCardapioUseCase";

let cardapioRepositoryInMemory: CardapioRepositoryInMemory;
let createCardapioUseCase: CreateCardapioUseCase;

describe("Create Cardapio UseCase", () => {
    beforeEach(() => {
        cardapioRepositoryInMemory = new CardapioRepositoryInMemory();
        createCardapioUseCase = new CreateCardapioUseCase(
            cardapioRepositoryInMemory
        );
    });

    it("should be able create cardapio", async () => {
        const cardapio: ICardapioDTO = {
            name: "X-TUDO",
            description: "Pão, ovo, mussarela",
            value: 12,
        };

        const cardap = await createCardapioUseCase.execute(cardapio);

        expect(cardap.name).toBe("X-TUDO");
        expect(cardap.description).toBe("Pão, ovo, mussarela");
        expect(cardap.value).toBe(12);
    });

    it("should not be able to create the menu with the existing name", async () => {
        const cardapio: ICardapioDTO = {
            name: "X-TUDO",
            description: "Pão, ovo, mussarela",
            value: 12,
        };

        await createCardapioUseCase.execute(cardapio);

        await expect(createCardapioUseCase.execute(cardapio)).rejects.toEqual(
            new AppError("Menu already exists")
        );
    });
});
