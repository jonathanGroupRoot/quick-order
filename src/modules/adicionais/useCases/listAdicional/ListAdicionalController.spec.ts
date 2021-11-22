import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("List Adicional Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able list adicional", async () => {
        await request(app).post("/adicional").send({
            name: "Nutella",
            value: 9,
        });

        const response = await request(app).get("/adicional");

        expect(response.status).toBe(200);
        expect(response.body[0].name).toBe("Nutella");
        expect(response.body[0].value).toBe("9");
    });
});
