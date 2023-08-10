const getReducedGoalieStats = (stats: Splits[]) : GoalieSplitStats | null => {

  if (stats.length > 0) {
  const reducedStats =
    stats.reduce((acc, curr) => {
      const goalie = curr.stat as GoalieSplitStats;
      const gamesPlayed = goalie.games;
      const gamesStarted = goalie.gamesStarted;
      const wins = goalie.wins;
      const losses = goalie.losses;
      const ties = goalie.ties;
      const ot = goalie.ot;
      const shotsAgainst = goalie.shotsAgainst;
      const goalsAgainst = goalie.goalsAgainst;
      const goalsAgainstAverage = goalie.goalAgainstAverage;
      const saves = goalie.saves;
      const savePercentage = (Math.floor(goalie.savePercentage * 1000) /1000);
      const shutouts = goalie.shutouts;
      const minutes = goalie.timeOnIce;
      let seconds = 0;
      if (minutes) {
        console.log(savePercentage)
        const minutesSplit = minutes!.split(':');
        seconds = parseInt(minutesSplit[0]) * 60 + parseInt(minutesSplit[1]);
      }
      const goalieAcc = acc.stat as GoalieSplitStats;
      return {
        stat: {
          games: goalieAcc.games + gamesPlayed,
          gamesStarted: goalieAcc.gamesStarted! + gamesStarted!,
          wins: goalieAcc.wins! + wins!,
          losses: goalieAcc.losses! + losses!,
          ties: goalieAcc.ties! + ties!,
          ot: goalieAcc.ot! + ot!,
          shotsAgainst: goalieAcc.shotsAgainst! + shotsAgainst!,
          goalsAgainst: goalieAcc.goalsAgainst! + goalsAgainst!,
          goalAgainstAverage: goalieAcc.goalAgainstAverage! + goalsAgainstAverage!,
          saves: goalieAcc.saves! + saves!,
          savePercentage: goalieAcc.savePercentage! + savePercentage!,
          shutouts: goalieAcc.shutouts! + shutouts!,
          seconds: goalieAcc.seconds! + seconds!
        },
      };
    }, {
      stat: {
        games: 0,
        gamesStarted: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        ot: 0,
        shotsAgainst: 0,
        goalsAgainst: 0,
        goalAgainstAverage: 0,
        saves: 0,
        savePercentage: 0,
        shutouts: 0,
        seconds: 0!
      },
    });

    return reducedStats?.stat as GoalieSplitStats;
  }

  return null;

}

export default getReducedGoalieStats;