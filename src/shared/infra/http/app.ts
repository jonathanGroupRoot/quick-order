import "reflect-metadata";
import "dotenv/config";
import "@shared/container";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
    return response.json("teste");
});

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }
);

export { app };
