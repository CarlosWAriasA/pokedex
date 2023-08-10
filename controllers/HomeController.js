const { Op } = require("sequelize");
const Pokemones = require("../models/Pokemon");
const Regiones = require("../models/Region");
const Tipos = require("../models/Tipo");

exports.GetHome = (request, response, next) => {
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

    Regiones.findAll().then((result) => {
      const regiones = result.map(region => region.dataValues);

      response.render("home/index", {
        pageTitle: "Home Page",
        homeActive: true,
        pokemones: pokemones,
        hasPokemones: pokemones.length > 0,
        regiones: regiones,
      })
    }).catch((err) => {
      console.log(err);
    })

  }).catch((err) => {
    console.log(err);
  })
}

exports.PostByName = (request, response, next) => {
  const nombre = request.body.filtroNombre;

  response.redirect(`/buscar-nombre/?filter=${nombre}`); 
} 

exports.GetByName = (request, response, next) => {
  const nombre = request.query.filter;

  Pokemones.findAll({
    include: [
      { model: Regiones, as: "region" },
      { model: Tipos }
    ], where: {name: {[Op.like]: `%${nombre}%`}} 
  }).then((data) => {
    const pokemonesData = data.map((pokemon) => pokemon.dataValues);

    const pokemones = pokemonesData.map((pokemon) => {
      pokemon.region = pokemon.region.dataValues.name;
      pokemon.tipo = pokemon.tipo.dataValues.name;
      return pokemon;
    })

    Regiones.findAll().then((result) => {
      const regiones = result.map(region => region.dataValues);

        response.render("home/filters/filter-name", {
          pageTitle: "Home Page",
          homeActive: true,
          pokemones: pokemones,
          hasPokemonesNombre: pokemones.length > 0,
          regiones: regiones,
          filtro: nombre
        })
    }).catch((err) => {
      console.log(err);
    })

  }).catch((err) => {
    console.log(err);
  })
}

exports.PostByRegion = (request, response, next) => {
  const nombreRegion = request.body.filtroRegion;

  response.redirect(`/buscar-region/?filter=${nombreRegion}`); 
}

exports.GetByRegion = (request, response, next) => {
  const nombreRegion = request.query.filter;
  let region;

  Regiones.findOne({ where: { id: nombreRegion } }).then((data) => {
    const valor = data.dataValues.name;
    region = valor;
  }).catch((err) => {
    console.log(err);
  })

  Pokemones.findAll({
    include: [
      { model: Regiones, as: "region" },
      { model: Tipos }
    ], where: {regionId: nombreRegion} 
  }).then((data) => {
    const pokemonesData = data.map((pokemon) => pokemon.dataValues);

    const pokemones = pokemonesData.map((pokemon) => {
      pokemon.region = pokemon.region.dataValues.name;
      pokemon.tipo = pokemon.tipo.dataValues.name;
      return pokemon;
    })
    
    Regiones.findAll().then((result) => {
      const regiones = result.map(region => region.dataValues);

        response.render("home/filters/filter-region", {
          pageTitle: "Home Page",
          homeActive: true,
          pokemones: pokemones,
          hasPokemonesRegion: pokemones.length > 0,
          regiones: regiones,
          region: region
        })
    }).catch((err) => {
      console.log(err);
    })

  }).catch((err) => {
    console.log(err);
  })
} 