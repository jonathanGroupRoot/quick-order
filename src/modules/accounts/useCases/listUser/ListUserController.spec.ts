import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("List User Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able list all users", async () => {
        const passwordHash = await hash("admin", 8);

        await request(app).post("/user").send({
            name: "JonathanVinisius",
            email: "Jonathangrouss",
            password: passwordHash,
        });

        const response = await request(app).get("/user");

        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("JonathanVinisius");
        expect(response.body[0].email).toEqual("Jonathangrouss");
    });
});
