import { AdicionalRepositoryInMemory } from "@modules/adicionais/repositories/in-memory/AdicionalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleteAdicionalUseCase } from "./DeleteAdicionalUseCase";

let adicionalRepositoryInMemory: AdicionalRepositoryInMemory;
let deleteAdicionalUseCase: DeleteAdicionalUseCase;

describe("Delete Adicional UseCase", () => {
    beforeEach(async () => {
        adicionalRepositoryInMemory = new AdicionalRepositoryInMemory();
        deleteAdicionalUseCase = new DeleteAdicionalUseCase(
            adicionalRepositoryInMemory
        );
    });

    it("should be able delete adicional", async () => {
        const adicional = await adicionalRepositoryInMemory.create({
            name: "Brigadeiro",
            value: 6,
        });

        const { id } = adicional;

        await deleteAdicionalUseCase.execute(id);
    });

    it("should not be able adicional case doesn´t exists id", async () => {
        await expect(
            deleteAdicionalUseCase.execute("non-exist-id")
        ).rejects.toEqual(new AppError("Adicional doesn´t exists"));
    });
});
