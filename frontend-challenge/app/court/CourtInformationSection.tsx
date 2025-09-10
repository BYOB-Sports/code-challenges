import { FaLocationDot } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { MdPeople } from "react-icons/md";

type Props = {
  desc : string;
  location : string;
  players: number;
}

export default function CourtInformationSection({desc, location, players} : Props){
  return (
    <div className="w-full rounded-xl p-5 bg-[#f4fbe7]">
      <div className="flex flex-col gap-5">
        <div 
          className='w-full'
        >
          <p className='text-black/60 flex gap-2'>
            <span><IoMdInformationCircle className="text-2xl"/></span>
            <span>Overview</span>
          </p>
          
          <div className='w-full h-[1px] rounded-full bg-black my-2'/>

          <p className='text-black/60 text-sm'>{desc}</p>
        </div>
        
        <div 
          className='w-full'
        >
          <p className='text-black/60 flex gap-2'>
            <span><FaLocationDot className="text-2xl"/></span>
            <span>Location</span>
          </p>
          
          <div className='w-full h-[1px] rounded-full bg-black my-2'/>

          <p className='text-black/60 text-sm'>{location}</p>
        </div>
        
        <div 
          className='w-full'
        >
          <p className='text-black/60 flex gap-2'>
            <span><MdPeople className="text-2xl"/></span>
            <span>Players Attended</span>
          </p>
          
          <div className='w-full h-[1px] rounded-full bg-black my-2'/>

          <p className='text-black/60 text-sm'>{players}</p>
        </div>
      </div>
    </div>
  )
}