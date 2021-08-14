const { Area } = require('../models/index');
const { Pedido } = require('../models/index');
const { Op } = require("sequelize");

module.exports  = {

    // Listar

    async index(req, res) {

        let elArea = await Area.findAll({
            include: [
                {
                    association: "TipoArea"
                }
            ]
        });

        res.json(elArea);

    },

    // Show id

    async show(req, res) {

        let elArea = await Area.findByPk(req.params.id);

        if(!elArea) {
            res.status(404).json({ msg: "Area/Espacio no encontrada" });
        } else {
            res.json(elArea);
        }


    },

    // Create

    async create(req, res) {

        await Area.create({

          id_tipo_area: req.body.id_tipo_area,
          nombre: req.body.nombre,
          status: req.body.status,
          ocupable: req.body.ocupable

        }).then(elArea => {
            res.json(elArea);
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Update

    async update(req, res) {

        let elArea = await Area.findByPk(req.params.id);

      if(!elArea) {
          res.status(404).json({ msg: "Area/Espacio no encontrada" });
      } else {
        let pedidosA = await Pedido.findAndCountAll(
            { where: { 
                status: "PENDIENTE",
                id_area: req.params.id 
            } 
        })
        let count = pedidosA.count
           if(count >= 1){
            res.status(500).json({ msg: "Area no puede ser modificada mientras tenga un Pedido Pendiente" });
           } else {

            elArea.id_tipo_area = req.body.id_tipo_area           
            elArea.nombre = req.body.nombre
            elArea.status = req.body.status
            elArea.ocupable = req.body.ocupable

            elArea.save().then(elArea => {
                res.json(elArea)
            }).catch(err => {
                res.status(500).json({msg: "Se ha producido un erro al modificar"})
            })

           }
            

      }

    },

    // Delete

    async delete(req, res) {

        let elArea = await Area.findByPk(req.params.id)

        if(!elArea) {
            res.status(404).json({ msg: "Area/Espacio no encontrada" });
        } else {
            let pedidosA = await Pedido.findAndCountAll(
                { where: { id_area: req.params.id } 
            })
            let totalpedidosA = pedidosA.count
            if(totalpedidosA >= 1) {
                res.status(500).json({ msg: "Area no puede ser eliminada" });
            } else {

                elArea.destroy().then(elArea => {
                    res.json({ msg: "El Area/Espacio ha sido eliminado" });
                }).catch(err => {
                    res.status(500).json({ msg: "No se puede eliminar el Area/Espacio" })
                })

            }
            
        }

    },



}