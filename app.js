const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");

const connection = require("./context/AppContext");

const Pokemones = require("./models/Pokemon");
const Regiones = require("./models/Region");
const Tipos = require("./models/Tipo");

const errorController = require("./controllers/ErrorController");

const homeRouter = require("./routes/home");
const pokemonesRouter = require("./routes/pokemones");
const regionesRouter = require("./routes/regiones");
const tiposRouter = require("./routes/tipos");

const equalHelper = require("./util/helpers/hbs/equal");
const consoleHelper = require("./util/helpers/hbs/console");

app.engine("hbs", engine({
  layoutsDir: "views/layouts/",
  defaultLayout: "main-layout",
  extname: "hbs",
  helpers: {
    areEqual: equalHelper.areEqual,
    consoleLog: consoleHelper.ConsoleLog
  }
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRouter);
app.use("/pokemones", pokemonesRouter);
app.use("/regiones", regionesRouter);
app.use("/tipos", tiposRouter);

app.use("/", errorController.Get404);

Regiones.hasMany(Pokemones, { foreignKey: "regionId", as: 'region', onDelete: "CASCADE" });
Tipos.hasMany(Pokemones, { foreignKey: "tipoId", onDelete: "CASCADE" });

Pokemones.belongsTo(Regiones, { constraint: true, foreignKey: "regionId", onDelete: "CASCADE", as: "region" });
Pokemones.belongsTo(Tipos, { constraint: true, foreignKey: "tipoId", onDelete: "CASCADE" });


connection.sync({force: false}).then(() => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
})