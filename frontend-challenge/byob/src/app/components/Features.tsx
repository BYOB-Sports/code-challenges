export default function Features() {
  return (
    <section id="features" className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 bg-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            The Future of Tennis
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4 sm:px-0">
            We&apos;re building a new model that combines three powerful elements to revolutionize how tennis players connect and play.
          </p>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Revenue Sharing */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-semibold text-slate-900">Top Courts Near You</h3>
            </div>
            <div className="mb-4 sm:mb-6 mt-6 sm:mt-8">
              <img
                src="/img2.jpg" 
                alt="Revenue Sharing Illustration" 
                className="w-full h-48 sm:h-56 md:h-67 object-cover rounded-lg"
              />
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Instantly explore both hidden gems and popular courts around your city. Whether you’re looking for a quiet spot to 
            practice your serve or the busiest courts where players gather, our app helps you find the right match. Use filters for location, surface type, and amenities to discover courts that fit your style.
            </p>
          </div>

          {/* Card 2: Marketing Engine */}
          <div id="about" className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow scroll-mt-20">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-semibold text-slate-900">Match Ready Insights</h3>
            </div>
            <div className="mb-4 sm:mb-6 mt-6 sm:mt-8">
              <img 
                src="/img5.png" 
                alt="Marketing Engine Illustration" 
                className="w-full h-48 sm:h-auto rounded-lg"
              />
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Don’t waste time guessing what a court is like — get all the details upfront. See information on surface condition, lighting, seating, and even peak hours when courts are most crowded. These insights help you plan smarter, so you can show up ready to play without surprises.
            </p>
          </div>

          {/* Card 3: Competitive Broker Community */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-semibold text-slate-900">Play & Share</h3>
            </div>
            <div className="mb-4 sm:mb-6 mt-6 sm:mt-8">
              <img 
                src="/img6.jpeg" 
                alt="Competitive Broker Community Illustration" 
                className="w-full h-48 sm:h-56 md:h-67 object-cover rounded-lg"
              />
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Your experience matters to the community. After a game, leave a review, rate the court, and upload photos to guide other players. Every contribution helps build a reliable network of shared tennis knowledge,
             so others can benefit from your insights while you discover theirs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
