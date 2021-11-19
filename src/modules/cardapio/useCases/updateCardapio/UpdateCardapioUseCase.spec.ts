import { ICardapioDTO } from "@modules/cardapio/dtos/ICardapioDTO";
import { CardapioRepositoryInMemory } from "@modules/cardapio/repositories/in-memory/CardapioRepositoryInMemory";

import { CreateCardapioUseCase } from "../createCardapio/CreateCardapioUseCase";
import { UpdateCardapioUseCase } from "./UpdateCardapioUseCase";

let cardapioRepositoryInMemory: CardapioRepositoryInMemory;
let updateCardapioUseCase: UpdateCardapioUseCase;
let createCardapioUseCase: CreateCardapioUseCase;

describe("Update Cardapio UseCase", () => {
    beforeEach(async () => {
        cardapioRepositoryInMemory = new CardapioRepositoryInMemory();
        updateCardapioUseCase = new UpdateCardapioUseCase(
            cardapioRepositoryInMemory
        );
        createCardapioUseCase = new CreateCardapioUseCase(
            cardapioRepositoryInMemory
        );
    });

    it("should be able update cardapio", async () => {
        const cardapio: ICardapioDTO = {
            name: "X-ja",
            description: "pão, provolone",
            value: 90,
        };

        const createCardapio = await createCardapioUseCase.execute(cardapio);

        await updateCardapioUseCase.execute({
            id: createCardapio.id,
            name: "X-tudo",
            description: "Ovo, pão",
            value: 12,
        });
        expect(createCardapio.name).toBe("X-tudo");
        expect(createCardapio.description).toBe("Ovo, pão");
        expect(createCardapio.value).toBe(12);
    });
});
