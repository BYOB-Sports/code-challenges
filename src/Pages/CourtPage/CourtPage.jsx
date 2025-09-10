import { useLoaderData, Link, Form } from "react-router-dom";

export const CourtPage = () => {
  const { courtData, reviews = [] } = useLoaderData();

  const { address, description, hours, numCourts, title, type } = courtData;

  return (
    <div className="h-100 w-100 d-flex flex-column px-3 overflow-scroll">
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

        <Form id="reveiwForm" method="post" className="border rounded p-2 mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control mb-2" />
          <label htmlFor="content">Review</label>

          <textarea type="text" name="content" className="form-control mb-2" />

          <button className="btn btn-dark">Leave Review</button>
        </Form>

        <h5>Reveiws:</h5>
        <div className="reviews">
          {reviews.map((reviewData) => {
            const { content, name, showDate } = reviewData;

            return (
              <div className="border rounded p-1 mb-2">
                <p className="fw-bold mb-1">"{content}"</p>

                <p className="mb-1">by: {name}</p>
                <p className="mb-0">{showDate}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
