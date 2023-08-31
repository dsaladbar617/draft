export type Standings = {
  copyright: string;
  records:   Record[];
}

export type Record = {
  standingsType: string;
  league:        League;
  conference:    Conference;
  teamRecords:   TeamRecord[];
  division?:     RecordDivision;
}

export type Conference = {
  id:           number;
  name:         string;
  link:         string;
  abbreviation: string;
  shortName:    string;
  active:       boolean;
}

export type RecordDivision = {
  id:           number;
  name:         Name;
  nameShort:    NameShort;
  link:         Link;
  abbreviation: Abbreviation;
  conference:   League;
  active:       boolean;
}

export type Abbreviation = "M" | "A" | "P" | "C";

export type League = {
  id?:  number;
  name: string;
  link: string;
}

export type Link = "/api/v1/divisions/18" | "/api/v1/divisions/17" | "/api/v1/divisions/15" | "/api/v1/divisions/16";

export type Name = "Metropolitan" | "Atlantic" | "Pacific" | "Central";

export type NameShort = "Metro" | "ATL" | "PAC" | "CEN";

export type TeamRecord = {
  team:               Team;
  leagueRecord:       LeagueRecordElement;
  regulationWins:     number;
  goalsAgainst:       number;
  goalsScored:        number;
  points:             number;
  divisionRank:       string;
  divisionL10Rank:    string;
  divisionRoadRank:   string;
  divisionHomeRank:   string;
  conferenceRank:     string;
  conferenceL10Rank:  string;
  conferenceRoadRank: string;
  conferenceHomeRank: string;
  leagueRank:         string;
  leagueL10Rank:      string;
  leagueRoadRank:     string;
  leagueHomeRank:     string;
  wildCardRank:       string;
  row:                number;
  gamesPlayed:        number;
  streak:             Streak;
  clinchIndicator?:   string;
  pointsPercentage:   number;
  ppDivisionRank:     string;
  ppConferenceRank:   string;
  ppLeagueRank:       string;
  records:            Records;
  lastUpdated:        Date;
}

export type LeagueRecordElement = {
  wins:   number;
  losses: number;
  ot?:    number;
  type:   Type;
}

export type Type = "league" | "home" | "away" | "shootOuts" | "lastTen";

export type Records = {
  overallRecords: LeagueRecordElement[];
}

export type Streak = {
  streakType:   StreakType;
  streakNumber: number;
  streakCode:   string;
}

export type StreakType = "wins" | "losses" | "ot";

export type Away = {
  leagueRecord: LeagueRecordElement;
  score:        number;
  team:         Team;
}

export type Teams = {
  away: Away;
  home: Away;
}

export type Game = {
  gamePk:   number;
  link:     string;
  gameType: GameType;
  season:   string;
  gameDate: Date;
  status:   Status;
  teams:    Teams;
  venue:    League;
  content:  Content;
}

export type DateElement = {
  date:         Date;
  totalItems:   number;
  totalEvents:  number;
  totalGames:   number;
  totalMatches: number;
  games:        Game[];
  events:       any[];
  matches:      any[];
}

export type Schedule = {
  totalItems:   number;
  totalEvents:  number;
  totalGames:   number;
  totalMatches: number;
  metaData:     MetaData;
  dates:        DateElement[];
}

export type Team = {
  id:                number;
  name:              string;
  link:              string;
  venue:             Venue;
  abbreviation:      string;
  teamName:          string;
  locationName:      string;
  firstYearOfPlay:   string;
  division:          TeamDivision;
  conference:        League;
  franchise:         Franchise;
  nextSchedule?:     Schedule;
  previousSchedule?: Schedule;
  shortName:         string;
  officialSiteUrl:   string;
  franchiseId:       number;
  active:            boolean;
}

export type Content = {
  link: string;
}

export type GameType = "PR" | "P" | "R";

export type Status = {
  abstractGameState: AbstractGameState;
  codedGameState:    string;
  detailedState:     DetailedState;
  statusCode:        string;
  startTimeTBD:      boolean;
}

export type AbstractGameState = "Preview" | "Final";

export type DetailedState = "Scheduled" | "Final";

export type MetaData = {
  timeStamp: TimeStamp;
}

export type TimeStamp = "20230829_195718";

export type TeamDivision = {
  id:           number;
  name:         Name;
  nameShort:    NameShort;
  link:         Link;
  abbreviation: Abbreviation;
}

export type Franchise = {
  franchiseId: number;
  teamName:    string;
  link:        string;
}

export type Venue = {
  name:     string;
  link:     string;
  city:     string;
  timeZone: TimeZone;
  id?:      number;
}

export type TimeZone = {
  id:     ID;
  offset: number;
  tz:     Tz;
}

export type ID = "America/New_York" | "America/Chicago" | "America/Toronto" | "America/Los_Angeles" | "America/Winnipeg" | "America/Vancouver" | "America/Phoenix" | "America/Detroit" | "America/Montreal" | "America/Denver" | "America/Edmonton";

export type Tz = "EDT" | "CDT" | "PDT" | "MST" | "MDT";
