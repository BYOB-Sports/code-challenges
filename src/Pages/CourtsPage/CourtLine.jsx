import { Link } from "react-router-dom";

export const CourtLine = (props) => {
  const { courtData = {} } = props;

  const { id, address, description, hours, numCourts, title, type } = courtData;

  return (
    <div className=" mb-2 border-bottom pb-1">
      <Link to={`/court/${id}`}>
        <h6>
          {title} ({numCourts}) ({type})
        </h6>
      </Link>

      <p className="m-0">{description}</p>
      <p className="mb-1">{address}</p>
      <p>{hours}</p>
    </div>
  );
};
