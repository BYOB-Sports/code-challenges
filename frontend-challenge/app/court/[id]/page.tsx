"use client"

import { useMockedCourtsData } from "@/components/CourtDataContext";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import CourtInformationSection from "../CourtInformationSection";
import { IoArrowBack } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";


export default function CourtPage() {
  const params = useParams();
  const { courts, setCourts } = useMockedCourtsData();
  const court = courts.find(court => court.id === Number(params.id))

  const [ textValue, setTextValue ] = useState<string>("");
  const [ error, setError ] = useState<string>("");

  if(!court) return null;

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    
    if(!textValue.trim()){
      setError("Review Cannot be empty");
      return;
    }

    const updatedCourts = courts.map(court => {
      if (court.id === Number(params.id)) {
        return {
          ...court,
          reviews: [...court.reviews, textValue],
        };
      }

      return court;
    });

    setCourts(updatedCourts);
    localStorage.setItem('mockcourts', JSON.stringify(updatedCourts));

    setTextValue("");
    setError("");
  }

  return (
    <>
      <div className="h-[600px] relative">
        <Image
          src="/courtimg.jpg"
          alt="tennis court"
          fill
          priority
          className="object-cover brightness-70"
        />
  
        <div className="relative z-30 p-5 max_width mx-auto h-full flex items-center justify-center">
          <h2 className="text-3xl font-bold font_playfair text-white tracking-widest absolute top-5 left-5">
            COURTS
          </h2>
  
          <div className="w-full ">
            <Link 
              href="/" 
              className="text-2xl text-white font_playfair flex items-center gap-2 hover:text-white/80 w-fit"
            > 
              <span><IoArrowBack/></span>
              <span>Back</span>
            </Link>

            <div className="text-5xl font_playfair text-left text-white font-bold tracking-widest mt-5">
              <h2>YOUR MATCH</h2>
              <h2>AWAITS AT</h2>
              <h2 className="text-white/80">{court.name}</h2>
            </div>
          </div>
  
        </div>
      </div> 

      <div className="flex flex-col md:flex-row gap-5 mt-10 max_width mx-auto p-5">
        <CourtInformationSection
          desc={court.description}
          location={court.location}
          players={court.players}
        />

        <div className="">
          <h2 className="font_playfair text-3xl font-bold">Reviews</h2>

          <div className="my-5">
            {court.reviews.length > 0 ? (
                <div className="p-2">
                  {court.reviews.map((review) => (
                    <div key={review}
                      className="border-b last:border-b-0 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <BsPersonCircle className="text-xl text-black/60"/>
                        <span className="text-sm">Anonymous Player</span>
                      </div>
                      <p className="text-sm mt-5">{review}</p>
                    </div>
                  ))}
                </div>
              ): (
                <p className="text-black/60">No Reviews for this Court</p>
              )
            }
          </div>

          <form 
            onSubmit={handleSubmit}
            className="md:w-[500px]"
          >
            <textarea 
              value={textValue}
              onChange={(e) => {
                  if(error.length > 0){
                    setError("")
                  }
                  setTextValue(e.target.value)
                }
              }
              placeholder="Write about your experience with this court..."
              className="inline-block w-full p-3 outline-none rounded-md text-sm text-gray-800 placeholder-gray-400 border border-gray-300 shadow-sm"
              rows={5}
            />
            {error.length > 0 && <p className="text-red-500">{error}</p>}

            <button
              className="mt-5 py-2 px-4 rounded-xl bg-[#f4fbe7] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out text-black/60 hover:text-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}