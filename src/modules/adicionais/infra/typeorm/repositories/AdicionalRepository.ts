import { getRepository, Repository } from "typeorm";

import { IAdicionalDTO } from "@modules/adicionais/dtos/IAdicionalDTO";
import { IAdicionalRepository } from "@modules/adicionais/repositories/IAdicionalRepository";

import { Adicional } from "../entities/Adicionais";

export class AdicionalRepository implements IAdicionalRepository {
    private repository: Repository<Adicional>;

    constructor() {
        this.repository = getRepository(Adicional);
    }

    async create({ name, value }: IAdicionalDTO): Promise<Adicional> {
        const adicional = this.repository.create({ name, value });

        await this.repository.save(adicional);

        return adicional;
    }

    async update(id: string, name: string, value: number): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ name, value })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async list(): Promise<Adicional[]> {
        return this.repository.find();
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findById(id: string): Promise<Adicional> {
        return this.repository.findOne(id);
    }

    async findByName(name: string): Promise<Adicional> {
        return this.repository.findOne({
            where: {
                name,
            },
        });
    }
}
