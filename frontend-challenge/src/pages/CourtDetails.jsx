import ReviewForm from "../components/ReviewForm";

const CourtDetails = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-75 overflow-hidden">
        <img src="https://picsum.photos/id/237/600/600" alt="court" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="m-2">
        <h1 className="text-2xl font-semibold">Court Name</h1>
        <h2 className="font-semibold">location</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit dolor voluptatem nesciunt expedita quam.</p>
        <div className="mt-2">
          <ReviewForm />
        </div>
        <button className="bg-white shadow rounded-lg hover:bg-gray-200 hover:cursor-pointer w-full mt-2 py-1">Back</button>
      </div>
    </div>
  );
};
export default CourtDetails;
