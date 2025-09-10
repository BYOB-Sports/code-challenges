import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import mockCourts from "./data/mockCourts";
import CourtCard from "./components/CourtCard";
import CourtDetail from "./components/CourtDetail";
import ReviewForm from "./components/ReviewForm";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [courts] = useState(mockCourts);
  const [search, setSearch] = useState("");
  const [surface, setSurface] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [reviewsMap, setReviewsMap] = useState({});

  const filteredCourts = courts.filter(
    (c) =>
      (!surface || c.surface === surface) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()))
  );
  const selectedCourt = courts.find((c) => c.id === selectedId) || null;
  const reviews = reviewsMap[selectedId] || [];

  function handleAddReview(review) {
    setReviewsMap((prev) => ({
      ...prev,
      [selectedId]: [
        { ...review, id: Date.now() },
        ...(prev[selectedId] || []),
      ],
    }));
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-t from-zinc-100 to-blue-50"
      style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
    >
      <motion.div
        className="bg-blue-600 rounded-b-3xl pb-3 pt-8 text-white text-center shadow-xl"
        layoutId="navbar"
      >
        <h1 className="font-bold tracking-tight text-2xl select-none">
          🎾 Tennis Courts
        </h1>
      </motion.div>
      <div className="max-w-md mx-auto px-3 pt-3 pb-10">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="court-list"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="min-h-[50vh]"
            >
              <SearchBar value={search} onChange={setSearch} />
              <FilterPanel
                surfaceTypes={["Hard", "Clay", "Grass"]}
                selectedSurface={surface}
                onChange={setSurface}
              />

              {filteredCourts.length === 0 && (
                <div className="pt-10 text-center text-zinc-400 text-lg font-semibold">
                  No courts found
                </div>
              )}

              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2"
                style={{ scrollBehavior: "smooth" }}
              >
                <AnimatePresence>
                  {filteredCourts.map((court, idx) => (
                    <motion.div
                      key={court.id}
                      initial={{ opacity: 0, y: 40, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 30, scale: 0.97 }}
                      transition={{
                        duration: 0.37,
                        delay: idx * 0.045,
                        type: "spring",
                        bounce: 0.2,
                      }}
                      layout
                    >
                      <CourtCard court={court} onSelect={setSelectedId} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="court-detail"
              initial={{ opacity: 0, y: 38, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.97 }}
              transition={{ duration: 0.26 }}
              className="min-h-[50vh]"
            >
              <motion.button
                layoutId={"backbtn-" + selectedId}
                className="mb-3 -ml-2 text-blue-600 font-medium flex items-center gap-1 hover:text-blue-900 active:scale-95"
                onClick={() => setSelectedId(null)}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-xl">←</span> Back
              </motion.button>
              <CourtDetail court={selectedCourt} reviews={reviews} />
              <ReviewForm onSubmit={handleAddReview} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
