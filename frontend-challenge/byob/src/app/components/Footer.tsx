export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Section - Branding & Contact */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="flex">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-teal-400 rounded-full"></div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-teal-400 rounded-full -ml-2"></div>
              </div>
              <span className="text-lg sm:text-xl font-bold">TennisPRO</span>
            </div>

            {/* Contact Us */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-white text-sm sm:text-base">Telephone</p>
                <p className="text-white text-sm sm:text-base">
                  Email: <a href="mailto:info@tennispro.com" className="underline hover:text-teal-400 transition-colors">info@tennispro.com</a>
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Find us on social</h3>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-xs sm:text-sm">in</span>
              </div>
            </div>
          </div>

          {/* Middle Section - Useful Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Useful Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Meet The Team</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Join Us</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Sectors</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Job Search</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Contact Us</a></li>
            </ul>
          </div>

          {/* Right Section - Legal */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors text-sm sm:text-base">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
            <div className="mb-2 sm:mb-0 text-center sm:text-left">
              <span>2025 TennisPRO</span>
              <span className="hidden sm:inline mx-2">•</span>
              <div className="sm:hidden mt-1">
                <a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
              </div>
              <div className="hidden sm:inline">
                <a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-teal-400 transition-colors">Terms & Conditions</a>
                <span className="mx-2">•</span>
                <a href="#" className="hover:text-teal-400 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
