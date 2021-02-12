const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/connection.js");

describe("user-router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("GET user by id", () => {
    it("should return 200 with valid id", async () => {
      return await request(server)
        .get("/api/plants/1")
        .then((response) => {
          expect(response.status).toBe(200);
        });
    });
  });
});
