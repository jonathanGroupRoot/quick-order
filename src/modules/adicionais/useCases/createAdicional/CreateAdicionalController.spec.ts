import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Create Adicional Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able create adicional", async () => {
        const response = await request(app).post("/adicional").send({
            name: "Nutella",
            value: 2,
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Nutella");
        expect(response.body.value).toBe(2);
    });

    it("should not be able create adicional case name exists", async () => {
        await request(app).post("/adicional").send({
            name: "Chocolate",
            value: 5,
        });

        const response = await request(app).post("/adicional").send({
            name: "Chocolate",
            value: 5,
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual("Adicional exits");
    });
});
