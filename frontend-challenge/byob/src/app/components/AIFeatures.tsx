export default function AIFeatures() {
  return (
    <section id="ai-features" className="pt-2 pb-12 sm:pb-16 md:pb-20 bg-gray-100 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm">
        {/* Main Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            AI FEATURES
          </h2>
        </div>

        {/* AI Job Match Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 lg:gap-12">
            {/* Left Side - Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  AI Court Match
                </h3>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8">
                Finding the perfect court is hard! Increase your odds with AI matched courts
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-slate-700">Find only courts that match your skill level</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-slate-700">Discover courts based on your preferences, not just location</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-slate-700">Say goodbye to overcrowded courts</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-slate-700">Get early notifications for court availability</span>
                </li>
              </ul>

              {/* CTA Button */}
              <button className="bg-slate-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors text-sm sm:text-base">
                Start Matching
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right Side - Court Match Card */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
                {/* Court Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <div>
                      <p className="text-green-600 text-xs sm:text-sm font-medium">1 hour ago</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm sm:text-lg">96%</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Overall</p>
                  </div>
                </div>

                {/* Court Title */}
                <h4 className="font-bold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">Central Park Tennis Courts</h4>
                <p className="text-slate-600 mb-3 sm:mb-4 text-xs sm:text-sm">New York, NY</p>

                {/* Match Breakdown */}
                <div className="flex gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-green-600 font-bold text-xs sm:text-sm">100%</span>
                    </div>
                    <p className="text-xs text-slate-600">Skill Level</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-green-600 font-bold text-xs sm:text-sm">92%</span>
                    </div>
                    <p className="text-xs text-slate-600">Surface</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-green-600 font-bold text-xs sm:text-sm">96%</span>
                    </div>
                    <p className="text-xs text-slate-600">Availability</p>
                  </div>
                </div>

                {/* Fit Analysis */}
                <div>
                  <h5 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Why This Court Is Perfect</h5>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm text-slate-700">Perfect Skill Level Match</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm text-slate-700">Preferred Surface Type</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm text-slate-700">Lighting</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm text-slate-700">Great Location</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile AI Section */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 lg:gap-12">
            {/* Left Side - Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Profile AI
                </h3>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8">
                Stand out from the crowd with a top notch tennis profile
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-slate-700">Get a professional quality profile in minutes, not hours</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-slate-700">Keep tailoring your profile with AI and catch players&apos; eyes instantly</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-slate-700">Rest easy knowing your profile will be optimized for matches</span>
                </li>
              </ul>

              {/* CTA Button */}
              <button className="bg-slate-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors text-sm sm:text-base">
                Improve My Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right Side - Profile Card */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
                {/* Profile Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Alex Johnson</h4>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm sm:text-lg">4.8</span>
                    </div>
                    <p className="text-xs text-green-600 font-semibold mt-1">EXCELLENT</p>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h5 className="font-semibold text-slate-900 border-b-2 border-green-500 pb-1 mb-2 text-xs sm:text-sm">PLAYER SUMMARY</h5>
                    <p className="text-xs sm:text-sm text-slate-600">Experienced tennis player with expertise in singles and doubles...</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-slate-900 mb-2 text-xs sm:text-sm">SKILLS</h5>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs text-slate-700">Singles</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs text-slate-700">Doubles</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs text-slate-700">Hard Court</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs text-slate-700">Clay Court</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-slate-900 mb-2 text-xs sm:text-sm">EXPERIENCE</h5>
                    <div>
                      <p className="font-medium text-slate-900 text-xs sm:text-sm">Intermediate Player</p>
                      <p className="text-xs text-slate-600">Local Club • 2022-Present</p>
                    </div>
                  </div>
                </div>

                {/* AI Enhancements */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-green-600 font-medium">Summary Enhanced</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-green-600 font-medium">Relevant Skills Highlighted</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-green-600 font-medium">Recent Match Experience Enhanced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
