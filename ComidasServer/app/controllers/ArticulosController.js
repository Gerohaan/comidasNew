const { Articulo } = require('../models/index');
const { Categoria } = require('../models/index');
const { Stock } = require('../models/index');
const { DetallePreparado } = require('../models/index');

module.exports = {

 // Listar

 async index(req, res) {

    let articu = await Articulo.findAll({
        include: [
            {
                association: "categoria"
            },
            {
                association: "unidadmedidas"
            }
        ]
    });

    if(!articu) {
        res.status(404).json({ msg: "Sin registros" });
    } else {
        res.json(articu)
    }
    
},

// Show id

async show(req, res) {

  let articu = await Articulo.findByPk(req.params.id, {
    include: [
        {
            association: "categoria"
        }
    ]
});

    if(!articu) {
        res.status(404).json({ msg: "Articulo no encontrado" });
    } else {
        let stockArt = await Stock.findAll({
            where: {
                id_articulo: req.params.id
            }
        })
        let infoArticulo = {
            articulo: articu,
            infoStock: stockArt
        } 
        res.json(infoArticulo);
    }

},

// Create

async create(req, res) {

    let articu = await Articulo.create({

        nombre: req.body.articulo.nombre,
        id_categoria: req.body.articulo.id_categoria,
        descripcion: req.body.articulo.descripcion,
        status: req.body.articulo.status,
        id_unidad: req.body.articulo.id_unidad

    }).then(async articu => {
        let stockArt = await Stock.create({
            id_articulo: articu.id,
            disponible: req.body.infoStock.disponible,
            minimo: req.body.infoStock.minimo
        }).then(stockAdd => {
            res.json(articu);    
        }).catch(error => {
            res.status(500).json(error)
        })
    }).catch(err => {
        res.status(500).json(err);
    })

},

// Update

async update(req, res) {

  let articu = await Articulo.findByPk(req.params.id);

  if(!articu) {
      res.status(404).json({ msg: "Articulo no encontrado" });
  } else {
      
        articu.nombre = req.body.articulo.nombre;
        articu.id_categoria = req.body.articulo.id_categoria;
        articu.descripcion = req.body.articulo.descripcion;
        articu.precio = req.body.articulo.precio;
        articu.cantidad = req.body.articulo.cantidad;
        articu.status = req.body.articulo.status;
        articu.id_unidad = req.body.articulo.id_unidad;

        articu.save().then(async articu => {
            let infoStock = await Stock.update({
                    disponible: req.body.infoStock.disponible,
                    minimo: req.body.infoStock.minimo
                }, {
                    where: {
                        id_articulo: req.params.id
                    }
                }).then(infoStock => {
                    res.json(articu)
                }).catch(error => {
                    res.status(500).json(error)
                })
            
        }).catch(err => {
            res.status(500).json(err)
        })
  }
},

// Delete 

async delete(req, res) {

  let articu = await Articulo.findByPk(req.params.id);

    if(!articu) {
        res.status(404).json({ msg: "Articulo no encontrado" });
    } else {
        let detPrep = await DetallePreparado.findAndCountAll(
            { where: { id_articulo: req.params.id } 
        })
        let totalArt = detPrep.count
        if(totalArt >= 1) {
            res.status(500).json({ msg: "El Articulo forma parte de un menu" });
        } else {
            Stock.destroy({ where: { id_articulo: req.params.id } }).then(stock => {
                articu.destroy().then(articu => {
                    res.json({ msg: "El Articulo ha sido eliminado" });
                }).catch(err => {
                    res.status(500).json({ msg: "El articulo no puede ser eliminado" })
                })
            }).catch(error => {
                res.status(500).json({ msg: "El articulo no puede ser eliminado del Inventario" })
            })
        }
        
        
    }

}



}