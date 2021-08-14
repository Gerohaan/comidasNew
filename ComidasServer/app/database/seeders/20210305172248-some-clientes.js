'use strict';

const { Cliente } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return Promise.all([

      Cliente.create({
        nombres: "Delfin",
        apellidos: "Martinez",
        nacionalidad: "venezolano",
        numero_cedula : 20543812,
        telefono: 04140556565,
        edo_civil: "SOLTERO(A)",
        correo : "gero.delfin.gt@gmail.com",
        direccion: "Avenida Ancha de la cinqueña 3, Barinas, Edo Barinas.",
        status: "ACTIVO",
        createdAt: new Date(),
        updatedAt: new Date()
      }),

      Cliente.create({
        nombres: "Gerohaan",
        apellidos: "Torrealba",
        nacionalidad: "venezolano",
        numero_cedula : 19188435,
        telefono: "04143510401",
        edo_civil: "SOLTERO(A)",
        correo : "gero.delfin@gmail.com",
        direccion: "Avenida Ancha de la cinqueña 3, Barinas, Edo Barinas.",
        status: "ACTIVO",
        createdAt: new Date(),
        updatedAt: new Date()
      })

    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.bulkDelete('clientes', null, {})
    ]);

  }
};
