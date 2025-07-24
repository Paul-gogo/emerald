'use client';
import Link from 'next/link';

const Footer = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#1F513D] to-[#296A50]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Find Your Perfect Home?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who found their dream properties with Emerald Haven
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <button className="px-6 py-3 bg-white text-[#296A50] font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition text-lg">
              Get Started Today
            </button>
          </Link>
          <Link href="/properties">
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#296A50] transition text-lg">
              Browse Properties
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;

