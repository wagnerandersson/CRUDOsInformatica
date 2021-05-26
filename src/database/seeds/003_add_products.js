
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { product: 'Notebook Positivo', description: 'Não Liga', serial_number: '12345', problem_detected: "Problema em tudo", resolution_description: "Trcoda de pc", value: 0.0 },
        { product: 'Macbook Air', description: 'Travando', serial_number: '12345566', problem_detected: "Pouca memória", resolution_description: "Adicionado módulo 8gb", value: 999.00 },
        { product: 'Celular Motorola g5', description: 'Não tira foto', serial_number: '12345543', problem_detected: 'camera danificada', resolution_description: "troca do módulo de camera", value: 250.00 },
      ]);
    });
};
