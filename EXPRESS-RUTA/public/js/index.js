const API_URL = "http://localhost:8000/api/cripto";

const form = document.getElementById("criptoForm");
const tableBody = document.getElementById("criptoTableBody");
const idInput = document.getElementById("criptoId");

const nombre = document.getElementById("nombre");
const simbolo = document.getElementById("simbolo");
const precioUSD = document.getElementById("precioUSD");
const capitalizacion = document.getElementById("capitalizacion");
const descripcion = document.getElementById("descripcion");

const totalCriptos = document.getElementById("totalCriptos");
const precioPromedio = document.getElementById("precioPromedio");
const capTotal = document.getElementById("capTotal");

// Obtener todas las criptomonedas
async function obtenerCriptos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  tableBody.innerHTML = "";

  if (!data.criptos) return;

  let total = 0;
  let sumPrecio = 0;
  let sumCap = 0;

  data.criptos.forEach((cripto) => {
    total++;
    sumPrecio += parseFloat(cripto.precioUSD || 0);
    sumCap += parseFloat(cripto.capitalizacion || 0);

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cripto.nombre}</td>
      <td>${cripto.simbolo}</td>
      <td>$${cripto.precioUSD}</td>
      <td>${cripto.capitalizacion || "-"}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="editarCripto('${cripto._id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarCripto('${cripto._id}')">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(fila);
  });

  totalCriptos.textContent = total;
  precioPromedio.textContent = `$${(sumPrecio / (total || 1)).toFixed(2)}`;
  capTotal.textContent = `$${sumCap.toLocaleString()}`;
}

// Crear o actualizar
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cripto = {
    nombre: nombre.value,
    simbolo: simbolo.value,
    precioUSD: parseFloat(precioUSD.value),
    capitalizacion: capitalizacion.value ? parseFloat(capitalizacion.value) : null,
    descripcion: descripcion.value
  };

  const method = idInput.value ? "PUT" : "POST";
  const url = idInput.value ? `${API_URL}/${idInput.value}` : API_URL;

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cripto),
  });

  form.reset();
  idInput.value = "";
  obtenerCriptos();
});

// Editar
async function editarCripto(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  const c = data.cripto;

  idInput.value = c._id;
  nombre.value = c.nombre;
  simbolo.value = c.simbolo;
  precioUSD.value = c.precioUSD;
  capitalizacion.value = c.capitalizacion || "";
  descripcion.value = c.descripcion || "";
}

// Eliminar
async function eliminarCripto(id) {
  if (confirm("¿Seguro que deseas eliminar esta criptomoneda?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    obtenerCriptos();
  }
}

obtenerCriptos();
