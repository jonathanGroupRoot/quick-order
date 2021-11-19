import { ICardapioDTO } from "@modules/cardapio/dtos/ICardapioDTO";
import { CardapioRepositoryInMemory } from "@modules/cardapio/repositories/in-memory/CardapioRepositoryInMemory";

import { DeleteCardapioUseCase } from "./DeleteCardapioUseCase";

let cardapioRepositoryInMemory: CardapioRepositoryInMemory;
let deleteCardapioUseCase: DeleteCardapioUseCase;

describe("Delete Cardapio UseCase", () => {
    beforeEach(async () => {
        cardapioRepositoryInMemory = new CardapioRepositoryInMemory();
        deleteCardapioUseCase = new DeleteCardapioUseCase(
            cardapioRepositoryInMemory
        );
    });

    it("should be able delete cardapio", async () => {
        const cardapio: ICardapioDTO = {
            name: "X-provolone",
            description: "provolobe",
            value: 19,
        };

        const createCardapio = await cardapioRepositoryInMemory.create(
            cardapio
        );

        await deleteCardapioUseCase.execute(createCardapio.id);
    });
});
