import request from "supertest";

import app from "../../app";
import { Todos } from "./todos.model";

describe("GET /api/v1/todos", () => {
  beforeAll(async () => {
    await Todos.drop();
  });
  
  // you can use (done) => request(app => {... done() // let jest know you are done here})
  // OR...(async fn that returns explicitly)(the moment that resolves, jest will know it is done)
  it("responds with an array of todos", async () =>
    request(app)
      .get("/api/v1/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});

