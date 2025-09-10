import { useLoaderData,Link } from "react-router-dom";

export const CourtPage = () => {
  const {

    courtData,
  } = useLoaderData();

  const { title = "",} = courtData;

  return (
    <div className="h-100 w-100 d-flex flex-column px-3 overflow-hidden">
      <div className="header mb-3 mt-2 text-decoration-underline d-flex align-items-center flex-wrap">
        <Link to={'/courts'} className="btn btn-dark me-2"> back to courts page</Link>
        <h3 className="m-0">Court Info : {title}</h3>
      </div>
      <div className=" flex-grow-1 overflow-scroll">

      </div>
    </div>
  );
};
