const processSummaryHeaders = (playerPosition: string): header[] => {
  if (playerPosition === "G") {
    return [
      { label: "GP", dataProp: "games" },
      { label: "W", dataProp: "wins" },
      { label: "L", dataProp: "losses" },
      { label: "OT", dataProp: "ot" },
      { label: "GAA", dataProp: "goalAgainstAverage" },
      { label: "SV%", dataProp: "savePercentage" },
    ];
  } else {
    return [
      { label: "GP", dataProp: "games" },
      { label: "G", dataProp: "goals" },
      { label: "A", dataProp: "assists" },
      { label: "P", dataProp: "points" },
      { label: "+/-", dataProp: "plusMinus" },
    ];
  }
}

export default processSummaryHeaders;