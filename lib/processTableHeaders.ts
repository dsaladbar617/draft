const processTableHeaders = (playerPosition: string): header[] => {
  if (playerPosition === "G") {
    return [
      { label: "Season", dataProp: "season" },
      { label: "Team", dataProp: "team.name" },
      { label: "GP", dataProp: "games" },
      { label: "GS", dataProp: "gamesStarted" },
      { label: "W", dataProp: "wins" },
      { label: "L", dataProp: "losses" },
      { label: "T", dataProp: "ties" },
      { label: "OT", dataProp: "ot" },
      { label: "SA", dataProp: "shotsAgainst" },
      { label: "GA", dataProp: "goalsAgainst" },
      { label: "GAA", dataProp: "goalAgainstAverage" },
      { label: "SV%", dataProp: "savePercentage" },
      { label: "SO", dataProp: "shutouts" },
      { label: "MIN", dataProp: "timeOnIce" },
    ];
  } else {
    return [
      { label: "Season", dataProp: "season" },
      { label: "Team", dataProp: "team.name" },
      { label: "GP", dataProp: "games" },
      { label: "G", dataProp: "goals" },
      { label: "A", dataProp: "assists" },
      { label: "P", dataProp: "points" },
      { label: "+/-", dataProp: "plusMinus" },
      { label: "PIM", dataProp: "penaltyMinutes" },
      { label: "PPG", dataProp: "powerPlayGoals" },
      { label: "PPP", dataProp: "powerPlayPoints" },
      { label: "SHG", dataProp: "shortHandedGoals" },
      { label: "SHP", dataProp: "shortHandedPoints" },
      { label: "GWG", dataProp: "gameWinningGoals" },
      { label: "OTG", dataProp: "overTimeGoals" },
      { label: "S", dataProp: "shots" },
      { label: "S%", dataProp: "shotPct" },
      { label: "FO%", dataProp: "faceOffPct" },
    ];
  }
}

export default processTableHeaders;