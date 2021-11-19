import { inject, injectable } from "tsyringe";

import { ICardapioRepository } from "@modules/cardapio/repositories/ICardapioRepository";

@injectable()
export class DeleteCardapioUseCase {
    constructor(
        @inject("CardapioRepository")
        private cardapioRepository: ICardapioRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.cardapioRepository.deleteById(id);
    }
}
