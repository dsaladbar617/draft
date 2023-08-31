type StandingsLegendProps = {};

const StandingsLegend = ({}: StandingsLegendProps) => {
  return (
    <div>
      <h2 className="text-3xl">Legend</h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' >
        <li>
          <span>z</span> - Clinched Conference
        </li>
        <li>
          <span>x</span> - Clinched Playoff Spot
        </li>
        <li>
          <span>y</span> - Clinched Division
        </li>
        <li>
          <span>p</span> - President`&apos;`s Trophy
        </li>
        <li>
          <span>GP</span> - Games Played
        </li>
        <li>
          <span>W</span> - Wins (worth two points)
        </li>
        <li>
          <span>L</span> - Losses (worth zero points)
        </li>
        <li>
          <span>OT</span> - OT/Shootout losses (worth one point)
        </li>
        <li>
          <span>PTS</span> - Points
        </li>
        <li>
          <span>ROW</span> - Regulation plus Overtime Wins
        </li>
        <li>
          <span>GF</span> - Goals For
        </li>
        <li>
          <span>GA</span> - Goals Against
        </li>
        <li>
          <span>DIFF</span> - Goal Differential
        </li>
        <li>
          <span>HOME</span> - Home Record
        </li>
        <li>
          <span>AWAY</span> - Away Record
        </li>
        <li>
          <span>S/O</span> - Record in games decided by Shootout
        </li>
        <li>
          <span>L10</span> - Record in last ten games
        </li>
        <li>
          <span>STRK</span> - Streak
        </li>
      </ul>
    </div>
  );
};

export default StandingsLegend;
