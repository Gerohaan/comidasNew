const { TipoComida } = require('../models/index')
const { Comida } = require('../models/index')
const { index } = require('./ArticulosController')

module.exports = {

    // Listar

    async index(req, res) {
        
        let tipoComida = await TipoComida.findAll()

        if(!tipoComida) {
            res.status(404).json({ msg: "No se han encontrado registros" });
        } else {
            res.json(tipoComida)
        }
        
    },

     // Create

     async create(req, res) {

        let tipoComida = await TipoComida.create({

            nombre: req.body.nombre,
            status: req.body.status

        }).then(tipoComida => {
            res.json(tipoComida);
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Update

    async update(req, res) {

        let tipoComida = await TipoComida.findByPk(req.params.id);

      if(!tipoComida) {
          res.status(404).json({ msg: "Tipo comida no encontrada" });
      } else {
          
            tipoComida.nombre = req.body.nombre;
            tipoComida.status = req.body.status;

            tipoComida.save().then(tipoComida => {
                res.json(tipoComida)
            })

      }

    },

     // Delete

     async delete(req, res) {

        let tipoComida = await TipoComida.findByPk(req.params.id);

        if(!tipoComida) {
            res.status(404).json({ msg: "Tipo de comida no encontrada" });
        } else {
            let comidas = await Comida.findAndCountAll(
                { where: { id_tipoComida: req.params.id } 
            })
            let count = comidas.count
            if(count >= 1){
                res.status(500).json({ msg: "El Tipo de Comida no puede ser elimiada porque forma parte de una o mas comidas" });
            }else {
                tipoComida.destroy().then(tipoComida => {
                    res.json({ msg: "El tipo de comida ha sido eliminada" });
                }).catch(err => {
                    res.status(500).json({ msg: "Tipo de comida no puede ser eliminada" })
                })
            }
            
        }

    },

}