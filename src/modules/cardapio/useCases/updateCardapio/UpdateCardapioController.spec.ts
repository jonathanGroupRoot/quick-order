import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Update Cardapio Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able upddate cardapio", async () => {
        const cardapio = await request(app).post("/cardapio").send({
            name: "X-Dogao",
            description: "Provolone, pão",
            value: 23,
        });
        const cardapioID = cardapio.body.id;

        const response = await request(app)
            .put(`/cardapio/${cardapioID}`)
            .send({
                name: "X-ratão",
                description: "Bacon, mussarela",
                value: 16,
            });

        expect(response.status).toBe(200);
    });
});
