import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Delete Cardapio Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able delete cardapio", async () => {
        const createCardapio = await request(app).post("/cardapio").send({
            name: "X-ratão",
            description: "Provolone, pão, hamburguer",
            value: 12,
        });
        const idCardapio = createCardapio.body.id;

        await request(app).delete(`/cardapio/${idCardapio}`);
    });
});
