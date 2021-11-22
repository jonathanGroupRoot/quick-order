import { inject, injectable } from "tsyringe";

import { IAdicionalDTO } from "@modules/adicionais/dtos/IAdicionalDTO";
import { IAdicionalRepository } from "@modules/adicionais/repositories/IAdicionalRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateAdicionalUseCase {
    constructor(
        @inject("AdicionalRepository")
        private adicionalRepository: IAdicionalRepository
    ) {}
    async execute({ name, value }: IAdicionalDTO) {
        const adicional = await this.adicionalRepository.findByName(name);

        if (adicional) {
            throw new AppError("Adicional exits");
        }

        const createAdicional = await this.adicionalRepository.create({
            name,
            value,
        });

        return createAdicional;
    }
}
