import { AdicionalRepositoryInMemory } from "@modules/adicionais/repositories/in-memory/AdicionalRepositoryInMemory";

import { ListAdicionalUseCase } from "./ListAdicionalUseCase";

let adicionalRepositoryInMemory: AdicionalRepositoryInMemory;
let listAdicionalUseCase: ListAdicionalUseCase;

describe("List Adicional UseCase", () => {
    beforeEach(async () => {
        adicionalRepositoryInMemory = new AdicionalRepositoryInMemory();
        listAdicionalUseCase = new ListAdicionalUseCase(
            adicionalRepositoryInMemory
        );
    });

    it("should be able list adicional", async () => {
        const adicional = await adicionalRepositoryInMemory.create({
            name: "Nutelão",
            value: 4,
        });

        const adicionalList = await listAdicionalUseCase.execute();

        expect(adicionalList.length).toBe(1);
        expect(adicionalList).toEqual([adicional]);
    });
});
