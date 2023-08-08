import axios from "axios";

const getPlayerHeadshot = async (playerId: string) => {

  try {
    const response = await axios.get(`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}@2x.jpg`)

    return `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}@2x.jpg`;
  } catch (error) {
    return `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/skater@2x.jpg`
  }


}

export default getPlayerHeadshot;