import { mockCourts } from "../data/mock-data";
import CourtCard from "./UI/CourtCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const Courts = () => {
  const [search, setSearch] = useState("");

  const filterCourts = mockCourts.filter((court) =>
    court.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 place-items-center">
      <input
        type="text"
        placeholder="Search courts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 sm:w-80 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {filterCourts.map((court) => (
        <Link key={court.id} to={`${court.id}`}>
          <CourtCard
            name={court.name}
            location={court.location}
            img={court.img}
            rating={court.rating}
          />
        </Link>
      ))}
      {filterCourts.length === 0 && (
        <>
          {mockCourts.map((court) => (
            <Link key={court.id} to={`${court.id}`}>
              <CourtCard
                name={court.name}
                location={court.location}
                img={court.img}
                rating={court.rating}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Courts;
