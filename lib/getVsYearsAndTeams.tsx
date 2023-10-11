const getVsYearsAndTeams = (player: NHLPlayer) => {
  const nhlSeasons = player?.people[0].stats[0].splits.filter((season) => {
    return season.league?.name === "National Hockey League";
  });

  const firstSeasonPlayed =
    player?.people[0].stats[0].splits[0].season?.toString();
  const lastSeasonPlayed =
    player?.people[0].stats[0].splits[
      player?.people[0].stats[0].splits.length - 2
    ].season?.toString();

  return { firstSeasonPlayed, lastSeasonPlayed, nhlSeasons };
};

export default getVsYearsAndTeams;
