// type VsSplits = {
//   season: string;
//   stat: Stat;
//   opponent: Opponent;
//   opponentDivision: Opponent;
//   opponentConference: Opponent;
// };

// type Opponent = {
//   id: number;
//   name: string;
//   link: string;
// };

// type Stat = {
//   timeOnIce: string;
//   assists: number;
//   goals: number;
//   pim: number;
//   shots: number;
//   games: number;
//   hits: number;
//   powerPlayGoals: number;
//   powerPlayPoints: number;
//   powerPlayTimeOnIce: string;
//   evenTimeOnIce: string;
//   penaltyMinutes: string;
//   faceOffPct: number;
//   faceOffWins: number;
//   shotPct: number;
//   gameWinningGoals: number;
//   overTimeGoals: number;
//   shortHandedGoals: number;
//   shortHandedPoints: number;
//   shortHandedTimeOnIce: string;
//   blocked: number;
//   plusMinus: number;
//   points: number;
//   shifts: number;
//   timeOnIcePerGame: string;
//   evenTimeOnIcePerGame: string;
//   shortHandedTimeOnIcePerGame: string;
//   powerPlayTimeOnIcePerGame: string;
// };

type VsTeamStats = {
  copyright: string;
  stats: StatElement[];
};

type StatElement = {
  type: Type;
  splits: VsSplits[];
};

type VsSplits = {
  season: string;
  stat: SplitStat;
  opponent: Opponent;
  opponentDivision: Opponent;
  opponentConference: Opponent;
};

type Opponent = {
  id: number;
  name: string;
  link: string;
};

type SplitStat = {
  timeOnIce: string;
  assists: number;
  goals: number;
  hits: number;
  pim: number;
  shots: number;
  games: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  powerPlayTimeOnIce: string;
  evenTimeOnIce: string;
  penaltyMinutes: string;
  faceOffPct: number;
  faceOffWins: number;
  shotPct?: number | ShotPctEnum;
  gameWinningGoals: number;
  overTimeGoals: number;
  shortHandedGoals: number;
  shortHandedPoints: number;
  shortHandedTimeOnIce: string;
  blocked: number;
  plusMinus: number;
  points: number;
  shifts: number;
  timeOnIcePerGame: string;
  evenTimeOnIcePerGame: string;
  shortHandedTimeOnIcePerGame: string;
  powerPlayTimeOnIcePerGame: string;
};

enum ShotPctEnum {
  The00N = "0.0n_____",
}
