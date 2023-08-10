const Tipos = require("../models/Tipo");

exports.GetTiposList = (request, response, next) => {
  Tipos.findAll().then((data) => {
    const tipos = data.map((tipo) => tipo.dataValues);

    response.render("tipos/tipos-list", {
      pageTitle: "Tipos de Pokemon",
      tiposPokemonesActive: true,
      tipos: tipos,
      hasTipos: tipos.length > 0,
    });

  }).catch((Err) => {
    console.log(Err);
  })
}

exports.GetTipoCrear = (request, response, next) => {
  response.render("tipos/tipo-form", {
    pageTitle: "Crear Tipo de Pokemon",
    tiposPokemonesActive: true,
    editMode: false
  });
}

exports.PostTipoCrear = (request, response, next) => {
  const name = request.body.NombreTipo;

  Tipos.create({ name: name} )
    .then(() => {
      return response.redirect("/tipos/home");
    }).catch((err) => {
    console.log(err);
    })
}

exports.GetTipoEditar = (request, response, next) => {
  const tipoId = request.params.tipoId;
  const edit = request.query.edit;

  if (!edit) {
    return response.redirect("/tipos/home");
  }

  Tipos.findOne({ where: { id: tipoId } })
    .then((valor) => {
      const tipo = valor.dataValues;

      if (!tipo) {
        return response.redirect("/tipos/home");
      }

      response.render("tipos/tipo-form", {
        pageTitle: "Editar Tipo de Pokemon",
        tiposPokemonesActive: true,
        editMode: edit,
        tipo: tipo
  });
    }).catch((err) => {
    console.log(err);
  })
}

exports.PostTipoEditar = (request, response, next) => {
  const id = request.body.tipoId;
  const name = request.body.NombreTipo;

  Tipos.update({ name: name}, { where: { id: id } })
    .then(() => {
      response.redirect("/tipos/home");
    }).catch((err) => {
      console.log(err)
    });
}

exports.PostTipoEliminar = (request, response, next) => {
  const id = request.body.tipoId;

  Tipos.destroy({ where: { id: id } })
    .then(() => {
      return response.redirect("/tipos/home");
    }).catch((err) => {
    console.log(err);
  })
}
