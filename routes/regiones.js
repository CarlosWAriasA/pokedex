const express = require("express");

const router = express.Router();

const regionesController = require("../controllers/RegionesController");

router.get("/home", regionesController.GetRegionesList);
router.get("/crear-region", regionesController.GetRegionCrear);
router.post("/crear-region", regionesController.PostRegionCrear);
router.get("/editar-region/:regionId", regionesController.GetRegionEditar);
router.post("/editar-region", regionesController.PostRegionEditar);
router.post("/eliminar-region", regionesController.PostRegionEliminar);

module.exports = router;