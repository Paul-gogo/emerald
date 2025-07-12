import React from 'react'

const Hero = () => {
  return (
    <div className="relative h-[400px] w-full">
      <img
        src="/images/hero.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#296A50]/70"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Your hero content here */}
      </div>
    </div>
  )
}

export default Hero
