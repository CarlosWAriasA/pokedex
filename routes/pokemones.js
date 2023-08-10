const express = require("express");

const router = express.Router();

const pokemonesController = require("../controllers/PokemonesController");

router.get("/home", pokemonesController.GetPokemonesList);
router.get("/crear-pokemon", pokemonesController.GetPokemonCrear);
router.post("/crear-pokemon", pokemonesController.PostPokemonCrear);
router.get("/editar-pokemon/:pokemonId", pokemonesController.GetPokemonEditar);
router.post("/editar-pokemon", pokemonesController.PostPokemonEditar);
router.post("/eliminar-pokemon", pokemonesController.PostPokemonEliminar);

module.exports = router;