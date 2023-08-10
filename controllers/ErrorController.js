exports.Get404 = (request, response, next) => {
  response.status(404).render("error/404", {
    pageTitle: "Error 404"
  });
};