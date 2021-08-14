const { Comida, Sequelize } = require('../models/index')
const { Preparado } = require('../models/index')
const { DetallePreparado } = require('../models/index')
const { Pedido } = require('../models/index')
const { DetallePedido } = require('../models/index')
const { Stock } = require('../models/index')
const { Area } = require('../models/index')
module.exports = {

    // Listar

    async index(req, res) {
        
        let pedidos = await Pedido.findAll({
            include: [
                {
                    association: "clientes"
                },
                {
                    association: "areas",
                    include: [
                        {
                            association: "TipoArea"
                        }
                    ]
                }
            ]
        })

        if(!pedidos) {
            res.status(404).json({ msg: "No se han encontrado registros" });
        } else {
            res.json(pedidos)
        }
        
    },

     // Create

     async create(req, res) {

       let pedidos = await Pedido.create({

            num_pedido: req.body.Pedido.num_pedido,
            id_cliente: req.body.Pedido.id_cliente,
            subtotal: req.body.Pedido.subtotal,
            extra: req.body.Pedido.extra,
            descripcion: req.body.Pedido.descripcion,
            total: req.body.Pedido.total,
            forma_pago: req.body.Pedido.forma_pago,
            status: req.body.Pedido.status,
            id_area: req.body.Pedido.id_area

        }).then(pedidos => {
            let detallepedidos = req.body.detallePedido
            let id_pedido = pedidos.id
            let detallepedidosModif = detallepedidos.map(item => {
                if(item.id_pedido === 0) {
                    return {...item, id_pedido: id_pedido}
                } else {
                    return item
                }
            })
           let detPedidos = DetallePedido.bulkCreate(detallepedidosModif).then(async detpedi => {
                res.json(detPedidos)
                //console.log(req.body.stock.length)
                if(req.body.Pedido.status == "PENDIENTE") {
                    let areas = await Area.findByPk(req.body.Pedido.id_area)
                    if(!areas) {
                        res.areas(404).json({ msg: "Area no encontrada" });
                    } else {
                        areas.status = "OCUPADA"
                        areas.save().then(ar => {
                            console.log('OK')
                        }).catch(eler => {
                            res.status(500).json(eler)
                        })
                    }
                    
                }else {
                    let areas = await Area.findByPk(req.body.Pedido.id_area)
                    if(!areas) {
                        res.areas(404).json({ msg: "Area no encontrada" });
                    } else {
                        areas.status = "ACTIVA"
                        areas.save().then(ar => {
                            console.log('OK')
                        }).catch(eler => {
                            res.status(500).json(eler)
                        })
                    }
                    ///////////////////////////////////////////////////////////////////////
                    let arrayStock = req.body.stock
                    for (let i=0; i<arrayStock.length; i++) {
                        for(let j=0; j<arrayStock[i].length; j++) {
                            let update = await Stock.update(
                                {disponible: Sequelize.literal(`disponible - ${arrayStock[i][j].cantidad}`)}, { where: { id_articulo: arrayStock[i][j].id_articulo}})
                                .then(update => {
                                    console.log(update)
                            }).catch(err => {
                                console.log(err)
                        })
                        } 
                    }
                    ///////////////////////////////////////////////////////////////////////
                }
                
           }).catch(error => {
               res.status(500).json(error)
               console.log(error)
           })
        }).catch(err => {
            res.status(500).json(err);
            console.log(err)
       })

    },

    // Update

    async update(req, res) {

        let elPedido = await Pedido.findByPk(req.params.id)

        if(!elPedido) {
            res.status(404).json({ msg: "Pedio no encontrado" })
        } else {
            let id_area = req.body.Pedido.id_area
            let id_area_original = req.body.Pedido.id_area_original
            if(id_area != id_area_original) {
                let areaID = await Area.findByPk(req.body.Pedido.id_area)
                areaID.status = "OCUPADA"
                areaID.save()
                let areaOriginalID = await Area.findByPk(req.body.Pedido.id_area_original)
                areaOriginalID.status = "ACTIVA"
                areaOriginalID.save()
            }
            elPedido.subtotal = req.body.Pedido.subtotal
            elPedido.extra = req.body.Pedido.extra
            elPedido.descripcion = req.body.Pedido.descripcion
            elPedido.total = req.body.Pedido.total
            elPedido.forma_pago = req.body.Pedido.forma_pago
            elPedido.status = req.body.Pedido.status
            elPedido.id_area = req.body.Pedido.id_area

            elPedido.save().then(async elPedido => {
                let detallePedido = req.body.detallePedido
                await DetallePedido.destroy({
                    where: {
                        id_pedido: req.params.id
                    }
                }).then(async detallePED => {
                    await DetallePedido.bulkCreate(detallePedido).then(async detped => {
                        //res.json(detped)
                        if(req.body.Pedido.status == "PAGADO") {
                            let areas = await Area.findByPk(req.body.Pedido.id_area)
                            if(!areas) {
                                res.areas(404).json({ msg: "Area no encontrada" });
                            } else {
                                areas.status = "ACTIVA"
                                areas.save().then(ar => {
                                    console.log('OK')
                                }).catch(eler => {
                                    res.status(500).json(eler)
                                })
                            }
                            ///////////////////////////////////////////////////////////////////////
                            let arrayStock = req.body.stock
                            for (let i=0; i<arrayStock.length; i++) {
                                for(let j=0; j<arrayStock[i].length; j++) {
                                    let update = await Stock.update(
                                        {disponible: Sequelize.literal(`disponible - ${arrayStock[i][j].cantidad}`)}, { where: { id_articulo: arrayStock[i][j].id_articulo}})
                                        .then(update => {
                                            console.log(update)
                                    }).catch(err => {
                                        console.log(err)
                                })
                                } 
                            }
                            ///////////////////////////////////////////////////////////////////////
                        } else {
                            console.log("OK")
                        }
                        res.json(detped)
                    }).catch(er => {
                        console.log(er)
                        res.status(500).json(er)
                    })
                }).catch(errorDet => {
                    console.log(er)
                    res.status(500).json(er)
                })
                
            }).catch(err => {
                res.status(500).json({msg: "Se ha producido un erro al modificar"})
            })
        }
        console.log(req.body.stock)

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

        let pedidos = await Pedido.findByPk(req.params.id, {
            include: [
                {
                    association: "clientes"
                },
                {
                    association: "areas",
                    include: [
                        {
                            association: "TipoArea"
                        }
                    ]
                }
            ]
        });
  
          if(!pedidos) {
              res.status(404).json({ msg: "Pedido no encontrado" });
          } else {
              //res.json(preparados);
              
             let detpedi = await DetallePedido.findAll({
                where: {
                    id_pedido: req.params.id
                },
                include: [
                    {
                        association: "preparados",
                        include: [
                            {
                                association: "comidas",
                                include: [
                                    {
                                        association: "tipocomidas"
                                    }
                                ]
                            }
                        ]
                    }
                ]
             })
                if(!detpedi) {
                    res.status(404).json({ msg: "Detalles no encotrados" })
                } else {
                    let result = {
                        pedido: pedidos,
                        detalles: detpedi
                    }
                    res.json(result)
                }
          }
  
      },

}