export default function Hero() {
    return (
      <section
        id="hero"
        className="relative isolate bg-gray-100 group overflow-hidden min-h-[400px] sm:min-h-[520px]"
        style={{
          backgroundImage: "url('/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* vertical spacing to feel airy */}
          <div className="py-12 sm:py-20 md:py-28 lg:py-32 text-center">
            {/* Header */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white-200">
              Discover the Best Courts
            </h1>
  
            {/* Sub-Header */}
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white-200">
              From Local Gems to Pro Arenas
            </p>
  
            {/* Body Copy */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-white-200 max-w-2xl mx-auto px-4 sm:px-0">
              Discover the best courts in your city. From hidden neighborhood gems to professional-level facilities, our app helps players connect, share experiences,
              <br /> and make every match better.
            </p>
  
            {/* Optional CTA */}
            <div className="mt-6 sm:mt-8 md:mt-10">
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-lg border border-white-200 px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white-200 hover:border-white-400 transition-colors"
              >
                Learn More
              </a>
              {/* If you prefer: replace with "Coming Soon" text button */}
            </div>
          </div>
          {/* Decorative images - hidden on mobile for better performance */}
          <div className="hidden md:block absolute top-5 -left-20 flex items-start pt-4 transition-transform duration-500 ease-out group-hover:translate-x-20">
            <img src="/img4.png" alt="Left" className="w-60 h-120 object-cover rounded-xl shadow-lg" />
          </div>
          <div className="hidden md:block absolute top-5 -right-20 flex items-start pt-4 transition-transform duration-500 ease-out group-hover:-translate-x-20">
            <img src="/img3.png" alt="Right" className="w-60 h-120 object-cover rounded-xl shadow-lg" />
          </div>
          {/* <div className="absolute bottom-0 -left-20 flex items-start pt-4 transition-transform duration-500 ease-out group-hover:translate-x-20">
            <img src="/img2.jpeg" alt="Left" className="w-60 rounded-xl shadow-lg" />
          </div> */}
        </div>
      </section>
    );
  }
  