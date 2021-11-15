import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("create user controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to new create user", async () => {
        const passwordHash = await hash("admin", 8);
        const uui = uuidv();
        const response = await request(app).post("/user").send({
            id: uui,
            name: "JonathanVinisius",
            email: "Jonathangrouss",
            password: passwordHash,
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toEqual("JonathanVinisius");
        expect(response.body.email).toEqual("Jonathangrouss");
    });

    it("not should be able to create user equal", async () => {
        const passwordHash1 = await hash("admin", 8);
        const response = await request(app).post("/user").send({
            name: "JonathanVinisius",
            email: "Jonathangrouss",
            password: passwordHash1,
        });

        await request(app).post("/user").send({
            name: "JonathanVinisius",
            email: "Jonathangrouss",
            password: passwordHash1,
        });

        expect(response.status).toBe(400);
    });
});
