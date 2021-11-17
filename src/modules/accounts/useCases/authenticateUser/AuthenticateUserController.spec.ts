import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Authenticate User", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able authenticate user", async () => {
        await request(app).post("/user").send({
            name: "Jonathan Root",
            email: "bilionario@gmail.com",
            password: "210921",
        });

        const response = await request(app).post("/authenticate").send({
            email: "bilionario@gmail.com",
            password: "210921",
        });

        expect(response.status).toBe(200);
    });

    it("Should not be able to authenticate the user if email is incorrect", async () => {
        await request(app).post("/user").send({
            name: "RootJonathan",
            email: "root@gmail.com",
            password: "12233",
        });

        const response = await request(app).post("/authenticate").send({
            email: "not-existing-email",
            password: "12233",
        });

        expect(response.body.message).toEqual("Email or password incorrect");
        expect(response.status).toBe(400);
    });

    it("Should not be able to authenticate the user if password is incorrect", async () => {
        await request(app).post("/user").send({
            name: "jonathanVINI",
            email: "rootjohn@gmail.com",
            password: "923833",
        });

        const response = await request(app).post("/authenticate").send({
            email: "rootjohn@gmail.com",
            password: "no-existing-password",
        });

        expect(response.body.message).toEqual("Email or password incorrect");
        expect(response.status).toBe(400);
    });
});
