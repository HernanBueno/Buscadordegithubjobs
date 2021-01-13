const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener("submit", validarBusqueda);
});

function validarBusqueda(e) {
    e.preventDefault();
    const busqueda = document.querySelector("#busqueda").value;
    if (busqueda.length < 3) {
        mostrarMensaje("Busqueda muy corta, agrega mas informacion");
        return;
    }

    consultarAPI(busqueda);
}

function consultarAPI(busqueda) {
    const url = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const urlB = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    axios
        .get(urlB)
        .then((respuesta) => mostrarVacante(JSON.parse(respuesta.data.contents)));
}

function mostrarMensaje(msj) {
    const alertaPrevia = document.querySelector("alerta");
    if (!alertaPrevia) {
        const mensaje = document.createElement("div");
        mensaje.classList.add(
            "bg-gray-100",
            "p-3",
            "text-center",
            "mt-3",
            "alerta"
        );
        mensaje.textContent = msj;
        formulario.appendChild(mensaje);
        setTimeout(() => {
            mensaje.remove();
        }, 3000);
    }
}

function mostrarVacante(vacante) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
    if (vacante.length > 0) {
        vacante.forEach((v) => {
            const { company, title, type, url } = v;
            resultado.innerHTML += `<div class="shadow bg-white p-6 rounded">
        <h2 class="text-2xl font-light mb-4">${title}</h2>
        <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
        <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
        <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
    </div>`;
        });
    } else {
        const noResultado = document.createElement("p");
        noResultado.classList.add(
            "text-center",
            "mt-10",
            "text-gray-600",
            "w-full"
        );
        resultado.classList.remove("grid");
        noResultado.textContent = "No hay vacantes, intenta buscar otra tecnologia";
        resultado.appendChild(noResultado);
    }
}