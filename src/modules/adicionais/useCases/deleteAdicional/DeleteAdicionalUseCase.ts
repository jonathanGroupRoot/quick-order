import { inject, injectable } from "tsyringe";

import { IAdicionalRepository } from "@modules/adicionais/repositories/IAdicionalRepository";

@injectable()
export class DeleteAdicionalUseCase {
    constructor(
        @inject("AdicionalRepository")
        private adicionalRepository: IAdicionalRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.adicionalRepository.deleteById(id);
    }
}
