import request from "supertest";

import app from "../../app";
import { Todos } from "./todos.model";

beforeAll(async () => {
  await Todos.drop();
});

describe("GET /api/v1/todos", () => {  
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

describe("POST /api/v1/todos", () => {  
  it("responds with an error if the todo is invalid", async () =>
    request(app)
      .post("/api/v1/todos")
      .set("Accept", "application/json")
      .send({
        content: '',
      })
      .expect("Content-Type", /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }),
  );
  it("responds with an inserted object", async () =>
    request(app)
      .post("/api/v1/todos")
      .set("Accept", "application/json")
      .send({
        content: 'Learn Typescript',
        done: false,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('done');
      }),
  );
});

