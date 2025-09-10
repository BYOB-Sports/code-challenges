import { useLoaderData, Link, Form } from "react-router-dom";

export const CourtPage = () => {
  const { courtData } = useLoaderData();

  const { id, address, description, hours, numCourts, title, type } = courtData;

  return (
    <div className="h-100 w-100 d-flex flex-column px-3 overflow-hidden">
      <div className="header mb-3 mt-2 text-decoration-underline d-flex align-items-center flex-wrap">
        <Link to={"/"} className="btn btn-dark me-2">
          back to courts page
        </Link>
        <h3 className="m-0"> : {title}</h3>
      </div>
      <div className=" flex-grow-1 overflow-scroll">
        <p className="m-0"> Number Of Courts {numCourts}</p>
        <p className="m-0"> Court Type: {type}</p>

        <p className="m-0">{description}</p>
        <p className="mb-1">{address}</p>
        <p>{hours}</p>

        <Form method="post" className="border rounded p-2">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control mb-2" />
          <label htmlFor="review">Review</label>

          <textarea type="text" name="review" className="form-control mb-2" />

          <button className="btn btn-dark">leave Review</button>
        </Form>
      </div>
    </div>
  );
};
