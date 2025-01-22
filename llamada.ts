// main.ts
import axios from 'axios';
import https from 'https';
import {
  Position,
  Ability,
  Stat,
  PlayerStats,
  Nationality,
  Gender,
  Team,
  Player,
  ApiResponse
} from './datos.model';

// Crear el array para almacenar los datos
let bbdd: Player[] = []; // Especificar el tipo de bbdd como Player[]

export function mapPlayer(data: any): Player {
  return {
    id: data.id,
    commonName: data.commonName,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
    birthdate: data.birthdate,
    gender: { id: data.gender.id, label: data.gender.label }, // Asumiendo que hay un objeto gender
    height: data.height,
    leagueName: data.leagueName,
    nationality: { id: data.nationality.id, label: data.nationality.label, imageUrl: data.nationality.imageUrl },
    overallRating: data.overallRating,
    playerAbilities: data.playerAbilities.map((ability: any) => ({
      id: ability.id,
      label: ability.label,
      description: ability.description,
      imageUrl: ability.imageUrl,
      type: { id: ability.type.id, label: ability.type.label }
    })),
    position: {
      id: data.position.id,
      shortLabel: data.position.shortLabel,
      label: data.position.label,
      positionType: { id: data.position.positionType.id, name: data.position.positionType.name }
    },
    preferredFoot: data.preferredFoot,
    rank: data.rank,
    shieldUrl: data.shieldUrl,
    skillMoves: data.skillMoves,
    stats: {
      acceleration: { value: data.stats.acceleration.value, diff: data.stats.acceleration.diff },
      aggression: { value: data.stats.aggression.value, diff: data.stats.aggression.diff },
      agility: { value: data.stats.agility.value, diff: data.stats.agility.diff },
      balance: { value: data.stats.balance.value, diff: data.stats.balance.diff },
      ballControl: { value: data.stats.ballControl.value, diff: data.stats.ballControl.diff },
      composure: { value: data.stats.composure.value, diff: data.stats.composure.diff },
      crossing: { value: data.stats.crossing.value, diff: data.stats.crossing.diff },
      curve: { value: data.stats.curve.value, diff: data.stats.curve.diff },
      def: { value: data.stats.def.value, diff: data.stats.def.diff },
      defensiveAwareness: { value: data.stats.defensiveAwareness.value, diff: data.stats.defensiveAwareness.diff },
      dri: { value: data.stats.dri.value, diff: data.stats.dri.diff },
      dribbling: { value: data.stats.dribbling.value, diff: data.stats.dribbling.diff },
      finishing: { value: data.stats.finishing.value, diff: data.stats.finishing.diff },
      freeKickAccuracy: { value: data.stats.freeKickAccuracy.value, diff: data.stats.freeKickAccuracy.diff },
      gkDiving: { value: data.stats.gkDiving.value, diff: data.stats.gkDiving.diff },
      gkHandling: { value: data.stats.gkHandling.value, diff: data.stats.gkHandling.diff },
      gkKicking: { value: data.stats.gkKicking.value, diff: data.stats.gkKicking.diff },
      gkPositioning: { value: data.stats.gkPositioning.value, diff: data.stats.gkPositioning.diff },
      gkReflexes: { value: data.stats.gkReflexes.value, diff: data.stats.gkReflexes.diff },
      headingAccuracy: { value: data.stats.headingAccuracy.value, diff: data.stats.headingAccuracy.diff },
      interceptions: { value: data.stats.interceptions.value, diff: data.stats.interceptions.diff },
      jumping: { value: data.stats.jumping.value, diff: data.stats.jumping.diff },
      longPassing: { value: data.stats.longPassing.value, diff: data.stats.longPassing.diff },
      longShots: { value: data.stats.longShots.value, diff: data.stats.longShots.diff },
      pac: { value: data.stats.pac.value, diff: data.stats.pac.diff },
      pas: { value: data.stats.pas.value, diff: data.stats.pas.diff },
      penalties: { value: data.stats.penalties.value, diff: data.stats.penalties.diff },
      phy: { value: data.stats.phy.value, diff: data.stats.phy.diff },
      positioning: { value: data.stats.positioning.value, diff: data.stats.positioning.diff },
      reactions: { value: data.stats.reactions.value, diff: data.stats.reactions.diff },
      sho: { value: data.stats.sho.value, diff: data.stats.sho.diff },
      shortPassing: { value: data.stats.shortPassing.value, diff: data.stats.shortPassing.diff },
      shotPower: { value: data.stats.shotPower.value, diff: data.stats.shotPower.diff },
      slidingTackle: { value: data.stats.slidingTackle.value, diff: data.stats.slidingTackle.diff },
      sprintSpeed: { value: data.stats.sprintSpeed.value, diff: data.stats.sprintSpeed.diff },
      stamina: { value: data.stats.stamina.value, diff: data.stats.stamina.diff },
      standingTackle: { value: data.stats.standingTackle.value, diff: data.stats.standingTackle.diff },
      strength: { value: data.stats.strength.value, diff: data.stats.strength.diff },
      vision: { value: data.stats.vision.value, diff: data.stats.vision.diff },
      volleys: { value: data.stats.volleys.value, diff: data.stats.volleys.diff },
    },
    team: {
      id: data.team.id,
      label: data.team.label,
      imageUrl: data.team.imageUrl,
      isPopular: data.team.isPopular
    },
    weakFootAbility: data.weakFootAbility,
    weight: data.weight,
  };
}

export function obtenerDatosEA(offset: number): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    axios.get(`https://drop-api.ea.com/rating/ea-sports-fc?locale=es&limit=100&gender=0&offset=${offset}`, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Origin': 'https://www.ea.com',
        'Referer': 'https://www.ea.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'X-Feature': '{}'
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false // Evitar el error de SSL
      })
    })
      .then((response: { data: any | PromiseLike<any>; }) => {
        const players = response.data.items.map(mapPlayer); // Mapear la respuesta a Player[]
        bbdd.push(...players); // Añadir los jugadores al array bbdd
        resolve(response.data); // Resuelve la promesa con la respuesta
      })
      .catch((error: any) => {
        console.error('Error al realizar la solicitud:', error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

// Función para ejecutar las llamadas en un bucle
export function obtenerTodosLosDatos() {
  const promises: Promise<any>[] = []; // Crear un array para almacenar las promesas

  for (let i = 0; i <= 15900; i += 100) {
    promises.push(obtenerDatosEA(i).then(datos => {
      // Puedes descomentar esta línea para ver el progreso
      // console.log(`Iteración: ${i}, Total de elementos: ${bbdd.length}`);
    }));
  }

  return Promise.all(promises) // Espera a que todas las promesas se resuelvan
    .then(() => {
      console.log('Total de elementos en bbdd:', bbdd.length); // Imprimir la longitud total final
      return bbdd;
      // Aquí puedes trabajar con los datos de bbdd
      // Por ejemplo, podrías extraer un conjunto específico de datos:
   
      //console.log('Datos extraídos:', bbdd);
    });
    
    
}

// Llamar a la función para obtener todos los datos



