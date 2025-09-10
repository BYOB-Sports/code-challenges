import { useState, useContext } from "react";
import CourtCard from "../components/CourtCard";
import CourtContext from "../context/CourtContext";

const CourtList = () => {
  const [query, setQuery] = useState("");
  const { courts } = useContext(CourtContext);
  const [filteredCourts, setFilteredCourts] = useState(courts);

  const filter = (e) => {
    const text = e.target.value;
    setQuery(text);
    if (text.length < 4) return;
    const filtered = courts.filter((c) => c.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredCourts(filtered);
  };

  return (
    <div className="my-2 flex flex-col items-center justify-center px-6 md:px-12">
      <h1 className="text-3xl font-semibold">Tennis Courts</h1>

      <form action="" className="w-[100%] md:w-2xl">
        <input
          type="text"
          value={query}
          className="bg-white rounded-lg shadow mt-4 p-1 pl-2 w-full"
          placeholder="search by name"
          name="filter"
          id="filter"
          onChange={filter}
        />
      </form>

      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourts.map((c) => (
          <CourtCard key={c.id} court={c} />
        ))}
      </div>
    </div>
  );
};
export default CourtList;
