import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Create Cardapio Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able create cardapio", async () => {
        const response = await request(app).post("/cardapio").send({
            name: "X-Ratão",
            description: "Pão, ovo, cheddar",
            value: 18,
        });

        expect(response.status).toBe(201);
    });

    it("should not be able to create the menu with the existing name", async () => {
        await request(app).post("/cardapio").send({
            name: "X-Ratão",
            description: "Pão, ovo, cheddar",
            value: 18,
        });

        const response = await request(app).post("/cardapio").send({
            name: "X-Ratão",
            description: "Pão, ovo, cheddar",
            value: 18,
        });

        expect(response.body.message).toEqual("Menu already exists");
        expect(response.status).toBe(400);
    });
});
