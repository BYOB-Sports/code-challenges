export default function Testimonials() {
  // Function to determine message width based on character count
  const getMessageWidth = (text: string) => {
    const charCount = text.length;
    if (charCount <= 10) return "max-w-xs";
    if (charCount <= 25) return "max-w-sm";
    if (charCount <= 50) return "max-w-md";
    if (charCount <= 100) return "max-w-lg";
    if (charCount <= 150) return "max-w-xl";
    return "max-w-2xl";
  };

  // Testimonials data array
  const testimonials = [
    {
      id: 1,
      text: "I am able to find more relevant jobs faster, since using Jobright I have tripled my interview rate. I am truly impressed.",
      name: "Fred H.",
      role: "Senior Software Engineer",
      initials: "FH"
    },
    {
      id: 2,
      text: "Thanks to this platform I've landed a few interviews and accepted an offer within 1 week of interviewing!!",
      name: "Tracy C.",
      role: "Sr. Digital Marketing Manager",
      initials: "TC"
    },
    {
      id: 3,
      text: "You must check out Jobright. It has been saving me hours in my job search! I'm blown away at how easy it is to use!!",
      name: "Tyler S.",
      role: "Instructional Designer",
      initials: "TS"
    },
    {
      id: 4,
      text: "I've enjoyed seeing so many matching jobs. This has completely revamped my job search process. Excited to keep exploring!",
      name: "Chelsea L.",
      role: "Senior Recruiter",
      initials: "CL"
    },
    {
      id: 5,
      text: "It's a 10/10!! Especially the resume editor which helps me very easily write the content to match the job description. The AI guidance and support has been game changing.",
      name: "Brandi G.",
      role: "Software Engineer",
      initials: "BG"
    },
    {
      id: 6,
      text: "Not only does jobright show you the most relevant jobs it ALSO helps you network and get potential referrals! The matching system uses my experience, skills, and so much more to find the best fit.",
      name: "Gabriella B.",
      role: "LinkedIn Strategist",
      initials: "GB"
    },
    {
      id: 7,
      text: "It's an AI tool that is just amazing. It scans your resume and finds jobs and tells you within a percentage exactly how likely you are to be a match for that job.",
      name: "Video Testimonial",
      role: "Watch full video",
      initials: "VT",
      hasVideo: true
    }
  ];

  return (
    <section className="pt-8 sm:pt-12 pb-4 sm:pb-6 bg-gray-100 rounded-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="bg-green-100 rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              520,000+ HAPPY USERS&apos; LOVE
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-md">
              Thank you for your praise and suggestions. With your support, we can go further. We hope to accompany you throughout your tennis journey.
            </p>
          </div>
        </div>

        {/* Content with left text and right testimonials */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Left side label - horizontal on mobile, vertical from sm+ */}
          <div className="flex items-start sm:items-stretch shrink-0">
            {/* Mobile/Small screens: horizontal label */}
            <div className="sm:hidden flex items-center min-w-max">
              <div className="text-base font-semibold tracking-wider text-slate-800 px-2 py-1 rounded bg-white/70">JOIN OUR COMMUNITY</div>
            </div>
            {/* From small screens and up: vertical rail */}
            <div className="hidden sm:flex flex-col justify-end items-start">
              <div className="text-6xl lg:text-8xl font-semibold text-slate-800 tracking-wider mb-8 lg:mb-12" style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                <div>JOIN OUR COMMUNITY</div>
              </div>
            </div>
          </div>

          {/* Right side - Testimonials */}
          <div className="flex-1 ml-0 sm:ml-auto">
            {/* Testimonials Grid */}
            <div className="flex flex-col items-end gap-3 sm:gap-4 max-w-2xl">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className={`bg-white rounded-4xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow ${getMessageWidth(testimonial.text)}`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="text-xl sm:text-2xl text-slate-300 font-serif">&quot;</div>
                    <div className="flex-1">
                      <p className="text-slate-700 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">
                        {testimonial.text}
                      </p>
                      {testimonial.hasVideo ? (
                        <>
                          <div className="mb-2 sm:mb-3">
                            <div className="w-full h-20 sm:h-24 bg-slate-200 rounded-lg flex items-center justify-center relative">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24" text-semibold>
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <button className="w-full bg-black text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 hover:bg-slate-800 transition-colors text-xs sm:text-sm">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            {testimonial.role}
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-slate-600">{testimonial.initials}</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-xs sm:text-sm">{testimonial.name}</p>
                            <p className="text-xs text-slate-600">{testimonial.role}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
