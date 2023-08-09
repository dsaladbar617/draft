import Image from "next/image";
import PlayerCareerStatTable from "@/components/PlayerCareerStatTable";
import getProspect from "@/lib/getProspect";
import getPlayerWithStats from "@/lib/getPlayerWithStats";
import PlayerDetailedStatsTable from "@/components/PlayerDetailedStatsTable";
import getPlayerHeadshot from "@/lib/getPlayerHeadshot";
import getPlayerActionShot from "@/lib/getPlayerActionShot";
import GoalieCareerStatTable from "@/components/GoalieCareerStatTable";
import GoalieDetailedStatsTable from "@/components/GoalieDetailedStatsTable";

type PageProps = {
  searchParams: { id: string };
};

const Page = async ({ searchParams }: PageProps) => {
  const id = searchParams.id;

  const fetchedPlayer =
    id.length < 6
      ? (await getProspect(id)).prospects[0].nhlPlayerId?.toString()
      : id;

  if (fetchedPlayer === undefined)
    return <div className="text-center mt-10">Player not found</div>;
  const player = await getPlayerWithStats(fetchedPlayer);
  const playerData = player?.people?.[0];
  const playerPosition = playerData?.primaryPosition?.abbreviation;


  return (
    <div className=" max-w-[1264px] h-max mx-auto bg-slate-700 pb-3 ">
      <div >
        <Image
          src={await getPlayerActionShot(playerData?.id.toString(), playerData?.currentTeam?.id.toString())}
          alt="player action shot"
          width={1264}
          height={390}
          priority
          className="shadow-[inset_-12px_-8px_40px_#46464620]  w-full mx-auto overflow-auto "
        />
        <Image
          alt={`${playerData?.fullName} image`}
          src={await getPlayerHeadshot(playerData?.id.toString())}
          width={160}
          height={160}
          className="mx-auto h-[80px] w-[80px] md:h-[160px] md:w-[160px] -mt-12 md:-mt-24 rounded-full"
          priority
        />
        <h1 className='text-center text-3xl mt-3'>{playerData.fullName}{ playerData.primaryNumber ? ` | # ${playerData.primaryNumber}` : ''}</h1>
        <h2 className='hidden text-center text-xl mt-3 sm:flex flex-row justify-center'>{`${playerData.primaryPosition.abbreviation} | ${playerData.height} | ${playerData.weight} lb ${ playerData.currentAge !== undefined ? `| Age: ${playerData?.currentAge} | ` : ''}` }
        {
        playerData.currentTeam?.id ?
        <span className="flex flex-row flex-nowrap">
          <Image src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${playerData.currentTeam.id}.svg`} alt="team logo" height={35} width={35} />&nbsp;{playerData.currentTeam.name}
          </span>
           : null
        }</h2>
      </div>
      <div className="bg-slate-900 rounded-md w-[99%] mx-auto mt-5 ">
        <h1 className="text-2xl text-center w-full pt-3">Stats</h1>
        <div className="p-5 pt-0 rounded-md mx-auto flex flex-wrap justify-center">
          <div className='p-3 pt-0 text-xl block'>
            <h2>Name: {playerData?.fullName}</h2>
            <h2>Height: {playerData?.height}</h2>
            <h2>Weight: {playerData?.weight}</h2>
            <h2>Born: {playerData?.birthDate}</h2>
            <h2>
              Birthplace:
              {` ${playerData?.birthCity}, ${
                playerData?.birthStateProvince !== undefined
                  ? `${playerData?.birthStateProvince},`
                  : ''
              } ${playerData?.birthCountry}`}
            </h2>
            <h2>{playerPosition !== 'G' ? 'Shoots' : 'Catches' }: {playerData?.shootsCatches}</h2>
          </div>
          { playerPosition !== 'G' ?
            <PlayerCareerStatTable player={player!} /> : <GoalieCareerStatTable player={player!} />}
        </div>
      </div>
      <div className='bg-slate-900 rounded-md w-[99%] mx-auto mt-3'>
        {playerPosition !== 'G' ? <PlayerDetailedStatsTable player={player!} /> : <GoalieDetailedStatsTable player={player!} />}
      </div>
    </div>
  );
};

export default Page;
