const express = require('express');
const router = express.Router();


// Middlewares
const auth = require('./middlewares/auth');


// Controllers
const AuthController = require('./controllers/AuthController');
const ClientesController = require('./controllers/ClientesController');
const CategoryController = require('./controllers/CategoryController');
const ArticulosController = require('./controllers/ArticulosController');
const TipComidasController = require('./controllers/TipComidasController')
const ComidasController = require('./controllers/ComidasController')
const PreparadosController = require('./controllers/PreparadosController')
const PedidosController = require('./controllers/PedidosController')
const StockController = require('./controllers/StockController')
const UnidadMController = require('./controllers/UnidadMController')
const TipoAreasController = require('./controllers/TipoAreasController')
const AreasController = require('./controllers/AreasController')

// Home
router.get('/', (req, res) => res.json({ hello: 'World' }));

// Dos rutas: Login y registro
// /api/singin and /api/singoup
router.post('/api/signin', AuthController.signIn);
router.post('/api/singoup', AuthController.signUp);

// Rutas Clientes 
router.get('/api/clientes', auth, ClientesController.index);
router.post('/api/clientes/crear', auth, ClientesController.create);
router.get('/api/clientes/:id', auth, ClientesController.show);
router.patch('/api/clientes/:id', auth, ClientesController.update);
router.delete('/api/clientes/:id', auth, ClientesController.delete);

// Rutas Categorias
router.get('/api/categorias', auth, CategoryController.index);
router.post('/api/categorias/crear', auth, CategoryController.create);
router.get('/api/categorias/:id', auth, CategoryController.show);
router.patch('/api/categorias/:id', auth, CategoryController.update);
router.delete('/api/categorias/:id', auth, CategoryController.delete);

// Rutas Articulos
router.get('/api/articulos', auth, ArticulosController.index);
router.post('/api/articulos/crear', auth, ArticulosController.create);
router.get('/api/articulos/:id', auth, ArticulosController.show);
router.patch('/api/articulos/:id', auth, ArticulosController.update);
router.delete('/api/articulos/:id', auth, ArticulosController.delete);

// Rutas Tipo de Comidas

router.get('/api/tipcomidas', auth, TipComidasController.index)
router.post('/api/tipcomidas/crear', auth, TipComidasController.create)
router.patch('/api/tipcomidas/:id', auth, TipComidasController.update)
router.delete('/api/tipcomidas/:id', auth, TipComidasController.delete)

// Rutas Comidas

router.get('/api/comidas', auth, ComidasController.index)
router.post('/api/comidas/crear', auth, ComidasController.create)
router.patch('/api/comidas/:id', auth, ComidasController.update)
router.delete('/api/comidas/:id', auth, ComidasController.delete)

// Rutas Preparados

router.get('/api/preparados', auth, PreparadosController.index)
router.post('/api/preparados/crear', auth, PreparadosController.create)
router.get('/api/preparados/:id', auth, PreparadosController.show)
router.patch('/api/preparados/:id', auth, PreparadosController.update)
router.patch('/api/preparados/status/:id', auth, PreparadosController.updateStatus)
router.delete('/api/preparados/:id', auth, PreparadosController.delete)
router.get('/api/detalles/list', auth, PreparadosController.list)

// Rutas Pedidos

router.get('/api/pedidos', auth, PedidosController.index)
router.post('/api/pedidos/crear', auth, PedidosController.create)
router.get('/api/pedidos/:id', auth, PedidosController.show)
router.patch('/api/pedidos/:id', auth, PedidosController.update)

// Rutas Stock

router.get('/api/stock', auth, StockController.index)
router.patch('/api/stock/:id', auth, StockController.update)

// Rutas Unidades de Medida

router.get('/api/unidad', auth, UnidadMController.index)
router.post('/api/unidad/crear', auth, UnidadMController.create);
router.get('/api/unidad/:id', auth, UnidadMController.show);
router.patch('/api/unidad/:id', auth, UnidadMController.update);
router.delete('/api/unidad/:id', auth, UnidadMController.delete);

// Rutas Tipo Areas/Espacios

router.get('/api/tipoareas', auth, TipoAreasController.index)
router.post('/api/tipoareas/crear', auth, TipoAreasController.create);
router.get('/api/tipoareas/:id', auth, TipoAreasController.show);
router.patch('/api/tipoareas/:id', auth, TipoAreasController.update);
router.delete('/api/tipoareas/:id', auth, TipoAreasController.delete);

// Rutas Areas/Espacios

router.get('/api/areas', auth, AreasController.index)
router.post('/api/areas/crear', auth, AreasController.create);
router.get('/api/areas/:id', auth, AreasController.show);
router.patch('/api/areas/:id', auth, AreasController.update);
router.delete('/api/areas/:id', auth, AreasController.delete);

module.exports = router;