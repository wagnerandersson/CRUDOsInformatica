import { response } from "express";
import request from "supertest";

import app from "../../app";

let products, clients, id;

beforeEach(() => {
  products = [
    {
      product: "Macbook pro",
      description: "Travando",
      serial_number: "123123231234556",
    },
    {
      product: "Positivo 1",
      description: "Não liga",
      serial_number: "4333123123321",
      client_id: id,
    },
  ];
  clients = [
    {
      name: "Josielson Soares",
      address: "Rua 1 N 123",
      email: "gege1243@gmail.com",
      cpf: "111.452.352-45",
    },
    {
      name: "Josenilson dos Santos",
      address: "Rua 1 N 123",
      email: "gege124354@gmail.com",
      cpf: "122.444.552-45",
    },
    {
      name: "Josenilson dos Santos ATUALIZADO",
      address: "Rua 1 N 123",
      email: "gege124354ATUALIZADO@gmail.com",
    },
    {
      address: "Rua 1 N 123",
      email: "gege1243@gmail.com",
      cpf: "111.452.352-45",
    },
    {
      name: "Soares Soares",
      address: "Rua 1 N 123",
      email: "gege1243@gmail.com",
      cpf: "135.452.356-44",
    },
    {
      email: "gege124354@gmail.com",
    },
  ];
});

test("Deve ser possível adicionar um novo cliente", async () => {
  const response = await request(app).post("/clients").send(clients[0]);

  await request(app).delete("/clients/111.452.352-45");
  expect(response.body).toBe("Cadastro realizado com sucesso!");
});

test("deve ser possível deletar um cliente", async () => {
  await request(app).post("/clients").send(clients[1]);

  const response = await request(app).delete("/clients/122.444.552-45");

  expect(response.body).toMatchObject({ ...clients[1] });
});

test("deve ser possível alterar um cliente", async () => {
  await request(app).post("/clients").send(clients[1]);

  const response = await request(app)
    .put("/clients/update/122.444.552-45")
    .send(clients[2]);

  await request(app).delete("/clients/122.444.552-45");

  expect(response.body).toMatchObject({ ...clients[2] });
});

test("deve ser possível listar todos os clientes", async () => {
  await request(app).post("/clients").send(clients[0]);
  await request(app).post("/clients").send(clients[1]);

  const response = await request(app).get("/clients");

  expect(response.body).toMatchObject([{ ...clients[0] }, { ...clients[1] }]);

  await request(app).delete("/clients/111.452.352-45");
  await request(app).delete("/clients/122.444.552-45");
});

test("Não pode ser possível alterar um email para um já cadastrado", async () => {
  await request(app).post("/clients").send(clients[1]);

  const response = await request(app)
    .put("/clients/update/122.444.552-45")
    .send(clients[5]);

  expect(response.status).toBe(400);
  await request(app).delete("/clients/122.444.552-45");
});

test("Não deve ser possível adicionar um novo cliente sem nome", async () => {
  const response = await request(app).post("/clients").send(clients[3]);

  expect(response.status).toBe(400);
});

test("ao tentar deletar um cpf inexistente deve retornar erro", async () => {
  await request(app).post("/clients").send(clients[1]);

  const response = await request(app).delete("/clients/122.444.52-45");

  expect(response.body).toBe();
});

// test("Não deve ser possível adicionar um novo cliente se o email já existir", async () => {
//   await request(app).post("/clients").send(clients[0]);
//   const response = await request(app).post("/clients").send(clients[4]);

//   expect(response.body).toBe("Email já cadastrado");
//   await request(app).delete("/clients/111.452.352-45");
// });
