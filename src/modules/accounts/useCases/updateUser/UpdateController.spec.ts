import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Update Controller", () => {
    beforeEach(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able update user", async () => {
        const passwordHash = await hash("admin", 8);

        const user = await request(app).post("/user").send({
            name: "Jonathan vini",
            email: "jonathan@gmail.com",
            password: passwordHash,
        });
        const userID = user.body.id;

        const response = await request(app).put(`/user/${userID}`).send({
            name: "john",
            email: "rootJohn",
            password: "2121",
        });

        expect(response.status).toBe(200);
        expect(response.body).toBe("OK");
    });
});
