const getReducedPlayerStats = (stats: Splits[]) : PlayerSplitStats | null => {

  if (stats.length > 0) {
    const reducedStats = stats?.reduce((acc, curr) => {

        const player = curr.stat as PlayerSplitStats;
        const gamesPlayed = player.games;
        const goals = player.goals;
        const assists = player.assists;
        const points = player.points;
        const plusMinus = player.plusMinus;
        const pim = player.pim;
        const ppg = player.powerPlayGoals;
        const ppp = player.powerPlayPoints;
        const shg = player.shortHandedGoals;
        const shp = player.shortHandedPoints;
        const gwg = player.gameWinningGoals;
        const otg = player.overTimeGoals;
        const shots = player.shots;
        const shotPct = player.shotPct;
        const faceoffPct = player.faceOffPct;

        const playerAcc = acc.stat as PlayerSplitStats;

        return {
          stat: {
            games: playerAcc.games + gamesPlayed!,
            goals: playerAcc.goals + goals!,
            assists: playerAcc.assists + assists!,
            points: playerAcc.points + points!,
            plusMinus: playerAcc.plusMinus! + plusMinus!,
            pim: playerAcc.pim + pim!,
            powerPlayGoals: playerAcc.powerPlayGoals! + ppg!,
            powerPlayPoints: playerAcc.powerPlayPoints! + ppp!,
            shortHandedGoals: playerAcc.shortHandedGoals! + shg!,
            shortHandedPoints: playerAcc.shortHandedPoints! + shp!,
            gameWinningGoals: playerAcc.gameWinningGoals! + gwg!,
            overTimeGoals: playerAcc.overTimeGoals! + otg!,
            shots: playerAcc.shots! + shots!,
            shotPct: playerAcc.shotPct! + shotPct!,
            faceOffPct: playerAcc.faceOffPct! + faceoffPct!,
          },
        };
      });

      return reducedStats?.stat as PlayerSplitStats;
  }

  return null;
}

export default getReducedPlayerStats;