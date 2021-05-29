import { response } from 'express';
import request from 'supertest';

import app from '../../app';

let products, clients;

beforeEach(() => {
    products = [
        {
            product: "Macbook pro",
            description: "Travando",
            serial_number: "1234556"
        },
        {
            product: "Positivo 1",
            description: "Não liga",
            serial_number: "4321"
        }
    ]
    clients = [
        {
        name: 'Josielson Soares',
        address: 'Rua 1 N 123',
        email: 'gege1243@gmail.com',
        cpf: '111.452.352-45'
    },
        {
        name: 'Josenilson dos Santos',
        address: 'Rua 1 N 123',
        email: 'gege124354@gmail.com',
        cpf: '122.444.552-45'
    },
        {
        name: 'Josenilson dos Santos ATUALIZADO',
        address: 'Rua 1 N 123',
        email: 'gege124354ATUALIZADO@gmail.com'        
    }
    ]
});

test('Deve ser possível adicionar um novo cliente', async () => {
    const response = await request(app)
        .post('/clients')
        .send(clients[0])

        await request(app).delete('/clients/111.452.352-45')        
    expect(response.body).toBe("Cadastro realizado com sucesso!")
});

test('deve ser possível deletar um cliente', async () => {
    await request(app).post('/clients').send(clients[1])

    const response = await request(app)
        .delete('/clients/122.444.552-45')

    expect(response.body).toMatchObject({ ...clients[1] })
})

test('deve ser possível alterar um cliente', async () => {
    await request(app).post('/clients').send(clients[1])

    const response = await request(app)
    .put('/clients/update/122.444.552-45')
    .send(clients[2])

    await request(app).delete('/clients/122.444.552-45')

    expect(response.body).toMatchObject({ ...clients[2]})
})



// test('Deve ser possível adicionar um novo produto em OS', async () => {
//     const response = await request(app)
//         .post('/products')
//         .send(products[0]);

//     expect(response.body).toMatchObject({
//         ...products[0]
//     });
// })
