import supertest from "supertest";
import { app } from "../app";
import { Client } from "../models/Client";

describe("Get all clients", () => {
  test("It should be able to get all clients and their information", async () => {
    const { text, statusCode } = await supertest(app).get("/clients");

    expect(statusCode).toBe(200);
    const clients = JSON.parse(text)    
    expect(clients).toBeInstanceOf(Array)
  });
});
