import { useLoaderData, Link } from "react-router-dom";
import { CourtLine } from "./CourtLine";
import {  useMemo, useState } from "react";

export const CourtsPage = () => {
  const { courts = [], page, pageLinks = [] } = useLoaderData();

  const [courtFilter, setCourtFilter] = useState("");

  const filtered = useMemo(() => {
    if (courtFilter) {
      return courts.filter((result) => {
        const { title } = result;

        const titleMatch = title.toLowerCase().includes(courtFilter);

        return titleMatch;
      });
    }

    return courts;
  }, [courts, courtFilter]);

  const { nextPage, prevPage } = useMemo(() => {
    const nextPage = page < 10 ? page + 1 : page;
    const prevPage = page > 1 ? page - 1 : page;

    return { nextPage, prevPage };
  }, [page]);

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
        {filtered.map((courtData) => {
          const { id } = courtData;
          return <CourtLine key={id} courtData={courtData} />;
        })}
      </div>

      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <Link className="page-link" to={`/?page=${prevPage}`}>
                Previous
              </Link>
            </li>

            {pageLinks.map((pageLink, i) => {
              const { link, selected } = pageLink;

              return (
                <li
                  key={link}
                  className={`page-item ${selected ? "active" : ""}`}
                >
                  <Link className="page-link" to={link}>
                    {i + 1}
                  </Link>
                </li>
              );
            })}

            <li className="page-item">
              <Link className="page-link" to={`/?page=${nextPage}`}>
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
