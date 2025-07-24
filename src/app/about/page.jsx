'use client';
import React from 'react';
import { FaLock, FaUsers, FaBullseye, FaRocket } from 'react-icons/fa';
import { FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { BsGeoAlt } from 'react-icons/bs';

const page = () => {
  return (
    <div className="bg-white text-[#1F513D]">
      {/* Hero */}
      <section className="bg-[#F6F2EA] py-20 text-center px-6">
        <h1 className="text-5xl font-bold text-[#296A50] mb-4">About Emerald Haven</h1>
        <p className="max-w-3xl mx-auto text-lg text-[#1F513D]/80">
          Empowering property seekers with honest service, local knowledge, and modern tools.
        </p>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-[#296A50] mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-[#1F513D]/80 mb-6">
          To simplify property ownership and investments for individuals, families, and businesses by combining ethical practices, innovative tools, and unmatched client support.
        </p>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-[#1F513D]/80">
          Our mission is not just about real estate—it's about shaping communities and delivering peace of mind.
        </p>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-[#F6F2EA] text-center">
        <h2 className="text-4xl font-bold text-[#296A50] mb-4">Our Core Values</h2>
        <p className="text-lg text-[#1F513D]/80 mb-10">The principles that guide our work every day.</p>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 max-w-6xl mx-auto">
          {[
            { icon: <FaLock size={32} />, title: 'Integrity', desc: 'Honesty, fairness, and accountability in everything we do.' },
            { icon: <FaUsers size={32} />, title: 'Community', desc: 'We invest in people, not just properties.' },
            { icon: <FaBullseye size={32} />, title: 'Focus', desc: 'We tailor services to meet each client’s unique needs.' },
            { icon: <FaRocket size={32} />, title: 'Innovation', desc: 'Using modern tools to simplify every transaction.' }
          ].map((v, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 text-center">
              <div className="mb-3 text-[#296A50] flex justify-center">{v.icon}</div>
              <h4 className="font-semibold text-xl text-[#1F513D] mb-2">{v.title}</h4>
              <p className="text-sm text-[#1F513D]/80">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-[#296A50] mb-10">Emerald Haven by the Numbers</h2>
        <div className="flex flex-wrap justify-center gap-8 text-[#1F513D] font-bold text-3xl">
          {[
            { number: '1,000+', label: 'Properties Sold' },
            { number: '15+', label: 'Years Experience' },
            { number: '25+', label: 'Expert Agents' },
            { number: '5-Star', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="bg-[#F6F2EA] p-6 rounded-xl shadow w-64">
              <div>{stat.number}</div>
              <div className="text-sm font-normal mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 text-center bg-[#F6F2EA]">
        <h2 className="text-4xl font-bold text-[#296A50] mb-4">Meet Our Team</h2>
        <p className="text-lg text-[#1F513D]/80 mb-10 max-w-2xl mx-auto">
          Our experts are committed to excellence and client success.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: 'Sarah Johnson', role: 'CEO & Founder', desc: 'Driven by vision and guided by purpose for over 15 years.' },
            { name: 'Michael Chen', role: 'Head of Sales', desc: 'Master negotiator and trusted advisor.' },
            { name: 'Emily Rodriguez', role: 'Property Manager', desc: 'Precision-driven luxury and commercial strategist.' },
            { name: 'David Kim', role: 'Tech Director', desc: 'Digitizing real estate with seamless solutions.' }
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 w-72">
              <div className="w-20 h-20 bg-[#DCE6DF] rounded-full mx-auto mb-4 flex items-center justify-center text-[#1F513D] text-3xl">
                <FiUser />
              </div>
              <h3 className="font-semibold text-lg text-[#1F513D]">{p.name}</h3>
              <p className="text-sm font-medium text-[#296A50]">{p.role}</p>
              <p className="text-sm text-[#1F513D]/70 mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-[#296A50] mb-4">What Our Clients Say</h2>
        <p className="text-lg text-[#1F513D]/80 mb-10 max-w-2xl mx-auto">
          Words from those we’ve had the honor of serving.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: 'Aisha B.', text: 'Emerald Haven made my first home purchase stress-free. Professional, supportive, and responsive!' },
            { name: 'James M.', text: 'They helped me sell my apartment above market value within two weeks. Highly recommend!' },
            { name: 'Chukwu E.', text: 'Their knowledge of Abuja’s property market is unmatched. I’ll definitely work with them again.' }
          ].map((review, i) => (
            <div key={i} className="bg-[#F6F2EA] p-6 rounded-xl shadow w-80 text-sm text-[#1F513D]/90">
              <p className="italic">“{review.text}”</p>
              <p className="mt-4 font-semibold">– {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#296A50] text-white py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Let’s Find Your Place Together</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Whether you're buying, selling, or investing — Emerald Haven is your trusted guide.
        </p>

        <div className="text-white mb-6 space-y-2 text-lg">
          <div className="flex justify-center items-center gap-2"><BsGeoAlt /> Abuja, Nigeria</div>
          <div className="flex justify-center items-center gap-2"><FiPhone /> +234 81-4898-7616</div>
          <div className="flex justify-center items-center gap-2"><FiMail /> EmeraldHaven@gmail.com</div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-[#296A50] px-6 py-3 rounded-md hover:bg-[#F6F2EA] transition">
            Schedule a Free Consultation
          </button>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md w-72 text-[#1F513D] border border-white placeholder:text-[#1F513D]/60"
          />
        </div>
      </section>
    </div>
  );
};

export default page;
