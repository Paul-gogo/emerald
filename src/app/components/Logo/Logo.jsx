import React from 'react'

const Logo = () => {
  return (
    <div>
      <a className="flex items-center space-x-1 group" href="/">
        <div className="bg-gradient-primary rounded-lg shadow-soft group-hover:shadow-medium transition-all duration-300" style={{ padding: '8px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house text-white h-7 w-7 bg-[#296A50]"
            style={{ borderRadius: '8px', padding: '4px' }}
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-primary text-[#296A50]">Emerald Haven</span>
      </a>
    </div>
  )
}

export default Logo
