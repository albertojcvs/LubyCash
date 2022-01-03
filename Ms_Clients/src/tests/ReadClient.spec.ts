import supertest from "supertest";
import { app } from "../app";

describe("Get all clients", () => {
  test("It should be able to get all clients and their information", async () => {
    const { text, statusCode } = await supertest(app).get("/clients");

    expect(statusCode).toBe(200);
  });
});
