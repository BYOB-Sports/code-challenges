const CourtCard = () => {
  return (
    <div className="rounded-xl shadow p-3 space-x-3 items-center flex flex-col w-full bg-white">
      <img src="https://picsum.photos/id/237/600/600" alt="court" className="w-full h-40 object-cover rounded-lg" />
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold">Test Court</h2>
        <p>location</p>
        <div className="flex items-center text-xs-text-gray-600">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis temporibus qui</p>
        </div>
      </div>

      <button className="bg-blue-400 shadow text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer w-full mt-2 py-1">View</button>
    </div>
  );
};
export default CourtCard;
