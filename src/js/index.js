import "../css/estilos.css";
import { MORSE } from "./morse.js";
import { textoAMorse, morseATexto } from "./convertidor.js";

const modo = document.getElementById("modo");
const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const alerta = document.getElementById("alerta");
const tabla = document.getElementById("tabla");

const mostrarAlerta = (mensaje) => {
  alerta.textContent = mensaje;
  alerta.classList.remove("oculto");
};

const ocultarAlerta = () => {
  alerta.textContent = "";
  alerta.classList.add("oculto");
};

const convertir = () => {
  ocultarAlerta();
  salida.textContent = "";

  try {
    if (modo.value === "texto-morse") {
      salida.textContent = textoAMorse(entrada.value);
    } else {
      salida.textContent = morseATexto(entrada.value);
    }
  } catch (error) {
    mostrarAlerta(error.message);
  }
};

const limpiar = () => {
  entrada.value = "";
  salida.textContent = "";
  ocultarAlerta();
  entrada.focus();
};

const cambiarModo = () => {
  limpiar();
  if (modo.value === "texto-morse") {
    entrada.placeholder = "Escribe aquí tu texto";
  } else {
    entrada.placeholder = "Ejemplo: .... --- .-.. .- / -- ..- -. -.. ---";
  }
};

const dibujarTabla = () => {
  let html = "";
  for (const letra of Object.keys(MORSE)) {
    html += `<div class="celda"><b>${letra}</b>${MORSE[letra]}</div>`;
  }
  tabla.innerHTML = html;
};

document.getElementById("btnConvertir").addEventListener("click", convertir);
document.getElementById("btnLimpiar").addEventListener("click", limpiar);
modo.addEventListener("change", cambiarModo);

dibujarTabla();
