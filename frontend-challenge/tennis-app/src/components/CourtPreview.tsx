import { Court } from "@/models/types";
import Link from "next/link";
const CourtPreview: React.FC<{ court: Court }> = ({ court }) => {
  return (
    <>
      <Link href={`court/${court.id}`}>
        <div className="card bg-base-100 w-full sm:w-96 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title line-clamp-2">{court.name}</h2>
            {/* <div className="badge badge-secondary">{court.location}</div> */}

            <p>{court.location}</p>
            <ul className="card-actions flex flex-wrap">
              {court.amenities?.map((amenity, index) => (
                <li key={index} className="badge badge-outline">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourtPreview;
