const { UnidadMedida } = require('../models/index');
const { Articulo } = require('../models/index');

module.exports  = {

    // Listar

    async index(req, res) {

        let unidad = await UnidadMedida.findAll();

        res.json(unidad);

    },

    // Show id

    async show(req, res) {

        let unidad = await UnidadMedida.findByPk(req.params.id);

        if(!unidad) {
            res.status(404).json({ msg: "Unidad de medida no encontrada" });
        } else {
            res.json(unidad);
        }


    },

    // Create

    async create(req, res) {

        let unidad = await UnidadMedida.create({

            nombre: req.body.nombre,
            abrev: req.body.abrev,
            status: req.body.status

        }).then(unidad => {
            res.json(unidad);
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Update

    async update(req, res) {

        let unidad = await UnidadMedida.findByPk(req.params.id);

      if(!unidad) {
          res.status(404).json({ msg: "Unidad de medida no encontrada" });
      } else {
          
            unidad.nombre = req.body.nombre;
            unidad.abrev = req.body.abrev;
            unidad.status = req.body.status;

            unidad.save().then(unidad => {
                res.json(unidad)
            })

      }

    },

    // Delete

    async delete(req, res) {

        let unidad = await UnidadMedida.findByPk(req.params.id)

        if(!unidad) {
            res.status(404).json({ msg: "Unidad de medida no encontrada" });
        } else {
            let articuloUnidad = await Articulo.findAndCountAll(
                { where: { id_unidad: req.params.id } 
            })
            let totalArticulo = articuloUnidad.count
            if(totalArticulo >= 1) {
                res.status(500).json({ msg: "La unidad de medida no puede ser eliminada" });
            } else {

                unidad.destroy().then(unidad => {
                    res.json({ msg: "La unidad de medida ha sido eliminada" });
                }).catch(err => {
                    res.status(500).json({ msg: "No se puede eliminar la unidad de medida" })
                })

            }
            
        }

    },



}