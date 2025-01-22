import { Player } from "./datos.model";

export class PlayerSearch {
    private players: Player[];
  
    constructor(players: Player[]) {
      this.players = players;
    }
  
    // Función para buscar y mapear jugadores según los parámetros de búsqueda
    search(
      position: string | undefined,
      birthDateRange: [number, number] | undefined, // Rango de edades
      ratingRange: [number, number] | undefined // Rango de overallRating
    ): any[] {
      let filteredPlayers = this.players;
  
      // Filtrar por posición
      if (position) {
        filteredPlayers = this.filterByPosition(position, filteredPlayers);
      }
  
      // Filtrar por rango de edad
      if (birthDateRange) {
        filteredPlayers = this.filterByBirthDateRange(birthDateRange, filteredPlayers);
      }
  
      // Filtrar por rango de overallRating
      if (ratingRange) {
        filteredPlayers = this.filterByRatingRange(ratingRange, filteredPlayers);
      }
  
      // Mapear los jugadores filtrados y mostrar solo los campos requeridos
      return filteredPlayers.map(player => {
        const age = this.calculateAge(player.birthdate); // Calculamos la edad
  
        return {
          firstName: player.firstName,
          lastName: player.lastName,
          nationality: player.nationality.label,
          team: player.team.label,
          birthDate: `${age}`,  // Mostramos la edad formateada como un número
          position: player.position.shortLabel,
          overallRating: player.overallRating
        };
      });
    }
  
    // Filtrar por posición (posición corta)
    private filterByPosition(position: string, filteredPlayers: Player[]): Player[] {
      return filteredPlayers.filter(player => player.position.shortLabel.toLowerCase() === position.toLowerCase());
    }
  
    // Filtrar por rango de edad
    private filterByBirthDateRange(range: [number, number], filteredPlayers: Player[]): Player[] {
      return filteredPlayers.filter(player => {
        const age = this.calculateAge(player.birthdate);
        return age >= range[0] && age <= range[1];
      });
    }
  
    // Filtrar por rango de overallRating
    private filterByRatingRange(range: [number, number], filteredPlayers: Player[]): Player[] {
      return filteredPlayers.filter(player => {
        const overallRating = player.overallRating;
        return overallRating >= range[0] && overallRating <= range[1];
      });
    }
  
    // Calcular la edad de un jugador a partir de su fecha de nacimiento
    private calculateAge(birthdate: string): number {
        // Convertir la cadena de fecha en un objeto Date. Si el formato es compatible, JavaScript lo interpreta bien.
        const birthDate = new Date(birthdate);
        
        // Verificamos si la conversión a Date fue exitosa.
        if (isNaN(birthDate.getTime())) {
          throw new Error("La fecha de nacimiento es inválida");
        }
        
        // Obtenemos la fecha actual
        const today = new Date();
        
        // Calculamos la edad
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
      
        // Ajustamos la edad si la fecha de cumpleaños no ha ocurrido aún en este año
        if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
          age--;
        }
      
        return age;
      }
      
  }
  
  /*// Ejemplo de jugadores
  const players: Player[] = [
    {
      id: 1,
      commonName: "Lionel Messi",
      firstName: "Lionel",
      lastName: "Messi",
      avatarUrl: "",
      birthdate: "1987-06-24",  // 37 años
      gender: { id: 1, label: "Male" },
      height: 170,
      leagueName: "Ligue 1",
      nationality: { id: 1, label: "Argentina", imageUrl: "" },
      overallRating: 93,
      playerAbilities: [],
      position: { id: "1", shortLabel: "FW", label: "Forward", positionType: { id: "1", name: "Attacker" } },
      preferredFoot: 1,
      rank: 1,
      shieldUrl: "",
      skillMoves: 5,
      stats: {},
      team: { id: 1, label: "PSG", imageUrl: "", isPopular: true },
      weakFootAbility: 4,
      weight: 72
    },
    {
      id: 2,
      commonName: "Cristiano Ronaldo",
      firstName: "Cristiano",
      lastName: "Ronaldo",
      avatarUrl: "",
      birthdate: "1985-02-05",  // 39 años
      gender: { id: 1, label: "Male" },
      height: 187,
      leagueName: "Saudi Pro League",
      nationality: { id: 2, label: "Portugal", imageUrl: "" },
      overallRating: 92,
      playerAbilities: [],
      position: { id: "2", shortLabel: "FW", label: "Forward", positionType: { id: "1", name: "Attacker" } },
      preferredFoot: 1,
      rank: 1,
      shieldUrl: "",
      skillMoves: 5,
      stats: {},
      team: { id: 2, label: "Al Nassr", imageUrl: "", isPopular: true },
      weakFootAbility: 4,
      weight: 83
    }
  ];
  
  // Crear la instancia de la clase PlayerSearch
  const playerSearch = new PlayerSearch(players);
  
  // Filtrar jugadores por overallRating dentro de un rango y por posición
  const filteredPlayers = playerSearch.search(
    "FW",         // Filtro por posición (por ejemplo, "FW" para delanteros)
    [30, 40],     // Rango de edad (por ejemplo, jugadores de entre 30 y 40 años)
    [90, 95]      // Rango de overallRating (por ejemplo, entre 90 y 95)
  );
  
  // Mostrar el resultado filtrado
  console.log(filteredPlayers);
  */