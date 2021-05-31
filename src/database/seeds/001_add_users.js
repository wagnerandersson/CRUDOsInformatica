
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Vandislau Escobar', email: 'vandis@gmail.com', pass: '123' },
        { name: 'Sonia Braga', email: 'sonia@gmail.com', pass: '1234' },
        { name: 'Jandiscleison Farias', email: 'jandi@gmail.com', pass: '1235' },
        { name: 'Rosicleide Fernandes', email: 'rose@gmail.com', pass: '1236' },
      ]);
    });
};
