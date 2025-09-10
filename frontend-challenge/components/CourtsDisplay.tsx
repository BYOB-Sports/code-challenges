'use client'

import { useState } from "react";
import { GiTennisRacket } from "react-icons/gi";
import { FaChevronLeft,  FaChevronRight} from "react-icons/fa";
import Link from "next/link";
import { useMockedCourtsData } from "./CourtDataContext";


const COURTS_PER_PAGE = 15;

export default function CourtsDisplay(){
  const { courts } = useMockedCourtsData();
  const [inputValue, setInputValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredCourts = courts.filter((court) =>
    court.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    court.location.toLowerCase().includes(inputValue.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredCourts.length / COURTS_PER_PAGE);
  const indexOfLastCourt = currentPage * COURTS_PER_PAGE;
  const indexOfFirstCourt = indexOfLastCourt - COURTS_PER_PAGE;
  const currentCourts = filteredCourts.slice(indexOfFirstCourt, indexOfLastCourt);
  
  
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="mt-10 max_width mx-auto p-5">
      <h2 className="text-4xl font_playfair">Explore Our Tennis Courts</h2>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search Courts . . ." 
            className="outline-none p-1 border-b w-[200px]"
          />

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={goToPrevPage}
              className="hover:opacity-50 cursor-pointer"
            >
              <FaChevronLeft/>
            </button>

            <span>{currentPage} / {totalPages}</span>

            <button
              onClick={goToNextPage}
              className="hover:opacity-50 cursor-pointer"
            >
              <FaChevronRight/>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-5">
          {currentCourts.map((court) => (
            <Link
              href={`/court/${court.id}`}
              key={court.id}
              className="flex items-center gap-1 border rounded-xl bg-[#f4fbe7] p-1 hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            >
              <GiTennisRacket className="text-2xl"/>

              <div className="text-sm">
                <p>{court.name}</p>
                <p className="opacity-50">{court.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}