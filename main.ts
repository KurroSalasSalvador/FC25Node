

import { obtenerTodosLosDatos } from "./llamada";
import { glosarioPosiciones } from "./posiciones";
import { terminalScript } from "./terminalScript";


async function main() {
  try {
    const baseDeDatos = await obtenerTodosLosDatos();
    const posiciones: any = glosarioPosiciones(baseDeDatos);

    console.log("Elige una posicion:");
    posiciones.forEach((posicion: any) => {
      console.log(posicion);
    });

    terminalScript(baseDeDatos);

    
    
  } catch (error) {

    console.error("Error al obtener los datos:", error); // Manejo de errores

  }
}

main();
