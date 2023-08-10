const express = require("express");

const router = express.Router();

const homeController = require("../controllers/HomeController");

router.get("/", homeController.GetHome);
router.post("/buscar-nombre", homeController.PostByName);
router.get("/buscar-nombre/", homeController.GetByName);
router.post("/buscar-region", homeController.PostByRegion);
router.get("/buscar-region/", homeController.GetByRegion)

module.exports = router;