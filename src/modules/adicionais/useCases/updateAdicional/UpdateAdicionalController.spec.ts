import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Update Adicional Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able update adicional exits", async () => {
        const createAdicional = await request(app).post("/adicional").send({
            name: "Nutelão",
            value: 5,
        });

        const { id } = createAdicional.body;

        const response = await request(app).put(`/adicional/${id}`).send({
            name: "Ovolmatine",
            value: 9,
        });

        expect(response.status).toBe(200);
    });
});
