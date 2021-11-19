import { ICardapioDTO } from "@modules/cardapio/dtos/ICardapioDTO";
import { Cardapio } from "@modules/cardapio/infra/typeorm/entities/Cardapio";

import { ICardapioRepository } from "../ICardapioRepository";

export class CardapioRepositoryInMemory implements ICardapioRepository {
    private cardapios: Cardapio[] = [];

    async create({
        name,
        description,
        value,
    }: ICardapioDTO): Promise<Cardapio> {
        const cardapio = new Cardapio();

        Object.assign(cardapio, {
            name,
            description,
            value,
        });

        this.cardapios.push(cardapio);

        return cardapio;
    }

    async update({ id, name, description, value }): Promise<void> {
        const cardapio = this.cardapios.findIndex((cardp) => cardp.id === id);

        this.cardapios[cardapio].name = name;
        this.cardapios[cardapio].description = description;
        this.cardapios[cardapio].value = value;
    }

    async deleteById(id: string): Promise<void> {
        const cardapio = this.cardapios.find((cardp) => cardp.id === id);
        this.cardapios.splice(this.cardapios.indexOf(cardapio));
    }

    async list(): Promise<Cardapio[]> {
        return this.cardapios;
    }

    async findByNameCardapio(name: string): Promise<Cardapio> {
        return this.cardapios.find((cardp) => cardp.name === name);
    }

    async findById(id: string): Promise<Cardapio> {
        return this.cardapios.find((cardap) => cardap.id === id);
    }
}
