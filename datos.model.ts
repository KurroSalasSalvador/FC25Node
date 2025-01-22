export interface Position {
    id: string;
    shortLabel: string;
    label: string;
    positionType: {
      id: string;
      name: string;
    };
  }
  
  export  interface Ability {
    id: string;
    label: string;
    description: string;
    imageUrl: string;
    type: {
      id: string;
      label: string;
    };
  }
  
  export  interface Stat {
    value: number;
    diff: number;
  }
  
  export interface PlayerStats {
    acceleration: Stat;
    aggression: Stat;
    agility: Stat;
    balance: Stat;
    ballControl: Stat;
    composure: Stat;
    crossing: Stat;
    curve: Stat;
    def: Stat;
    defensiveAwareness: Stat;
    dri: Stat;
    dribbling: Stat;
    finishing: Stat;
    freeKickAccuracy: Stat;
    gkDiving: Stat;
    gkHandling: Stat;
    gkKicking: Stat;
    gkPositioning: Stat;
    gkReflexes: Stat;
    headingAccuracy: Stat;
    interceptions: Stat;
    jumping: Stat;
    longPassing: Stat;
    longShots: Stat;
    pac: Stat;
    pas: Stat;
    penalties: Stat;
    phy: Stat;
    positioning: Stat;
    reactions: Stat;
    sho: Stat;
    shortPassing: Stat;
    shotPower: Stat;
    slidingTackle: Stat;
    sprintSpeed: Stat;
    stamina: Stat;
    standingTackle: Stat;
    strength: Stat;
    vision: Stat;
    volleys: Stat;
  }
  
  export interface Nationality {
    id: number;
    label: string;
    imageUrl: string;
  }
  
  export interface Gender {
    id: number;
    label: string;
  }
  
  export interface Team {
    id: number;
    label: string;
    imageUrl: string;
    isPopular: boolean;
  }
  
  export  interface Player {
    id: number;
    commonName: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    birthdate: string;
    gender: Gender;
    height: number;
    leagueName: string;
    nationality: Nationality;
    overallRating: number;
    playerAbilities: Ability[];
    position: Position;
    preferredFoot: number;
    rank: number;
    shieldUrl: string;
    skillMoves: number;
    stats: PlayerStats;
    team: Team;
    weakFootAbility: number;
    weight: number;
  }
  
  export interface ApiResponse {
    data: Item;
  }

  export interface Item {
    items: Player
  }
 
  