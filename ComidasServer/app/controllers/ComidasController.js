const { Comida } = require('../models/index')
const { Preparado } = require('../models/index')

module.exports = {

    // Listar

    async index(req, res) {
        
        let comidas = await Comida.findAll({
            include: [
                {
                    association: "tipocomidas"
                }
            ]
        })

        if(!comidas) {
            res.status(404).json({ msg: "No se han encontrado registros" });
        } else {
            res.json(comidas)

            //res.json({msg: "Hola desde el servidor"})
        }
        
    },

     // Create

     async create(req, res) {

        let comidas = await Comida.create({

            nombre: req.body.nombre,
            id_tipoComida: req.body.id_tipo,
            clase: req.body.clase,
            status: req.body.status

        }).then(comidas => {
            res.json(comidas);
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Update

    async update(req, res) {

        let comidas = await Comida.findByPk(req.params.id);

      if(!comidas) {
          res.status(404).json({ msg: "Comida no encontrada" });
      } else {
          
            comidas.nombre = req.body.nombre;
            comidas.id_tipoComida = req.body.id_tipo
            comidas.clase = req.body.clase
            comidas.status = req.body.status;

            comidas.save().then(comidas => {
                res.json(comidas)
            })

      }

    },

     // Delete

     async delete(req, res) {

        let comidas = await Comida.findByPk(req.params.id);

        if(!comidas) {
            res.status(404).json({ msg: "Comida no encontrada" });
        } else {
            let preparados = await Preparado.findAndCountAll(
                { where: { id_comida: req.params.id } 
            })
            let count = preparados.count
            if(count >= 1){
                res.status(500).json({ msg: "La Comida no puede ser elimiada porque forma parte de uno o mas preparados" });
            }else {
                comidas.destroy().then(comidas => {
                    res.json({ msg: "La Comida ha sido eliminada" });
                }).catch(erer => {
                    res.status(500).json({ msg: "No puede ser eliminada" })
                })
            }
            
        }

    },

}