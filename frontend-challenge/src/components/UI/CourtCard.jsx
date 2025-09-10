const CourtCard = ({ name, location, img, rating }) => {
  return (
    <div className="m-2 bg-slate-50 border border-slate-300 rounded-xl w-xs sm:w-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
      {/* COURT IMAGE */}
      <div>
        <img src={img} alt="tennis-court" className="rounded-t-xl" />
      </div>
      {/* COURT DETAILS */}
      <div className="m-2">
        <div className="flex justify-between items-center">
          <p className="text-slate-800 font-bold">{name}</p>
          <p className="font-bold text-sm">rating: {rating}</p>
        </div>
        <p className="text-slate-400 text-sm">{location}</p>
      </div>
    </div>
  );
};

export default CourtCard;
