window.onload = function () {
  let container = document.getElementById("div_DOM");
  document
    .getElementById("calcularPrecio")
    .addEventListener("click", calcularPrecio);
  // Buttons
  // Ingredientes
  let tamanos = document.createElement("div");
  tamanos.textContent = "Elije el tamaño tu pizza:";

  // Array vacío para implementar con JSON
  var opcionesTamanos = [];

  // Checkbox
  var ingredientes = document.createElement("div");
  ingredientes.textContent = "Elije los ingredientes de tu pizza: ";

  // Array vacío para implementar con JSON
  var opcionesIngredientes = [];

  const URL_DESTINO = "http://localhost:5500/A2_AJAX/";
  const RECURSO = "pizzeria.json";

  function cargarJson() {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(xmlHttp.responseText);
        opcionesTamanos = data.pizza.tamanos[0];
        opcionesIngredientes = data.ingredientes[0];

        // Bucle forEach para crear radio buttons para cada opción

        function visualizarTamanos(objeto) {
          for (var key in objeto) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "tamanos";
            radio.value = objeto[key];

            let labelTamanos = document.createElement("label");
            labelTamanos.textContent = key;

            tamanos.appendChild(radio);
            tamanos.appendChild(labelTamanos);
          }
        }
        
        function visualizaringredientes(objeto) {
          for (var key in objeto) {
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "ingredientes";
            checkbox.value = objeto[key];

            var labelIngredientes = document.createElement("label");
            labelIngredientes.textContent = key;

            ingredientes.appendChild(checkbox);
            ingredientes.appendChild(labelIngredientes);
          }
        }
        visualizarTamanos(opcionesTamanos);
        visualizaringredientes(opcionesIngredientes);
      } else {
        console.error("ERROR");
      }
    };

    xmlHttp.open("GET", URL_DESTINO + RECURSO, true);
    xmlHttp.send(null);
  }

  cargarJson();
  // Agregamos el contenedor de ingredientes al formulario
  container.appendChild(ingredientes);
  // Agregamos el contenedor de tamaños al formulario
  container.appendChild(tamanos);


  
  document
    .getElementById("refrescarJson")
    .addEventListener("click", cargarJson);
};

function calcularPrecio(event) {
  event.preventDefault();
  //Declaramos ambas variables. Se selecciona un elemento input cuyos atributos name sean 'tamano y 'ingredientes'
  //previamente seleccionados por el usuario y busca entre los que han salido seleccionados
  const precioTamano = document.querySelector('input[name="tamanos"]:checked');
  const ingredientes = document.querySelectorAll(
    'input[name="ingredientes"]:checked'
  );
  let precioIngredientes = 0;

  ingredientes.forEach(function (ingrediente) {
    var valor = parseFloat(ingrediente.value);
    precioIngredientes = precioIngredientes + valor;
  });

  //Declaramos la variable precioTotal que será la suma de las dos anteriores
  let precioTotal = parseFloat(precioTamano.value) + precioIngredientes;

  //Actualizamos el contenido de elemento con id=precioTotal del form
  document.getElementById(
    "precioTotal"
  ).textContent = `Precio Total: ${precioTotal}€`;
}
