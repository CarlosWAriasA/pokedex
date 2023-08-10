const express = require("express");

const router = express.Router();

const tiposController = require("../controllers/TiposController");

router.get("/home", tiposController.GetTiposList);
router.get("/crear-tipo", tiposController.GetTipoCrear);
router.post("/crear-tipo", tiposController.PostTipoCrear);
router.get("/editar-tipo/:tipoId", tiposController.GetTipoEditar);
router.post("/editar-tipo", tiposController.PostTipoEditar);
router.post("/eliminar-tipo", tiposController.PostTipoEliminar);

module.exports = router;