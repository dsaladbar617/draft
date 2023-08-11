type Drafts = {
  copyright: string;
  drafts: Draft[];
};

type Draft = {
  draftYear: number;
  rounds: Round[];
};

type Round = {
  roundNumber: number;
  round: string;
  picks: DraftPick[];
};

type DraftPick = {
  year: number;
  round: string;
  pickOverall: number;
  pickInRound: number;
  team: Team;
  prospect: Prospect;
};

type Team = {
  id: number;
  name: string;
  link: string;
};

type TeamWithRoster = Team & {
  roster: TeamRoster;
};

type Prospect = {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  height: string;
  weight: number;
  shootsCatches: string;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  nhlPlayerId?: number;
  draftStatus: string;
  prospectCategory: {
    id: number;
    shortName: string;
    name: string;
  };
  amateurTeam: {
    name: string;
    link: string;
  };
  amateurLeague: {
    name: string;
    link: string;
  };
  ranks: {};
};

type NHLPlayer = {
  copyright: string;
  people: NHLPlayerPeople[];
};

type NHLPlayerPeople = {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthCountry: string;
  birthStateProvince?: string;
  nationality: string;
  height: string;
  weight: number;
  active: true;
  alternateCaptain: false;
  captain: true;
  rookie: false;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: {
    id: number;
    name: string;
    link: string;
  };
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };

  stats: Stats[];
}

type Stats = {
  type: {
    displayName: string;
    gameType: null;
  };
  season?: string;
  splits: Splits[];
};

type GoalieSplitStats = {
  timeOnIce?: string;
  ot?: number;
  shutouts?: number;
  ties?: number;
  wins?: number;
  losses?: number;
  saves?: number;
  powerPlaySaves?: number;
  shortHandedSaves?: number;
  evenSaves?: number;
  shortHandedShots?: number;
  evenShots?: number;
  powerPlayShots?: number;
  savePercentage: number;
  goalAgainstAverage: number;
  games: number;
  gamesStarted?: number;
  shotsAgainst?: number;
  goalsAgainst?: number;
  powerPlaySavePercentage?: number;
  shortHandedSavePercentage?: number;
  evenStrengthSavePercentage?: number;
  seconds?: number;
};

type PlayerSplitStats = {
  timeOnIce?: string;
  assists: number;
  goals: number;
  pim: number;
  shots?: number;
  games: number;
  hits?: number;
  powerPlayGoals?: number;
  powerPlayPoints?: number;
  powerPlayTimeOnIce?: string;
  evenTimeOnIce?: string;
  penaltyMinutes?: string;
  faceOffPct?: number;
  shotPct?: number;
  gameWinningGoals?: number;
  overTimeGoals?: number;
  shortHandedGoals?: number;
  shortHandedPoints?: number;
  shortHandedTimeOnIce?: string;
  blocked?: number;
  plusMinus?: number;
  points: number;
  shifts?: number;
};

type SplitStats = {
  timeOnIce?: string;
  assists: number;
  goals: number;
  pim: number;
  shots?: number;
  games: number;
  hits?: number;
  powerPlayGoals?: number;
  powerPlayPoints?: number;
  powerPlayTimeOnIce?: string;
  evenTimeOnIce?: string;
  penaltyMinutes?: string;
  faceOffPct?: number;
  shotPct?: number;
  gameWinningGoals?: number;
  overTimeGoals?: number;
  shortHandedGoals?: number;
  shortHandedPoints?: number;
  shortHandedTimeOnIce?: string;
  blocked?: number;
  plusMinus: number;
  points: number;
  shifts?: number;
  timeOnIcePerGame?: string;
  evenTimeOnIcePerGame?: string;
  shortHandedTimeOnIcePerGame?: string;
  powerPlayTimeOnIcePerGame?: string;
  ot?: number;
  shutouts?: number;
  ties?: number;
  wins?: number;
  losses?: number;
  saves?: number;
  powerPlaySaves?: number;
  shortHandedSaves?: number;
  evenSaves?: number;
  powerPlayShots?: number;
  savePercentage?: number;
  goalAgainstAverage?: number;
  gamesStarted?: number;
  shotsAgainst?: number;
  goalsAgainst?: number;
  powerPlaySavePercentage?: number;
  shortHandedSavePercentage?: number;
  evenStrengthSavePercentage?: number;
};

type Splits = {
  season?: string;
  stat?: PlayerSplitStats | GoalieSplitStats;
  team?: {
    name: string;
    link: string;
  };
  league?: {
    name: string;
    link: string;
  };
  sequenceNumber?: number;
};

type FetchedProspect = {
  copyright: string;
  prospects: Prospect[];
};

type header = {
  label: string;
  dataProp: string;
};