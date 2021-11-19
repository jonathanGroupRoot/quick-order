import { inject, injectable } from "tsyringe";

import { ICardapioDTO } from "@modules/cardapio/dtos/ICardapioDTO";
import { Cardapio } from "@modules/cardapio/infra/typeorm/entities/Cardapio";
import { ICardapioRepository } from "@modules/cardapio/repositories/ICardapioRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateCardapioUseCase {
    constructor(
        @inject("CardapioRepository")
        private cardapioRepository: ICardapioRepository
    ) {}

    async execute({
        name,
        description,
        value,
    }: ICardapioDTO): Promise<Cardapio> {
        const cardapioByName = await this.cardapioRepository.findByNameCardapio(
            name
        );

        if (cardapioByName) {
            throw new AppError("Menu already exists");
        }

        const cardapio = await this.cardapioRepository.create({
            name,
            description,
            value,
        });

        return cardapio;
    }
}
