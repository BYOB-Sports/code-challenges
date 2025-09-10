import CourtCard from "../components/CourtCard";

const CourtList = () => {
  return (
    <div className="my-2 flex flex-col items-center justify-center px-6 md:px-12">
      <h1 className="text-3xl font-semibold">Tennis Courts</h1>

      <form action="" className="w-[100%] md:w-2xl">
        <input type="text" className="bg-white rounded-lg shadow mt-4 p-1 pl-2 w-full" placeholder="search by name" name="filter" id="filter" />
      </form>

      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <CourtCard />
        <CourtCard />
        <CourtCard />
        <CourtCard />
        <CourtCard />
        <CourtCard />
      </div>
    </div>
  );
};
export default CourtList;
