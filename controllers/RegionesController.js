const Regiones = require("../models/Region");

exports.GetRegionesList = (request, response, next) => {
  Regiones.findAll().then((data) => {
    const regiones = data.map((region) => region.dataValues);

    response.render("regiones/regiones-list", {
      pageTitle: "Regiones",
      regionesActive: true,
      regiones: regiones,
      hasRegiones: regiones.length > 0,
    });

  }).catch((Err) => {
    console.log(Err);
  })
}

exports.GetRegionCrear = (request, response, next) => {
  response.render("regiones/region-form", {
    pageTitle: "Crear Region",
    regionesActive: true,
    editMode: false
  });
}

exports.PostRegionCrear = (request, response, next) => {
  const name = request.body.NombreRegion;

  Regiones.create({ name: name})
    .then(() => {
      return response.redirect("/regiones/home");
    }).catch((err) => {
    console.log(err);
    })
}

exports.GetRegionEditar = (request, response, next) => {
  const regionId = request.params.regionId;
  const edit = request.query.edit;

  if (!edit) {
    return response.redirect("/regiones/home");
  }

  Regiones.findOne({ where: { id: regionId } })
    .then((valor) => {
      const region = valor.dataValues;

      if (!region) {
        return response.redirect("/regiones/home");
      }

      response.render("regiones/region-form", {
        pageTitle: "Editar Region",
        regionesActive: true,
        editMode: edit,
        region: region
  });
    }).catch((err) => {
    console.log(err);
  })
}

exports.PostRegionEditar = (request, response, next) => {
  const id = request.body.regionId;
  const name = request.body.NombreRegion;

  Regiones.update({ name: name}, { where: { id: id } })
    .then(() => {
      response.redirect("/regiones/home");
    }).catch((err) => {
      console.log(err)
    });
}

exports.PostRegionEliminar = (request, response, next) => {
  const id = request.body.regionId;

  Regiones.destroy({ where: { id: id } })
    .then(() => {
      return response.redirect("/regiones/home");
    }).catch((err) => {
    console.log(err);
  })

}
