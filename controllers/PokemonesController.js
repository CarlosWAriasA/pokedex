const Pokemones = require("../models/Pokemon");
const Regiones = require("../models/Region");
const Tipos = require("../models/Tipo");

exports.GetPokemonesList = (request, response, next) => {
  Pokemones.findAll({
    include: [
      { model: Regiones, as: "region" },
      { model: Tipos }
    ]
  }).then((data) => {
    const pokemonesData = data.map((pokemon) => pokemon.dataValues);

    const pokemones = pokemonesData.map((pokemon) => {
      pokemon.region = pokemon.region.dataValues.name;
      pokemon.tipo = pokemon.tipo.dataValues.name;
      return pokemon;
    })

    response.render("pokemones/pokemones-list", {
      pageTitle: "Pokemones",
      pokemonesActive: true,
      pokemones: pokemones,
      hasPokemones: pokemones.length > 0
    });

  }).catch((Err) => {
    console.log(Err);
  })
}

exports.GetPokemonCrear = (request, response, next) => {

  Regiones.findAll().then((result1) => {
    Tipos.findAll().then((result2) => {

      const regiones = result1.map(data => data.dataValues);
      const tipos = result2.map(data => data.dataValues);

       response.render("pokemones/pokemon-form", {
        pageTitle: "Crear Pokemon",
        pokemonesActive: true,
        editMode: false,
        regiones: regiones,
        tipos: tipos,
        hasRegiones: regiones.length > 0,
        hasTipos: tipos.length > 0
  });
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
}

exports.PostPokemonCrear = (request, response, next) => {
  const name = request.body.NombrePokemon;
  const imagen = request.body.ImagenPokemon;
  const region = request.body.RegionPokemon;
  const tipo = request.body.TipoPokemon;

  Pokemones.create({ name: name, imageUrl: imagen, regionId: region, tipoId: tipo })
    .then((result) => {
      return response.redirect("/pokemones/home");
    }).catch((err) => {
    console.log(err);
    })
}

exports.GetPokemonEditar = (request, response, next) => {
  const pokemonId = request.params.pokemonId;
  const edit = request.query.edit;

  console.log(pokemonId);

  if (!edit) {
    return response.redirect("/pokemones/home");
  }

  Pokemones.findOne({
    where: { id: pokemonId }})
    .then((valor) => {
      const pokemon = valor.dataValues;

      if (!pokemon) {
        return response.redirect("/pokemones/home");
      }

      Regiones.findAll().then((result1) => {
        Tipos.findAll().then((result2) => {

          const regiones = result1.map(data => data.dataValues);
          const tipos = result2.map(data => data.dataValues);

          response.render("pokemones/pokemon-form", {
            pageTitle: "Editar Pokemon",
            pokemonesActive: true,
            editMode: edit,
            pokemon: pokemon,
            regiones: regiones,
            tipos: tipos,
            hasRegiones: regiones.length > 0,
            hasTipos: tipos.length > 0
      });
        }).catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
  })
    .catch((err) => {
    console.log(err);
  })
}

exports.PostPokemonEditar = (request, response, next) => {
  const id = request.body.pokemonId;
  const name = request.body.NombrePokemon;
  const imagen = request.body.ImagenPokemon;
  const region = request.body.RegionPokemon;
  const tipo = request.body.TipoPokemon;

  Pokemones.update({ name: name, imageUrl: imagen, regionId: region, tipoId: tipo }, { where: { id: id } })
    .then(() => {
      response.redirect("/pokemones/home");
    }).catch((err) => {
      console.log(err)
    });
}

exports.PostPokemonEliminar = (request, response, next) => {
  const id = request.body.pokemonId;
  
  Pokemones.destroy({ where: { id: id } })
    .then(() => {
      return response.redirect("/pokemones/home");
    }).catch((err) => {
    console.log(err);
  })
}