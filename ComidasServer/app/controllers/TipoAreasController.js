const { TipoArea } = require('../models/index');
const { Area } = require('../models/index');

module.exports  = {

    // Listar

    async index(req, res) {

        let tipArea = await TipoArea.findAll();

        res.json(tipArea);

    },

    // Show id

    async show(req, res) {

        let tipArea = await TipoArea.findByPk(req.params.id);

        if(!tipArea) {
            res.status(404).json({ msg: "Tipo de Area/Espacio no encontrada" });
        } else {
            res.json(tipArea);
        }


    },

    // Create

    async create(req, res) {

        let tipArea = await TipoArea.create({

            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            status: req.body.status

        }).then(tipArea => {
            res.json(tipArea);
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Update

    async update(req, res) {

        let tipArea = await TipoArea.findByPk(req.params.id);

      if(!tipArea) {
          res.status(404).json({ msg: "Tipo de Area/Espacio no encontrada" });
      } else {
          
            tipArea.nombre = req.body.nombre
            tipArea.descripcion = req.body.descripcion

            tipArea.save().then(tipArea => {
                res.json(tipArea)
            }).catch(err => {
                res.status(500).json({msg: "Se ha producido un erro al modificar"})
            })

      }

    },

    // Delete

    async delete(req, res) {

        let tipArea = await TipoArea.findByPk(req.params.id)

        if(!tipArea) {
            res.status(404).json({ msg: "Tipo de Area/Espacio no encontrada" });
        } else {
            let areaT = await Area.findAndCountAll(
                { where: { id_tipo_area: req.params.id } 
            })
            let totalAreas = areaT.count
            if(totalAreas >= 1) {
                res.status(500).json({ msg: "Tipo de Area no puede ser eliminada" });
            } else {

                tipArea.destroy().then(tipArea => {
                    res.json({ msg: "El Tipo de Area/Espacio ha sido eliminado" });
                }).catch(err => {
                    res.status(500).json({ msg: "No se puede eliminar el tipo de Area/Espacio" })
                })

            }
            
        }

    },



}