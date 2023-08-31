'use client';
import StandingsSelect from "@/components/StandingsSelect";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";

type layoutProps = {};

// export const metadata = {
//   title: "Standings",
//   description: "Standings for most current NHL Season",
// };

const Layout = ({ children }: { children: React.ReactNode }) => {
  const segment = useSelectedLayoutSegments();
  console.log(segment[1]);


  return (
    <div>
      <div className="h-[75px] flex items-center">
        <h1 className="text-3xl ml-[2vw]">Standings</h1>
      </div>
      <div></div>
      <div className="h-[65px]  flex  items-center border-t border-black">
        <StandingsSelect />
      </div>
      <div className=" flex  items-center border-y border-black">
        <ul className="flex flex-row gap-2 ml-[2vw]">
          <Link className='py-[24px] hover:border-b-4 border-black' href={`/standings/${segment[0]}/division`}>DIVISION</Link>
          <Link className={`${segment[1] === 'wildcard' ? 'border-b-4  ' : ''} py-[24px] border-black hover:border-b-4`} href={`/standings/${segment[0]}/wildcard`}>WILD CARD</Link>
          <Link className='py-[24px] hover:border-b-4 border-black' href={`/standings/${segment[0]}/conference`}>CONFERENCE</Link>
          <Link className='py-[24px] hover:border-b-4 border-black' href={`/standings/${segment[0]}/league`}>LEAGUE</Link>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Layout;
