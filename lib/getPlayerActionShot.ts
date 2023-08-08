import axios from "axios";

const getPlayerActionShot = async (playerId: string, teamId: string) => {

  if (!teamId) return 'https://cms.nhl.bamgrid.com/images/actionshots/nhl_default_contemporary.jpg'

  try {
    const response = await axios.get(`https://cms.nhl.bamgrid.com/images/actionshots/${playerId}@2x.jpg`)

    return `https://cms.nhl.bamgrid.com/images/actionshots/${playerId}@2x.jpg`;
  } catch (error) {
    return `https://cms.nhl.bamgrid.com/images/arena/default/${teamId}@2x.jpg`
  }

}

export default getPlayerActionShot;