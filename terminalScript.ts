import { PlayerSearch } from "./busqueda";

export function terminalScript(baseDeDatos: any) {
    const playerSearch = new PlayerSearch(baseDeDatos);
    const readline: any = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(
      'Introduce la posición del jugador (ejemplo: "FW"): ',
      (position: any) => {
        rl.question(
          'Introduce el rango de edad (ejemplo: "30 40"): ',
          (ageRangeInput: any) => {
            const ageRange = ageRangeInput
              .split(" ")
              .map((num: any) => parseInt(num));
            rl.question(
              'Introduce el rango de overallRating (ejemplo: "90 95"): ',
              (ratingRangeInput: any) => {
                const ratingRange = ratingRangeInput
                  .split(" ")
                  .map((num: any) => parseInt(num));

                // Ejecutar la búsqueda con los parámetros introducidos
                const filteredPlayers = playerSearch.search(
                  position,
                  ageRange,
                  ratingRange
                );

                // Mostrar los resultados filtrados
                if(filteredPlayers.length > 0){
                filteredPlayers.forEach((player) => {
                  console.log(`First Name: ${player.firstName}`);
                  console.log(`Last Name: ${player.lastName}`);
                  console.log(`Nationality: ${player.nationality}`);
                  console.log(`Team: ${player.team}`);
                  console.log(`Birth Date: ${player.birthDate}`);
                  console.log(`Position: ${player.position}`);
                  console.log(`Overall Rating: ${player.overallRating}`);
                  console.log("--------------------------");
                });
                } else {
                  console.log("NO HAY EXISTE NINGUN JUGADOR"); 
                }

                process.exit();
              }
            );
          }
        );
      }
    );
  }    

