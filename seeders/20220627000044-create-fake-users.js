'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('queryInterface:', queryInterface)
    
    await queryInterface.bulkInsert('posts', [{
        id: 1,
        uuid: 'd0b18339-dd4f-4f98-a7d8-54027547a5ff',
        name: 'luigy',
        email: 'luigy@netflix.com',
        role: 'admin',
        createdAt: '2022-06-26T21:55:37.627Z',
        updatedAt: '2022-06-26T21:55:37.627Z'
      }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    console.log('queryInterface:', queryInterface)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
