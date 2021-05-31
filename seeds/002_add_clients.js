
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        { name: 'Josielson Soares', address: 'Rua 1 N 123', email: 'josielson@gmail.com', cpf: '111.222.333-44' },
        { name: 'Rodiscleison Martins', address: 'Rua 2 N 123', email: 'rodis@gmail.com', cpf: '111.222.333-55' },
        { name: 'Mariscleisa Soares', address: 'Rua 4 N 123', email: 'mari@gmail.com', cpf: '111.222.333-66' },
      ]);
    });
};
