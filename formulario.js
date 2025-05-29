// Seleccionamos el formulario por su ID
const formulario = document.querySelector("#formulario");

// Función que se ejecuta al enviar el formulario
formulario.onsubmit = function (event) {
  event.preventDefault(); // Evita que el formulario recargue la página

  // Obtenemos los elementos del formulario
  const inputNombre = formulario.elements["name"];
  const inputEdad = formulario.elements["age"];
  const inputNacionalidad = formulario.elements["nationality"];

  const nombre = inputNombre.value.trim();
  const edad = parseInt(inputEdad.value);
  const nacionalidad = inputNacionalidad.value;

  // Validaciones
  let esValido = true;

  if (nombre.length === 0) {
    inputNombre.classList.add("error");
    esValido = false;
  } else {
    inputNombre.classList.remove("error");
  }

  if (isNaN(edad) || edad < 18 || edad > 120) {
    inputEdad.classList.add("error");
    esValido = false;
  } else {
    inputEdad.classList.remove("error");
  }

  // Si los datos son válidos, agregamos el invitado
  if (esValido) {
    agregarInvitado(nombre, edad, nacionalidad);
    formulario.reset(); // Limpia los campos después de agregar
  }
};

// Función para agregar un invitado a la lista
function agregarInvitado(nombre, edad, nacionalidad) {
  // Diccionario para convertir códigos a texto
  const nacionalidades = {
    ar: "Argentina",
    mx: "Mexicana",
    per: "Peruana",
    vnzl: "Venezolana"
  };

  const nacionalidadTexto = nacionalidades[nacionalidad] || nacionalidad;

  // Seleccionamos el contenedor de la lista
  const lista = document.getElementById("lista-de-invitados");

  // Creamos una tarjeta para el nuevo invitado
  const elementoLista = document.createElement("div");
  elementoLista.classList.add("elemento-lista");

  // Función auxiliar para crear los campos de la tarjeta
  function crearElemento(descripcion, valor) {
    const span = document.createElement("span");
    const input = document.createElement("input");
    const br = document.createElement("br");

    span.textContent = descripcion + ": ";
    input.value = valor;
    input.readOnly = true;

    elementoLista.appendChild(span);
    elementoLista.appendChild(input);
    elementoLista.appendChild(br);
  }

  // Se crean los campos para nombre, edad y nacionalidad
  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidadTexto);

  // Botón para eliminar invitado
  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";
  botonBorrar.onclick = function () {
    elementoLista.remove(); // Elimina la tarjeta completa
  };

  elementoLista.appendChild(document.createElement("br"));
  elementoLista.appendChild(botonBorrar);

  // Agregamos la tarjeta a la lista
  lista.appendChild(elementoLista);
}
