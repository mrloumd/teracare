const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'merchant',
      [
        {
          id: uuidv4(),
          name: 'Demo Merchant',
          contact_person: 'Demo Contact Person',
          contact_number: '09216630091',
          email: 'demoemail@gmail.com',
          address: 'Demo Address',
          barangay: 'Demo Barangay',
          municipality: 'Demo Municipality',
          province: 'Demo Province',
          region: 'Demo Region',
          zip_code: 'Demo Zip Code',
          country: 'Philippines',
          is_active: true,
          maximum_number_of_branches: 10,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('merchant', null, {});
  },
};
