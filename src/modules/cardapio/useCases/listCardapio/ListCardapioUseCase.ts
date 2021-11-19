import { inject, injectable } from "tsyringe";

import { Cardapio } from "@modules/cardapio/infra/typeorm/entities/Cardapio";
import { ICardapioRepository } from "@modules/cardapio/repositories/ICardapioRepository";

@injectable()
export class ListCardapioUseCase {
    constructor(
        @inject("CardapioRepository")
        private cardapioRepository: ICardapioRepository
    ) {}

    async execute(): Promise<Cardapio[]> {
        const cardapio = await this.cardapioRepository.list();

        return cardapio;
    }
}
