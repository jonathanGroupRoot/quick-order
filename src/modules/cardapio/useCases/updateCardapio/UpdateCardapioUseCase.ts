import { inject, injectable } from "tsyringe";

import { ICardapioRepository } from "@modules/cardapio/repositories/ICardapioRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequestCardapio {
    id: string;
    name: string;
    description: string;
    value: number;
}

@injectable()
export class UpdateCardapioUseCase {
    constructor(
        @inject("CardapioRepository")
        private cardapioRepository: ICardapioRepository
    ) {}

    async execute({
        id,
        name,
        description,
        value,
    }: IRequestCardapio): Promise<void> {
        const cardapioByName = await this.cardapioRepository.findById(id);

        if (!cardapioByName) {
            throw new AppError("Cardapio does not exists");
        }

        await this.cardapioRepository.update({
            id,
            name,
            description,
            value,
        });
    }
}
