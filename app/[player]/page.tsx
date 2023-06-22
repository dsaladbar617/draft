'use client';

import useFetchPlayerWithStats from '@/lib/fetchPlayerWithStats';
import useFetchProspect from '@/lib/fetchProspect';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Fragment } from "react";

const Page = ({}) => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { data: prospect } = useFetchProspect(id!);

  const fetchedPlayer = prospect?.prospects[0].nhlPlayerId;

  // const player = useFetchPlayerWithStats(fetchedPlayer!.toString());
  const { data: player1, isLoading } = useQuery({
    queryKey: ["player", fetchedPlayer],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${fetchedPlayer}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason,careerPlayoffs,statsSingleSeason`
      );

      return data as NHLPlayer;
    },
    enabled: !!fetchedPlayer,
  });

  const headers = [
    "Season",
    "GP",
    "G",
    "A",
    "P",
    "+/-",
    "PIM",
    "PPG",
    "PPP",
    "SHG",
    "SHP",
    "GWG",
    "OTG",
    "S",
    "S%",
  ];

  const playerData = player1?.people?.[0];

  const careerStats = playerData?.stats?.slice(2);

  if (isLoading) return <h1>Is Loading...</h1>;

  return (
    <div>
      <h1>Name: {playerData?.fullName}</h1>
      <h2>Height: {playerData?.height}</h2>
      <h2>Weight: {playerData?.weight}</h2>
      <h2>Born: {playerData?.birthDate}</h2>
      <h2>
        Birthplace: {`${playerData?.birthCity}, ${playerData?.birthCountry}`}
      </h2>
      <h2>Shoots: {playerData?.shootsCatches}</h2>
      {/* <h2>Draft: {playerData?.}</h2> */}
      <div>
        <h1>Stats</h1>
        <div className="table mx-auto mt-10 table-responsive rounded-md text-center p-4 w-2/3 border-collapse">
          <div className="table-header-group bg-slate-500 rounded-lg p-4">
            <div className="table-row rounded">
              {headers.map((header: string, index: number) => (
                <div
                  key={header}
                  className={`table-cell p-4 ${
                    index === headers.length - 1 ? "rounded-tr-lg" : null
                  } ${index === 0 ? "rounded-tl-lg" : null}`}
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          <div className="table-row-group divide-y divide-gray-300">
            {careerStats?.map((stat) => {
              return (
                <div className="table-row" key={stat.type.displayName}>
                  <div className="table-cell p-4">{stat.type.displayName}</div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.games}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.goals}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.assists}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.points}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.plusMinus}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.penaltyMinutes}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.powerPlayGoals}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.powerPlayPoints}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.shortHandedGoals}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.shortHandedPoints}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.gameWinningGoals}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.overTimeGoals}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.shots}
                  </div>
                  <div className="table-cell p-4">
                    {stat.splits?.[0]?.stat?.shotPct}
                  </div>
                </div>
              );
            })}
            {/* {playerData?.stats?.[3].splits?.length ? (
              <div className="table-row">
                <div className="table-cell p-4">Career Playoffs</div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.games}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.goals}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.assists}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.points}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.plusMinus}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.penaltyMinutes}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.powerPlayGoals}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.powerPlayPoints}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.shortHandedGoals}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.shortHandedPoints}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.gameWinningGoals}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.overTimeGoals}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.shots}
                </div>
                <div className="table-cell p-4">
                  {playerData?.stats?.[3].splits?.[0].stat.shotPct}
                </div>
              </div>
            ) : null} */}
            {/* <div className="table-row">
              <div className="table-cell p-4">NHL Career</div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.games}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.goals}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.assists}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.points}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.plusMinus}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.penaltyMinutes}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.powerPlayGoals}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.powerPlayPoints}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.shortHandedGoals}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.shortHandedPoints}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.gameWinningGoals}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.overTimeGoals}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.shots}
              </div>
              <div className="table-cell p-4">
                {playerData?.stats?.[2].splits?.[0].stat.shotPct}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
