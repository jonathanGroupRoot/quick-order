import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Delete Adicional Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able delete adicional", async () => {
        const adicional = await request(app).post("/adicional").send({
            name: "Trento",
            value: 9,
        });

        const { id } = adicional.body;

        const response = await request(app).delete(`/adicional/${id}`);

        expect(response.status).toBe(200);
    });
});
