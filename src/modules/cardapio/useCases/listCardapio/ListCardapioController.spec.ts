import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("List Cardapio Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able list all cardapio", async () => {
        const response = await request(app).get("/cardapio");

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(true);
    });
});
