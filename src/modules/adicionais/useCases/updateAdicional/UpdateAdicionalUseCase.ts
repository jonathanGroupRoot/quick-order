import { inject, injectable } from "tsyringe";

import { IAdicionalRepository } from "@modules/adicionais/repositories/IAdicionalRepository";

interface IUpdateAdicional {
    id: string;
    name: string;
    value: number;
}

@injectable()
export class UpdateAdicionalUseCase {
    constructor(
        @inject("AdicionalRepository")
        private adicionalRepository: IAdicionalRepository
    ) {}

    async execute({ id, name, value }: IUpdateAdicional): Promise<void> {
        await this.adicionalRepository.update(id, name, value);
    }
}
