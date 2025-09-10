import { useNavigate } from "react-router-dom";

const CourtCard = ({ court }) => {
  const { id, name, address, info, image } = court;
  const navigate = useNavigate();
  return (
    <div className="rounded-xl shadow p-3 space-x-3 items-center flex flex-col w-full bg-white">
      <img src={image} alt="court" className="w-full h-40 object-cover rounded-lg" />
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold">{name}</h2>
        <p>{address}</p>
        <div className="flex items-center text-xs-text-gray-600">
          <p>{info}</p>
        </div>
      </div>

      <button
        className="bg-blue-400 shadow text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer w-full mt-2 py-1"
        onClick={() => navigate(`/court/${id}`)}>
        View
      </button>
    </div>
  );
};
export default CourtCard;
