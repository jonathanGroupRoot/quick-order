import { AdicionalRepositoryInMemory } from "@modules/adicionais/repositories/in-memory/AdicionalRepositoryInMemory";

import { UpdateAdicionalUseCase } from "./UpdateAdicionalUseCase";

let adicionalRepositoryInMemory: AdicionalRepositoryInMemory;
let updateAdicionalUseCase: UpdateAdicionalUseCase;

describe("Update Adicional UseCase", () => {
    beforeEach(async () => {
        adicionalRepositoryInMemory = new AdicionalRepositoryInMemory();
        updateAdicionalUseCase = new UpdateAdicionalUseCase(
            adicionalRepositoryInMemory
        );
    });

    it("should be able update user existent", async () => {
        const adicional = await adicionalRepositoryInMemory.create({
            name: "Sonho de valsa",
            value: 3,
        });

        const { id } = adicional;

        await updateAdicionalUseCase.execute({
            id,
            name: "Nutella",
            value: 3,
        });

        expect(adicional.name).toBe("Nutella");
        expect(adicional.value).toBe(3);
    });
});
