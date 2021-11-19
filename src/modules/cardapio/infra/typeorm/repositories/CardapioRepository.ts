import { getRepository, Repository } from "typeorm";

import { ICardapioDTO } from "@modules/cardapio/dtos/ICardapioDTO";
import { ICardapioRepository } from "@modules/cardapio/repositories/ICardapioRepository";

import { Cardapio } from "../entities/Cardapio";

export class CardapioRepository implements ICardapioRepository {
    private repository: Repository<Cardapio>;

    constructor() {
        this.repository = getRepository(Cardapio);
    }

    async create({
        name,
        description,
        value,
    }: ICardapioDTO): Promise<Cardapio> {
        const user = this.repository.create({ name, description, value });
        await this.repository.save(user);
        return user;
    }

    async update({ id, name, description, value }): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ name, description, value })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async list(): Promise<Cardapio[]> {
        return this.repository.find();
    }

    async findByNameCardapio(name: string): Promise<Cardapio> {
        const user = await this.repository.findOne({
            where: {
                name,
            },
        });

        return user;
    }

    async findById(id: string): Promise<Cardapio> {
        return this.repository.findOne(id);
    }
}
