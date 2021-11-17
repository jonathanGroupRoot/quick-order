import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Delete User Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able delete user", async () => {
        const user = await request(app).post("/user").send({
            name: "jonatha root",
            email: "root2@gmail.com",
            password: "99832",
        });

        const userID = user.body.id;

        const response = await request(app).delete(`/user/${userID}`);

        expect(response.status).toBe(200);
    });
});
