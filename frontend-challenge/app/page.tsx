import CourtsDisplay from "@/components/CourtsDisplay";
import Image from "next/image";
import { IoTennisballOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="h-[600px] relative">
        <Image
          src="/tennisbg.jpg"
          alt="tennis background"
          fill
          priority
          className="object-cover brightness-70"
        />
  
        <div className="relative z-30 p-5 max_width mx-auto h-full flex items-center justify-center">
          <h2 className="text-3xl font-bold font_playfair text-white tracking-widest absolute top-5 left-5">
            COURTS
          </h2>
  
          <div className="w-full ">
            <div className="border-2 border-white p-2 rounded-xl text-white w-fit flex items-center gap-2">
              <IoTennisballOutline className="text-2xl"/>
              <span className="text-lg">
                Find Your Perfect Court
              </span>
            </div>
  
            <div className="text-5xl font_playfair text-left text-white font-bold tracking-widest mt-5">
              <h2>REFINE YOUR</h2>
              <h2>TENNIS SKILLS</h2>
            </div>
  
            <p className="mt-5 text-white/80 font-bold text-lg">
              Find your ideal tennis court fast and easy!
            </p>
          </div>
  
          <div className="text-white text-2xl flex gap-5 items-center absolute bottom-5 right-5">
            <FaFacebook className="hover:text-white/80 cursor-pointer"/>
            <FaInstagram className="hover:text-white/80 cursor-pointer"/>
            <FaXTwitter className="hover:text-white/80 cursor-pointer"/>
          </div>
        </div>
      </div> 
      <CourtsDisplay />
    </>
  );
}
