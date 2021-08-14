const { Comida } = require('../models/index')
const { Preparado } = require('../models/index')
const { DetallePreparado } = require('../models/index')
const { Stock } = require('../models/index')
module.exports = {

    // Listar

    async index(req, res) {
        
        let inventory = await Stock.findAll({
            include: [
                {
                    association: "articulos",
                    include: [
                        {
                            association: "categoria"
                        }
                    ]
                }
            ]
        })

        if(!inventory) {
            res.status(404).json({ msg: "No se han encontrado registros" });
        } else {
            res.json(inventory)
        }
        
    },

     // Create

     async create(req, res) {

       let preparados = await Preparado.create({

            id_comida: req.body.Preparado.id_comida,
            precio: req.body.Preparado.precio,
            status: req.body.Preparado.status

        }).then(preparados => {
            let ingredientes = req.body.listadeIngredientesSend
            let id_preparado = preparados.id
            let ingredsModif = ingredientes.map(item => {
                if(item.id_preparado === 0) {
                    return {...item, id_preparado: id_preparado}
                } else {
                    return item
                }
            })
           let detPreparado = DetallePreparado.bulkCreate(ingredsModif).then(detprep => {
                res.json(detPreparado)
           }).catch(error => {
               res.status(500).json(error)
           })
        }).catch(err => {
            res.status(500).json(err);
       })

    },

    // Update

    async update(req, res) {

        let inventory = await Stock.findByPk(req.params.id);

      if(!inventory) {
          res.status(404).json({ msg: "Item no encontrado" });
      } else {
            inventory.disponible = req.body.disponible
           
            inventory.save().then(inventory => {
                res.json(inventory)
            })

      }

    },

     // Delete

     async delete(req, res) {

        let detPreparado = await DetallePreparado.destroy({
            where: {
                id_preparado: req.params.id
            }
        }).then(async detPreparado => {
            let preparados = await Preparado.destroy({
                where: {
                    id: req.params.id
                }
            }).then(preparados => {
                res.json({ msg: "Preparado Eliminado" });
            }).catch(err => {
                res.status(500).json({ msg: "Error al eliminar Preparado" })
            })
        }).catch(error => {
            res.status(500).json({ msg: "Error al eliminar detalles de prepado" })
        })

    

    },

     // Show id

     async show(req, res) {

        let preparados = await Preparado.findByPk(req.params.id, {
            include: [
                {
                    association: "comidas"
                }
            ]
        });
  
          if(!preparados) {
              res.status(404).json({ msg: "Preparado no encontrado" });
          } else {
              //res.json(preparados);
             let detprep = await DetallePreparado.findAll({
                where: {
                    id_preparado: req.params.id
                },
                include: [
                    {
                        association: "articulos"
                    }
                ]
             })
                if(!detprep) {
                    res.status(404).json({ msg: "Detalles no encotrados" })
                } else {
                    let result = {
                        preparados: preparados,
                        ingredientes: detprep
                    }
                    res.json(result)
                }
          }
  
      },

      async list(req, res) {

        let listaDetalles = await DetallePreparado.findAll({
            include: [
                {
                    association: "articulos"
                }
            ]
        })

        if(!listaDetalles) {
            res.status(404).json({ msg: "No se han encontrado registros" });
        } else {
            res.json(listaDetalles)
        }

      }

}