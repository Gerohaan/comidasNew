const { Categoria } = require('../models/index');
const { Articulo } = require('../models/index');

module.exports  = {

    // Listar

    async index(req, res) {

        let category = await Categoria.findAll();

        res.json(category);

    },

    // Show id

    async show(req, res) {

        let category = await Categoria.findByPk(req.params.id);

        if(!category) {
            res.status(404).json({ msg: "Categoria no encontrada" });
        } else {
            res.json(category);
        }


    },

    // Create

    async create(req, res) {

        let category = await Categoria.create({

            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            status: req.body.status

        }).then(category => {
            res.json(category);
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Update

    async update(req, res) {

        let category = await Categoria.findByPk(req.params.id);

      if(!category) {
          res.status(404).json({ msg: "Categoria no encontrada" });
      } else {
          
            category.nombre = req.body.nombre;
            category.descripcion = req.body.descripcion;
            category.status = req.body.status;

            category.save().then(category => {
                res.json(category)
            })

      }

    },

    // Delete

    async delete(req, res) {

        let category = await Categoria.findByPk(req.params.id)

        if(!category) {
            res.status(404).json({ msg: "Categoria no encontrada" });
        } else {
            let categoriaArticulo = await Articulo.findAndCountAll(
                { where: { id_categoria: req.params.id } 
            })
            let totalArticulo = categoriaArticulo.count
            if(totalArticulo >= 1)
            {
                res.status(500).json({ msg: "La categoria no puede ser eliminada" });
            } else {
                category.destroy().then(category => {
                    res.json({ msg: "La categoria ha sido eliminada" });
                }).catch(err => {
                    res.status(500).json({ msg: "No se puede eliminar la categoría" })
                })
            }
            
        }

    },



}