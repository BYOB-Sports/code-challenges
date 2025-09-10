import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#f4fbe7] text-center mt-20 flex justify-center items-center flex-col gap-5 py-10">
      <q className="text-gray-700 text-lg font-semibold">
        Serve Your Best Game. Play Your Best Court
      </q>

      <div className="text-2xl flex items-center gap-5">
        <FaFacebook className="hover:text-white/80 cursor-pointer"/>
        <FaInstagram className="hover:text-white/80 cursor-pointer"/>
        <FaXTwitter className="hover:text-white/80 cursor-pointer"/>
      </div>
    </footer>
  )
}