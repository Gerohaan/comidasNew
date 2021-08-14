'use strict';

const { User } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return Promise.all([

      User.create({
        name: "William",
        password: bcrypt.hashSync("administrador", +authConfig.rounds),
        email: "willialex1363@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }),

      User.create({
        name: "Usuario",
        password: bcrypt.hashSync("usuario", +authConfig.rounds),
        email: "usuario@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }),

    ]);
    
  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.bulkDelete('users', null, {}),
    ]);
     
  }
};
