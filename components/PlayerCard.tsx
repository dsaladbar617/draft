interface PlayerCardProps {
  player: NHLPlayer;
}

const PlayerCard = ({player}: PlayerCardProps) => {

  const playerData = player?.people?.[0]

  return <div className=" w-fit text-lg block">
  <h3>Name: {playerData?.fullName}</h3>
  <h3>Height: {playerData?.height}</h3>
  <h3>Weight: {playerData?.weight}</h3>
  <h3>Born: {playerData?.birthDate}</h3>
  <h3>
    Birthplace:
    {` ${playerData?.birthCity}, ${
      playerData?.birthStateProvince !== undefined
        ? `${playerData?.birthStateProvince},`
        : ""
    } ${playerData?.birthCountry}`}
  </h3>
  <h3>
    {playerData.primaryPosition.abbreviation !== "G" ? "Shoots" : "Catches"}:{" "}
    {playerData?.shootsCatches}
  </h3>
</div>
}

export default PlayerCard