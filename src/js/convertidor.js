import { MORSE } from "./morse.js";

// Tabla al revés: código Morse -> letra
const INVERSO = {};
for (const letra of Object.keys(MORSE)) {
  INVERSO[MORSE[letra]] = letra;
}

export function textoAMorse(texto) {
  if (texto.trim() === "") {
    throw new Error("Escribe un texto para convertir.");
  }

  const palabras = texto.trim().toUpperCase().split(/\s+/);
  const palabrasMorse = [];

  for (const palabra of palabras) {
    const letrasMorse = [];
    for (const letra of palabra) {
      if (!(letra in MORSE)) {
        throw new Error(`El carácter "${letra}" no tiene equivalente en Morse (solo letras, Ñ y números).`);
      }
      letrasMorse.push(MORSE[letra]);
    }
    palabrasMorse.push(letrasMorse.join(" "));
  }

  return palabrasMorse.join(" / ");
}

export function morseATexto(morse) {
  if (morse.trim() === "") {
    throw new Error("Escribe un código Morse para convertir.");
  }

  // Se aceptan también _ , — y · como raya y punto
  const limpio = morse.trim().replace(/[_—–]/g, "-").replace(/·/g, ".");

  const invalido = limpio.match(/[^.\- /]/);
  if (invalido) {
    throw new Error(`El carácter "${invalido[0]}" no es válido. Usa solo puntos (.), rayas (-), espacios y "/".`);
  }

  // Palabras separadas por "/" (o por 3 o más espacios)
  const palabrasMorse = limpio.split(/\s*\/\s*|\s{3,}/);
  const palabras = [];

  for (const palabraMorse of palabrasMorse) {
    let palabra = "";
    for (const codigo of palabraMorse.trim().split(/\s+/)) {
      if (codigo === "") continue;
      if (!(codigo in INVERSO)) {
        throw new Error(`El código "${codigo}" no existe en la tabla Morse.`);
      }
      palabra += INVERSO[codigo];
    }
    palabras.push(palabra);
  }

  return palabras.join(" ");
}
