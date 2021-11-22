import { AdicionalRepositoryInMemory } from "@modules/adicionais/repositories/in-memory/AdicionalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateAdicionalUseCase } from "./CreateAdicionalUseCase";

let adicionalRepositoryInMemory: AdicionalRepositoryInMemory;
let createAdicionalUseCase: CreateAdicionalUseCase;

describe("Create Adicional UseCase", () => {
    beforeEach(async () => {
        adicionalRepositoryInMemory = new AdicionalRepositoryInMemory();
        createAdicionalUseCase = new CreateAdicionalUseCase(
            adicionalRepositoryInMemory
        );
    });

    it("should be able create adicional", async () => {
        const createAdicional = await createAdicionalUseCase.execute({
            name: "Leite em pó",
            value: 3,
        });

        console.log(createAdicional);
    });

    it("should not be able create adicional exists name", async () => {
        await createAdicionalUseCase.execute({
            name: "Leite condesado",
            value: 5,
        });

        await expect(
            createAdicionalUseCase.execute({
                name: "Leite condesado",
                value: 5,
            })
        ).rejects.toEqual(new AppError("Adicional exits"));
    });
});
