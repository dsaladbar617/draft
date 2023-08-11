const processDetailedStats = (playerData: NHLPlayerPeople, currentLeauge: string, seasonType: string) => {

  let index = -1;
  let careerIndex = -1;
  if (seasonType === "Regular Season") {
    index = 0;
    careerIndex = 2;
  } else if (seasonType === "Playoffs") {
    index = 1;
    careerIndex = 3;
  }

  const playerPosition = playerData?.primaryPosition?.abbreviation;
  const yearByYearStats = playerData?.stats[index];

  const filteredStats = yearByYearStats?.splits.filter((elem) => {
    if (currentLeauge !== "all")
      return elem.league?.name === currentLeauge ? elem : null;

    return elem;
  });

  const careerStats =
    playerPosition === "G"
      ? (playerData?.stats[careerIndex]?.splits[0]?.stat as GoalieSplitStats)
      : (playerData?.stats[careerIndex]?.splits[0]?.stat as PlayerSplitStats);

  const leagues = playerData?.stats[0].splits.map((elem) => {
    return elem.league?.name;
  });
  const uniqueLeagues = [...new Set(leagues)];

  return {filteredStats, careerStats, uniqueLeagues}
}

export default processDetailedStats;