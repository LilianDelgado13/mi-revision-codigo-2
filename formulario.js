// Se selecciona el formulario correctamente por ID
var formulario = document.querySelector("#formulario");

// Corrige el nombre del método preventDefault (estaba mal escrito)
formulario.onsubmit = function (event) {
  event.preventDefault();

  // Cambié nombres de variables para que no se repitan (antes usabas "e" dos veces)
  var inputNombre = formulario.elements["name"];
  var inputEdad = formulario.elements["age"];
  var inputNacionalidad = formulario.elements["nationality"];

  var nombre = inputNombre.value.trim();
  var edad = parseInt(inputEdad.value);

  var nacionalidad = inputNacionalidad.value;

  console.log(nombre, edad);
  console.log(nacionalidad);

  // Validaciones básicas
  if (nombre.length === 0) {
    inputNombre.classList.add("error");
  } else {
    inputNombre.classList.remove("error");
  }

  if (edad < 18 || edad > 120 || isNaN(edad)) {
    inputEdad.classList.add("error");
  } else {
    inputEdad.classList.remove("error");
  }

  // Si todo está bien, se agrega el invitado
  if (nombre.length > 0 && edad >= 18 && edad <= 120) {
    agregarInvitado(nombre, edad, nacionalidad);

    // Limpia el formulario
    formulario.reset();
  }
};

function agregarInvitado(nombre, edad, nacionalidad) {
  // Se traduce el valor de la nacionalidad
  const nacionalidades = {
    ar: "Argentina",
    mx: "Mexicana",
    per: "Peruana",
    vnzl: "Venezolana"
  };

  var nacionalidadTexto = nacionalidades[nacionalidad] || nacionalidad;

  var lista = document.getElementById("lista-de-invitados");

  var elementoLista = document.createElement("div");
  elementoLista.classList.add("elemento-lista");
  lista.appendChild(elementoLista);

  // Función para crear un campo
  function crearElemento(descripcion, valor) {
    var span = document.createElement("span");
    var input = document.createElement("input");
    var br = document.createElement("br");

    span.textContent = descripcion + ": ";
    input.value = valor;
    input.readOnly = true;

    elementoLista.appendChild(span);
    elementoLista.appendChild(input);
    elementoLista.appendChild(br);
  }

  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidadTexto);

  // Botón para eliminar invitado
  var botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";
  botonBorrar.onclick = function () {
    elementoLista.remove();
  };

  var br = document.createElement("br");
  elementoLista.appendChild(br);
  elementoLista.appendChild(botonBorrar);
}
