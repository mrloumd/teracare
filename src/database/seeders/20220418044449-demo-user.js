const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: uuidv4(),
          email: 'iamcdgmx@gmail.com',
          first_name: 'Demo',
          last_name: 'User',
          branch: 'Cauayan',
          zone: 'A',
          is_active: true,
          remarks: '',
        },
        {
          id: uuidv4(),
          email: 'meguqifi@thichanthit.com',
          first_name: 'Demo',
          last_name: 'User',
          branch: 'Bolilao',
          zone: 'A',
          is_active: true,
          remarks: '',
        },
        {
          id: uuidv4(),
          email: 'jepasilu@musiccode.me',
          first_name: 'Demo',
          last_name: 'User',
          branch: 'Metro',
          zone: 'A',
          is_active: true,
          remarks: '',
        },
        {
          id: uuidv4(),
          email: 'meguqifi@thichanthit.com',
          first_name: 'Demo',
          last_name: 'User',
          branch: 'Matag',
          zone: 'A',
          is_active: true,
          remarks: '',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
