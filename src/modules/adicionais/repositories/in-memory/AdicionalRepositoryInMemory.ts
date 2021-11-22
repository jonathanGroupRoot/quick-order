import { IAdicionalDTO } from "@modules/adicionais/dtos/IAdicionalDTO";
import { Adicional } from "@modules/adicionais/infra/typeorm/entities/Adicionais";

import { IAdicionalRepository } from "../IAdicionalRepository";

export class AdicionalRepositoryInMemory implements IAdicionalRepository {
    private adicionais: Adicional[] = [];

    async create({ name, value }: IAdicionalDTO): Promise<Adicional> {
        const adicional = new Adicional();

        Object.assign(adicional, {
            name,
            value,
        });

        this.adicionais.push(adicional);

        return adicional;
    }

    async update(id: string, name: string, value: number): Promise<void> {
        const adicional = this.adicionais.findIndex(
            (adicional) => adicional.id === id
        );

        this.adicionais[adicional].name = name;
        this.adicionais[adicional].value = value;
    }

    async list(): Promise<Adicional[]> {
        return this.adicionais;
    }

    async deleteById(id: string): Promise<void> {
        const adicional = this.adicionais.find(
            (adicional) => adicional.id === id
        );

        this.adicionais.splice(this.adicionais.indexOf(adicional));
    }

    async findById(id: string): Promise<Adicional> {
        const adicional = this.adicionais.find(
            (adicional) => adicional.id === id
        );

        return adicional;
    }

    async findByName(name: string): Promise<Adicional> {
        return this.adicionais.find((adicional) => adicional.name === name);
    }
}
