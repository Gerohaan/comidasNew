const { Cliente } = require('../models/index')
const { ContratoEmpenio } = require('../models/index')
const { Pedido } = require('../models/index')

module.exports = {


    // Listar

    async index(req, res) {

        let client = await Cliente.findAll();

        res.json(client)
    },

    // Show id

    async show(req, res) {

      let client = await Cliente.findByPk(req.params.id);

        if(!client) {
            res.status(404).json({ msg: "Cliente no encontrado" });
        } else {
            res.json(client);
        }

    },

    // Create

    async create(req, res) {

        let client = await Cliente.create({

            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            nacionalidad: req.body.nacionalidad,
            numero_cedula: req.body.numero_cedula,
            telefono: req.body.telefono,
            edo_civil: req.body.edo_civil,
            correo: req.body.correo,
            direccion: req.body.direccion,
            status: req.body.status

        }).then(client => {
            res.json(client);
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Update

    async update(req, res) {

      let client = await Cliente.findByPk(req.params.id);

      if(!client) {
          res.status(404).json({ msg: "Cliente no encontrado" });
      } else {
          
            client.nombres = req.body.nombres;
            client.apellidos = req.body.apellidos;
            client.nacionalidad = req.body.nacionalidad;
            client.numero_cedula = req.body.numero_cedula;
            client.telefono = req.body.telefono;
            client.edo_civil = req.body.edo_civil;
            client.correo = req.body.correo;
            client.direccion = req.body.direccion;
            client.status = req.body.status;

            client.save().then(client => {
                res.json(client)
            })
      }
    },

    // Delete 
    
    async delete(req, res) {

      let client = await Cliente.findByPk(req.params.id);

        if(!client) {
            res.status(404).json({ msg: "Cliente no encontrado" });
        } else {
            let clientePedido = await Pedido.findAndCountAll(
                { where: { id_cliente: req.params.id } 
            })
            let totolClient = clientePedido.count 
            if(totolClient >= 1)
            {
                res.status(500).json({ msg: "El cliente tiene pedidos regitrados" });
            } else {
                client.destroy().then(client => {
                    res.json({ msg: "El cliente ha sido eliminado" });
                })
            }
        }

    }



}