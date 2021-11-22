import { inject, injectable } from "tsyringe";

import { Adicional } from "@modules/adicionais/infra/typeorm/entities/Adicionais";
import { IAdicionalRepository } from "@modules/adicionais/repositories/IAdicionalRepository";

@injectable()
export class ListAdicionalUseCase {
    constructor(
        @inject("AdicionalRepository")
        private adicionalRepository: IAdicionalRepository
    ) {}

    async execute(): Promise<Adicional[]> {
        const adicional = await this.adicionalRepository.list();

        return adicional;
    }
}
