import { useLoaderData } from "react-router-dom";
import { CourtLine } from "./CourtLine";
import { useEffect, useMemo, useState } from "react";

export const CourtsPage = () => {
  const { cofilesResults = [] } = useLoaderData();


  const [courtFilter, setCourtFilter] = useState("");

  const filtered = useMemo(() => {
    if (courtFilter) {
      return cofilesResults.filter((result) => {
        const { courtId, email, screenName } = result;

        const emailMatch = email.toLowerCase().includes(courtFilter);

        return emailMatch;
      });
    }

    return cofilesResults;
  }, [cofilesResults, courtFilter]);

  return (
    <div className="h-100 w-100 d-flex flex-column px-3 overflow-hidden">
      <div className="header mb-1">CourtsPage</div>

      <div className="actions mb-3 border-bottom border-3 border-dark pb-1 d-flex ">
        <button className="btn btn-dark me-2">search</button>

        <input
          placeholder="search"
          type="text"
          className="form-control"
          value={courtFilter}
          onChange={(event) => {
            setCourtFilter(event.target.value);
          }}
        />
      </div>
      <div className="flex-grow-1  overflow-scroll">
        {filtered.map((cofileData) => {
          const { id } = cofileData;

          return <CourtLine key={id} cofileData={cofileData} />;
        })}
      </div>
    </div>
  );
};
