import { ICardapioDTO } from "@modules/cardapio/dtos/ICardapioDTO";
import { CardapioRepositoryInMemory } from "@modules/cardapio/repositories/in-memory/CardapioRepositoryInMemory";

import { ListCardapioUseCase } from "./ListCardapioUseCase";

let cardapioRepositoryInMemory: CardapioRepositoryInMemory;
let listCardapioUseCase: ListCardapioUseCase;

describe("list cardapio use case", () => {
    beforeEach(async () => {
        cardapioRepositoryInMemory = new CardapioRepositoryInMemory();
        listCardapioUseCase = new ListCardapioUseCase(
            cardapioRepositoryInMemory
        );
    });

    it("should be able list all menu", async () => {
        const cardapio: ICardapioDTO = {
            name: "X-burguer",
            description: "Batata palha, provolone",
            value: 15,
        };

        await cardapioRepositoryInMemory.create(cardapio);

        const listCardapio = await listCardapioUseCase.execute();

        expect(listCardapio.length).toBe(1);
        expect(listCardapio[0].name).toBe("X-burguer");
        expect(listCardapio[0].description).toBe("Batata palha, provolone");
        expect(listCardapio[0].value).toBe(15);
    });
});
