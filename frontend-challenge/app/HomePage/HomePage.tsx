/**
 * The HomePage component rendering the header and body of the homepage.
 *
 * @param null
 * @returns {JSX.Element} - The rendered HomePage component.
 * @public
 */

import { useState } from "react";

import { HomePageBody } from "./HomePageBody";
import { HomePageHeader } from "./HomePageHeader";

import { data } from "../../data/mockCourtData";
import { type TennisCourtType } from "../../data/mockCourtData";

export function HomePage() {
  const [tennisCourts, setTennisCourts] = useState(data.tennisCourts);

  const updateTennisCourts = (value: TennisCourtType[]) =>
    setTennisCourts(value);

  return (
    <div>
      <HomePageHeader
        courts={data.tennisCourts}
        onUpdateCourts={updateTennisCourts}
      />
      <HomePageBody courts={tennisCourts} />
    </div>
  );
}
