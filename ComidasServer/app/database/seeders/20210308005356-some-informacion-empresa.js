'use strict';

const { InformacionEmpresa } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    

    return Promise.all([
      InformacionEmpresa.create({
        nombre: "INVERSIONES FENIXCASH, C.A.",
        tipo: "Compañia Anónima",
        rif: "J-40996328-4",
        director_jefe: "WILLIAM A. DURAN D",
        nac_director: "VENEZOLANO",
        cedula_director: "13634002",
        direccion_empresa: "URB. CUATRICENTENARIA, SECTOR 13, CALLE 12, CASA Nro 02, BARINAS EDO. BARINAS",
        informacion_mercantil: "Registro Mercantil Primero Del Estado Barinas, bajo el Nro 2, Tomo 14-A del año 2007",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ]);


  },

  down: async (queryInterface, Sequelize) => {
    

    return Promise.all([
       queryInterface.bulkDelete('informacionempresa', null, {})
    ]);


  }
};
