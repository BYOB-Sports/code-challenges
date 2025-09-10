import { useState, useContext } from "react";
import CourtCard from "../components/CourtCard";
import CourtContext from "../context/CourtContext";
import { motion, AnimatePresence } from "framer-motion";

const CourtList = () => {
  const [query, setQuery] = useState("");
  const { courts } = useContext(CourtContext);
  const [filteredCourts, setFilteredCourts] = useState(courts);

  const filter = (e) => {
    const text = e.target.value;
    setQuery(text);
    if (text.length < 4) {
      setFilteredCourts(courts);
      return;
    }
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
        <AnimatePresence>
          {filteredCourts.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}>
              <CourtCard court={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default CourtList;
