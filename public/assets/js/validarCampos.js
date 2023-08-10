// botones
const btnCrearPokemon = document.getElementById("btn-crear-pokemon");
const btnCrearRegion = document.getElementById("btn-crear-region");
const btnCrearTipo = document.getElementById("btn-crear-tipo");

// formularios
const crearPokemonForm = document.getElementById("crear-pokemon-form");
const crearRegionForm = document.getElementById("crear-region-form");
const crearTipoForm = document.getElementById("crear-tipo-form");

// inputs
const nombre = document.getElementById("nombrePokemon");
const imagen = document.getElementById("imagenPokemon");
const region = document.getElementById("regionPokemon");
const tipo = document.getElementById("tipoPokemon");
const nombreRegion = document.getElementById("nombreRegion");
const nombreTipo = document.getElementById("nombreTipo");

// funciones
function validarTipo() {
  let nombreTipoValue = nombreTipo.value;

  let isValid = true;
  isValid = validarInput(nombreTipo, nombreTipoValue, isValid)

  return isValid;
}

function validarRegion() {
  let nombreRegionValue = nombreRegion.value;

  let isValid = true;
  isValid = validarInput(nombreRegion, nombreRegionValue, isValid);

  return isValid;
}

function validarPokemon() {
  let nombreValue = nombre.value;
  let imagenValue = imagen.value;
  let regionValue = region.value;
  let tipoValue = tipo.value;

  let isValid = true;
  isValid = validarInput(nombre, nombreValue, isValid);
  isValid = validarInput(imagen, imagenValue, isValid);
  isValid = validarInput(region, regionValue, isValid);
  isValid = validarInput(tipo, tipoValue, isValid);
  
  return isValid;
}

function validarInput(input, value, isValid) {
  if (value == "" || value == null || value == undefined) {
    input.classList.remove("input-success");
    input.classList.add("input-error");
    input.closest("div").querySelector("p").classList.add("show");
    isValid = false;
    return isValid;
  } else {
    input.classList.remove("input-error");
    input.classList.add("input-success");
    input.closest("div").querySelector("p").classList.remove("show");

    if (!isValid) {
      return false;
    }
    return isValid;
  }
}

// eventos
if (btnCrearPokemon) {
  btnCrearPokemon.addEventListener("click", function (e) {
    e.preventDefault();
    if (validarPokemon()) {
      crearPokemonForm.submit();
    }
  })
}

if (btnCrearRegion) {
  btnCrearRegion.addEventListener("click", function (e) {
    e.preventDefault();
    if (validarRegion()) {
      crearRegionForm.submit();
    }
  })
}

if (btnCrearTipo) {
  btnCrearTipo.addEventListener("click", function (e) {
    e.preventDefault();
    if (validarTipo()) {
      crearTipoForm.submit();
    }
  })
}